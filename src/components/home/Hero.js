import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

export default function Hero() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        // console.log(data);
        const page = data.markdownRemark;
        return (
          <div className="hero-body has-background-lightblue">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-5 landing-caption">
                  <h1 className="title is-1 is-semibold is-spaced main-title">
                    {page.frontmatter.heading}
                  </h1>
                  <h2 className="subtitle">{page.frontmatter.subheading}</h2>
                  <p>
                    <Link
                      to="/about"
                      className="button k-button k-primary raised has-gradient is-fat is-bold"
                    >
                      <span className="text"> Read More</span>
                      <span className="front-gradient"></span>
                    </Link>
                  </p>
                </div>
                <div className="column is-7">
                  <figure className="image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: page.frontmatter.image,
                        alt: `${page.frontmatter.heading}`
                      }}
                    />
                  </figure>
                </div>
              </div>
            </div>
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
            fluid(maxWidth: 510) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
