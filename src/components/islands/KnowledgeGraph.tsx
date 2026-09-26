import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, type SimulationLinkDatum, type SimulationNodeDatum } from "d3-force";
import { useEffect, useMemo, useRef, useState } from "react";
import { navigate } from "astro:transitions/client";

interface RawNode {
  id: string;
  type: "topic" | "post" | "snippet";
  label: string;
  url: string;
  group: string;
  weight: number;
  hue: number;
}

interface Node extends RawNode, SimulationNodeDatum {
  radius: number;
}

type Link = SimulationLinkDatum<Node>;

interface Props {
  /** URL of the graph payload (defaults to `/graph.json`). */
  src?: string;
}

interface View {
  x: number;
  y: number;
  k: number;
}

const themeVars = () => {
  const style = getComputedStyle(document.documentElement);
  const get = (name: string) => style.getPropertyValue(name).trim();
  return { fg: get("--fg"), muted: get("--muted"), line: get("--line"), bg: get("--bg"), accent: get("--accent"), l: get("--tag-l") || "40%", s: get("--tag-s") || "65%" };
};

export default function KnowledgeGraph({ src = "/graph.json" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<{ nodes: RawNode[]; links: Array<{ source: string; target: string }> } | null>(null);
  const [query, setQuery] = useState("");
  const [focusId, setFocusId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [filter, setFilter] = useState<{ post: boolean; snippet: boolean }>({ post: true, snippet: true });
  const stateRef = useRef<{ nodes: Node[]; links: Link[]; view: View; draw: () => void } | null>(null);
  /** Read by the canvas render loop, which lives outside React's render cycle. */
  const activeRef = useRef<string | null>(null);
  activeRef.current = hoverId ?? focusId;

  useEffect(() => {
    fetch(src)
      .then((response) => response.json())
      .then(setData)
      .catch(() => setData({ nodes: [], links: [] }));
  }, [src]);

  const neighbours = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const link of data?.links ?? []) {
      if (!map.has(link.source)) map.set(link.source, new Set());
      if (!map.has(link.target)) map.set(link.target, new Set());
      map.get(link.source)!.add(link.target);
      map.get(link.target)!.add(link.source);
    }
    return map;
  }, [data]);

  const topicList = useMemo(() => (data?.nodes ?? []).filter((node) => node.type === "topic").sort((a, b) => b.weight - a.weight), [data]);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topicList.slice(0, 12);
    return (data?.nodes ?? []).filter((node) => node.label.toLowerCase().includes(q)).slice(0, 12);
  }, [query, data, topicList]);

  // Build the simulation and render loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const visible = (node: RawNode) => node.type === "topic" || filter[node.type];
    const nodes: Node[] = data.nodes.filter(visible).map((node) => ({
      ...node,
      radius: node.type === "topic" ? 4 + Math.sqrt(node.weight) * 2.2 : node.type === "post" ? 3.2 : 2.6,
    }));
    const ids = new Set(nodes.map((node) => node.id));
    const links: Link[] = data.links.filter((link) => ids.has(link.source) && ids.has(link.target)).map((link) => ({ ...link }));
    const view: View = { x: 0, y: 0, k: 1 };
    let colors = themeVars();
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const colorOf = (node: Node, alpha = 1) => `hsl(${node.hue} ${colors.s} ${colors.l} / ${alpha})`;

    function draw() {
      const { width, height } = canvas!.getBoundingClientRect();
      ctx!.save();
      ctx!.clearRect(0, 0, width, height);
      ctx!.translate(width / 2 + view.x, height / 2 + view.y);
      ctx!.scale(view.k, view.k);

      const active = activeRef.current;
      const near = active ? neighbours.get(active) : undefined;
      const isLit = (id: string) => !active || id === active || near?.has(id);

      ctx!.lineWidth = 0.6 / view.k;
      for (const link of links) {
        const s = link.source as Node;
        const t = link.target as Node;
        const lit = active && (s.id === active || t.id === active);
        ctx!.strokeStyle = lit ? colorOf(t, 0.8) : colors.line;
        ctx!.globalAlpha = active && !lit ? 0.25 : 1;
        ctx!.beginPath();
        ctx!.moveTo(s.x!, s.y!);
        ctx!.lineTo(t.x!, t.y!);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      for (const node of nodes) {
        ctx!.globalAlpha = isLit(node.id) ? 1 : 0.2;
        ctx!.beginPath();
        ctx!.arc(node.x!, node.y!, node.radius, 0, Math.PI * 2);
        if (node.type === "topic") {
          ctx!.fillStyle = colorOf(node);
          ctx!.fill();
        } else {
          ctx!.fillStyle = colors.bg;
          ctx!.fill();
          ctx!.lineWidth = 1.2 / view.k;
          ctx!.strokeStyle = node.type === "post" ? colorOf(node) : colors.muted;
          ctx!.stroke();
        }
        if (node.id === active) {
          ctx!.lineWidth = 2 / view.k;
          ctx!.strokeStyle = colors.accent;
          ctx!.beginPath();
          ctx!.arc(node.x!, node.y!, node.radius + 3, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }

      ctx!.textAlign = "center";
      ctx!.textBaseline = "top";
      for (const node of nodes) {
        const showLabel = node.id === active || (node.type === "topic" && (node.weight >= 6 || view.k > 1.6) && isLit(node.id)) || (near?.has(node.id) && view.k > 0.8);
        if (!showLabel) continue;
        ctx!.globalAlpha = 1;
        ctx!.font = `${node.type === "topic" ? 600 : 400} ${11 / view.k}px ui-monospace, "JetBrains Mono Variable", monospace`;
        ctx!.fillStyle = node.type === "topic" ? colors.fg : colors.muted;
        ctx!.fillText(node.label.length > 42 ? `${node.label.slice(0, 40)}…` : node.label, node.x!, node.y! + node.radius + 3 / view.k);
      }
      ctx!.restore();
    }

    const simulation = forceSimulation<Node>(nodes)
      .force("link", forceLink<Node, Link>(links).id((node) => node.id).distance((link) => ((link.target as Node).type === "topic" ? 38 : 30)).strength(0.4))
      .force("charge", forceManyBody<Node>().strength((node) => (node.type === "topic" ? -90 : -18)))
      .force("collide", forceCollide<Node>().radius((node) => node.radius + 2))
      .force("center", forceCenter(0, 0))
      .on("tick", draw);
    if (reduceMotion) {
      simulation.stop();
      simulation.tick(300);
      draw();
    }

    const toWorld = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: (clientX - rect.left - rect.width / 2 - view.x) / view.k, y: (clientY - rect.top - rect.height / 2 - view.y) / view.k };
    };
    const hit = (clientX: number, clientY: number) => {
      const p = toWorld(clientX, clientY);
      let best: Node | undefined;
      let bestDist = Infinity;
      for (const node of nodes) {
        const d = Math.hypot(node.x! - p.x, node.y! - p.y);
        if (d < node.radius + 4 / view.k && d < bestDist) {
          best = node;
          bestDist = d;
        }
      }
      return best;
    };

    let drag: { x: number; y: number; moved: boolean } | null = null;
    const onDown = (event: PointerEvent) => {
      drag = { x: event.clientX, y: event.clientY, moved: false };
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (drag) {
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
        view.x += dx;
        view.y += dy;
        drag.x = event.clientX;
        drag.y = event.clientY;
        draw();
        return;
      }
      const node = hit(event.clientX, event.clientY);
      canvas.style.cursor = node ? "pointer" : "grab";
      setHoverId(node?.id ?? null);
    };
    const onUp = (event: PointerEvent) => {
      const wasDrag = drag?.moved;
      drag = null;
      if (wasDrag) return;
      const node = hit(event.clientX, event.clientY);
      if (node) void navigate(node.url);
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.0015);
      const k = Math.min(6, Math.max(0.25, view.k * factor));
      const rect = canvas.getBoundingClientRect();
      const cx = event.clientX - rect.left - rect.width / 2;
      const cy = event.clientY - rect.top - rect.height / 2;
      view.x = cx - ((cx - view.x) * k) / view.k;
      view.y = cy - ((cy - view.y) * k) / view.k;
      view.k = k;
      draw();
    };
    const onTheme = () => {
      colors = themeVars();
      draw();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("ws:theme", onTheme);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    stateRef.current = { nodes, links, view, draw };

    return () => {
      simulation.stop();
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("wheel", onWheel);
      document.removeEventListener("ws:theme", onTheme);
    };
  }, [data, filter, neighbours]);

  // Redraw on hover/focus changes without rebuilding the simulation.
  useEffect(() => {
    stateRef.current?.draw();
  }, [hoverId, focusId]);

  const focusNode = (id: string) => {
    setFocusId(id);
    const state = stateRef.current;
    const node = state?.nodes.find((item) => item.id === id);
    if (state && node) {
      state.view.k = Math.max(state.view.k, 1.8);
      state.view.x = -node.x! * state.view.k;
      state.view.y = -node.y! * state.view.k;
      state.draw();
    }
  };

  const zoom = (factor: number) => {
    const state = stateRef.current;
    if (!state) return;
    state.view.k = Math.min(6, Math.max(0.25, state.view.k * factor));
    state.draw();
  };

  const topicCount = data?.nodes.filter((node) => node.type === "topic").length ?? 0;
  const postCount = data?.nodes.filter((node) => node.type === "post").length ?? 0;
  const snippetCount = data?.nodes.filter((node) => node.type === "snippet").length ?? 0;
  const focused = data?.nodes.find((node) => node.id === (hoverId ?? focusId));

  return (
    <div className="kg">
      <div className="kg-toolbar">
        <label className="kg-search">
          <span className="mono-label">find</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="topic or post…" aria-label="Find a node in the graph" />
        </label>
        <label className="kg-toggle">
          <input type="checkbox" checked={filter.post} onChange={(event) => setFilter((f) => ({ ...f, post: event.target.checked }))} /> posts ({postCount})
        </label>
        <label className="kg-toggle">
          <input type="checkbox" checked={filter.snippet} onChange={(event) => setFilter((f) => ({ ...f, snippet: event.target.checked }))} /> snippets ({snippetCount})
        </label>
        <span className="kg-zoom">
          <button type="button" onClick={() => zoom(1.25)} aria-label="Zoom in">
            +
          </button>
          <button type="button" onClick={() => zoom(0.8)} aria-label="Zoom out">
            −
          </button>
        </span>
      </div>

      <div className="kg-stage">
        <canvas ref={canvasRef} className="kg-canvas" role="img" aria-label={`Knowledge graph of ${topicCount} topics, ${postCount} posts and ${snippetCount} snippets. Use the list to navigate by keyboard.`} />
        {focused && (
          <p className="kg-tooltip" aria-live="polite">
            <span className="mono-label">{focused.type}</span> {focused.label}
          </p>
        )}
        {!data && <p className="kg-loading mono-label">loading graph.json…</p>}
      </div>

      <nav className="kg-list" aria-label="Graph nodes">
        <p className="mono-label">{query ? "matches" : "largest topics"} — arrow keys + enter</p>
        <ul>
          {matches.map((node) => (
            <li key={node.id}>
              <button type="button" onFocus={() => focusNode(node.id)} onMouseEnter={() => focusNode(node.id)} onClick={() => void navigate(node.url)} style={{ ["--h" as string]: node.hue }}>
                <span className="kg-dot" aria-hidden="true" />
                {node.label}
                <span className="mono-label">{node.type === "topic" ? `${neighbours.get(node.id)?.size ?? 0} links` : node.type}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
