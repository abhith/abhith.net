import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import PreviewCompatibleImage from "../preview-compatible-image";
import Particles from "react-particles-js";
export default function Hero() {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const page = data.markdownRemark;
        return (
          <div className="hero-wrapper h-card">
            <section className="hero is-primary is-bold position-relative">
              <div className="hero-head"></div>
              <div id="particles-js">
                <Particles
                  width="100%"
                  height="100%"
                  params={{
                    particles: {
                      number: {
                        value: 15,
                        density: {
                          enable: true,
                          value_area: 800,
                        },
                      },
                      line_linked: {
                        enable: true,
                      },
                      move: {
                        speed: 1,
                        out_mode: "out",
                      },
                      shape: {
                        type: ["images"],
                        images: [
                          {
                            src: "/img/topics/angular-icon-1.svg",
                            height: 20,
                            width: 23,
                          },
                          {
                            src: "/img/topics/aspnet-core.png",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/dot-net-core-7.svg",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/flutter.svg",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/gatsby.svg",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/site/particles/github.png",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/gitlab.svg",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/k8s.svg",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/site/particles/javascript.png",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/site/particles/microsoft-azure-3.png",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/microsoft-sql-server.svg",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/nuxt-emoji.png",
                            height: 20,
                            width: 23,
                          },
                          {
                            src: "/img/topics/oauth.svg",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/react.svg",
                            height: 20,
                            width: 23,
                          },
                          {
                            src: "/img/site/particles/code.png",
                            height: 20,
                            width: 20,
                          },
                          {
                            src: "/img/topics/vue-9.png",
                            height: 20,
                            width: 20,
                          },
                        ],
                      },
                      color: {
                        value: "#ccc",
                      },
                      size: {
                        value: 24,
                        random: false,
                        anim: {
                          enable: true,
                          speed: 3,
                          size_min: 10,
                          sync: false,
                        },
                      },
                    },
                    retina_detect: true,
                  }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="hero-body">
                <div className="container">
                  <div className="columns is-vcentered">
                    <div className="column is-5 landing-caption">
                      <figure className="image">
                        <img
                          className="is-rounded hero-avatar u-photo"
                          src="https://www.abhith.net/img/abhith.jpg"
                          alt=""
                        />
                      </figure>
                      <h1 className="title is-1 is-light is-semibold is-spaced main-title p-name">
                        {page.frontmatter.heading}
                      </h1>
                      <h2 className="subtitle is-light is-thin p-note">
                        {page.frontmatter.subheading}
                      </h2>
                      <p>
                        <Link
                          to="/about/"
                          className="button k-button k-primary raised has-gradient is-fat is-bold"
                        >
                          <span className="text">Read More</span>
                          <span className="front-gradient"></span>
                        </Link>
                      </p>
                    </div>
                    <div className="column is-7">
                      <figure className="image">
                        <a
                          href="https://www.abhith.net"
                          className="u-url u-uid"
                        >
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: page.frontmatter.image,
                              alt: `${page.frontmatter.heading}`,
                            }}
                          />
                        </a>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      }}
    />
  );
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heading
        subheading
        image {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
