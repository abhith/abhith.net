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
          <div className=" ">
            <div className="container has-background-lightblue">
              <div className="section">
                <div className="columns">
                  <div className="column is-vertical-center">
                    <div className="">
                      <h1 className="title mb-3">{page.frontmatter.heading}</h1>
                      <p className="subtitle">{page.frontmatter.subheading}</p>
                      <Link to="/about" className="button is-dark">
                        Read More
                      </Link>
                    </div>
                  </div>
                  <div className="column">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: page.frontmatter.image,
                        className: `center-image`,
                        alt: `${page.frontmatter.heading}`
                      }}
                    />
                  </div>
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
