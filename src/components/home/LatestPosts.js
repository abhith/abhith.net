import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import Img from "gatsby-image";
import { kebabCase } from "lodash";

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const latestPost = data.latestPost.edges;
        const recentPosts = data.recentPosts.edges;
        return (
          <div class="container">
            <div class="row remove-site-content-margin">
              <div class="col-md-6">
                {latestPost.map(({ node }) => {
                  const title = node.frontmatter.title;
                  return (
                    <div class="card border-0 mb-4 box-shadow h-xl-300">
                      <Link to={`${node.fields.slug}`}>
                        <Img
                          fluid={node.frontmatter.image.childImageSharp.fluid}
                        />
                        {/* <div style={{
                          backgroundImage: `url(${
                            !!node.frontmatter.image.childImageSharp ? node.frontmatter.image.childImageSharp.fluid.src : node.frontmatter.image
                            })`
                          , height: '200px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                        }}></div> */}
                      </Link>
                      <div class="card-body px-0 pb-0 d-flex flex-column align-items-start">
                        <h2 class="h4 font-weight-bold">
                          <Link class="text-dark" to={`${node.fields.slug}`}>
                            {title}
                          </Link>
                        </h2>
                        <p class="excerpt">{node.excerpt}</p>
                        <div>
                          <small class="d-block text-muted">
                            In{" "}
                            <span class="catlist">
                              {node.frontmatter.tags &&
                              node.frontmatter.tags.length
                                ? node.frontmatter.tags.map(tag => (
                                    <>
                                      <Link
                                        className="text-capitalize text-muted smoothscroll"
                                        to={`/tags/${kebabCase(tag)}/`}
                                      >
                                        {tag}
                                      </Link>
                                      <span class="sep">, </span>
                                    </>
                                  ))
                                : null}
                            </span>{" "}
                          </small>
                          <small class="text-muted">
                            {node.frontmatter.date} &middot;{" "}
                            {node.fields.readingTime.text}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div class="col-md-6">
                {recentPosts.map(({ node }) => {
                  const title = node.frontmatter.title;
                  return (
                    <div class="mb-3 d-flex align-items-center">
                      <div class="col-md-4">
                        <Link to={`${node.fields.slug}`}>
                          <Img
                            className="w-100"
                            fluid={node.frontmatter.image.childImageSharp.fluid}
                          />
                        </Link>
                      </div>
                      <div>
                        <h2 class="mb-2 h6 font-weight-bold">
                          <Link class="text-dark" to={`${node.fields.slug}`}>
                            {title}
                          </Link>
                        </h2>
                        <small class="d-block text-muted">
                          In{" "}
                          <span class="catlist">
                            {node.frontmatter.tags &&
                            node.frontmatter.tags.length
                              ? node.frontmatter.tags.map(tag => (
                                  <>
                                    <Link
                                      className="text-capitalize text-muted smoothscroll"
                                      to={`/tags/${kebabCase(tag)}/`}
                                    >
                                      {tag}
                                    </Link>
                                    <span class="sep">, </span>
                                  </>
                                ))
                              : null}
                          </span>
                        </small>
                        <small class="text-muted">
                          {node.frontmatter.date} &middot;{" "}
                          {node.fields.readingTime.text}
                        </small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

export default LatestPosts;

export const query = graphql`
  query {
    latestPost: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 1
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 505, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      skip: 1
      limit: 3
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 138, maxHeight: 92, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
