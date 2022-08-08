import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import PreviewCompatibleImage from "../preview-compatible-image";
import Particles from "react-tsparticles";
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
                  id="tsparticles"
                  options={{
                    fullScreen: {
                      enable: false,
                      zIndex: 1,
                    },
                    particles: {
                      color: {
                        value: "#ccc",
                      },
                      links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                      },
                      collisions: {
                        enable: true,
                      },
                      move: {
                        outMode: "out",
                        speed: 1,
                        enable: true,
                      },
                      number: {
                        value: 16,
                        density: {
                          enable: true,
                          area: 800,
                        },
                      },
                      shape: {
                        type: ["images"],
                        images: [
                          {
                            src: "/img/topics/c--4.svg",
                            height: 20,
                            width: 23,
                          },
                          {
                            src: "/img/topics/angular-icon-1.svg",
                            height: 20,
                            width: 23,
                          },
                          {
                            src: "/img/topics/graphql.svg",
                            height: 20,
                            width: 23,
                          },
                          {
                            src: "/img/topics/dotnet.svg",
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
                            src: "/img/topics/docker.svg",
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
                      size: {
                        value: 24,
                        random: false,
                        animation: {
                          enable: true,
                          speed: 3,
                          minimumValue: 10,
                          sync: false,
                        },
                      },
                      opacity: {
                        animation: {
                          enable: true,
                          startValue: "random",
                          minimumValue: 0.1,
                          speed: 1,
                          sync: false,
                        },
                      },
                    },
                    detectRetina: true,
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
                          alt="Abhith Rajan"
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
  {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heading
        subheading
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
