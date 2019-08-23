import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import Img from "gatsby-image";
import BlogRollItem from "../BlogRollItem";
import TopicsBar from "../TopicsBar";

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const latestPost = data.latestPost.edges;
        const recentPosts = data.recentPosts.edges;
        return (
          <section className="section">
            <div className="columns">
              {latestPost.map(({ node }) => {
                const title = node.frontmatter.title;
                return (
                  <div className="column" key={node.fields.slug}>
                    <div className="columns">
                      <div className="column">
                        <figure className="image">
                          <Link to={`${node.fields.slug}`}>
                            <Img
                              fluid={
                                node.frontmatter.image.childImageSharp.fluid
                              }
                            />
                          </Link>
                        </figure>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <div className="content">
                          <Link to={`${node.fields.slug}`}>
                            <p className="title is-4">{title}</p>
                          </Link>

                          <p>{node.frontmatter.description}</p>
                          <TopicsBar topics={node.frontmatter.tags}/>
                          <small>
                            {node.frontmatter.date} &middot;{" "}
                            {node.fields.readingTime.text}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="column">
                {recentPosts.map(({ node }) => {
                  return <BlogRollItem post={node} key={node.fields.slug} />;
                })}
              </div>
            </div>
          </section>
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
                fluid(maxHeight: 200, quality: 100) {
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
                fluid(maxWidth: 375, quality: 100) {
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
