import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import { kebabCase } from "lodash";
import BackgroundImage from "gatsby-background-image";
import BlogRollItem from "../BlogRollItem";

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const latestPost = data.latestPost.edges;
        const recentPosts = data.recentPosts.edges;
        return (
          <div className="row remove-site-content-margin">
            <div className="col-md-6">
              {latestPost.map(({ node }) => {
                const title = node.frontmatter.title;
                return (
                  <div
                    className="card border-0 mb-4 box-shadow"
                    key={node.fields.slug}
                  >
                    <Link to={`${node.fields.slug}`}>
                      <BackgroundImage
                        Tag="div"
                        className={`img-bg topfirstimage`}
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                      />
                    </Link>
                    <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                      <h2 className="h4 font-weight-bold">
                        <Link className="text-dark" to={`${node.fields.slug}`}>
                          {title}
                        </Link>
                      </h2>
                      <p className="excerpt">{node.frontmatter.description}</p>
                      <div>
                        <small className="d-block text-muted">
                          In{" "}
                          <span className="catlist">
                            {node.frontmatter.tags &&
                            node.frontmatter.tags.length
                              ? node.frontmatter.tags.map(tag => (
                                  <React.Fragment key={tag}>
                                    <Link
                                      className="text-capitalize text-muted smoothscroll"
                                      to={`/tags/${kebabCase(tag)}/`}
                                    >
                                      {tag}
                                    </Link>
                                    <span className="sep">, </span>
                                  </React.Fragment>
                                ))
                              : null}
                          </span>{" "}
                        </small>
                        <small className="text-muted">
                          {node.frontmatter.date} &middot;{" "}
                          {node.fields.readingTime.text}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-6">
              {recentPosts.map(({ node }) => {
                return <BlogRollItem post={node} key={node.fields.slug} />;
              })}
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
            description
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
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
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
