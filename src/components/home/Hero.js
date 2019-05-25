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
          <div className="jumbotron jumbotron-fluid jumbotron-home pt-0 pb-0 mt-3 mb-2rem bg-lightblue position-relative">
            <div className="pl-4 pr-0 h-100 tofront">
              <div className="row justify-content-between">
                <div className="col-md-6 pt-6 pb-6 pr-lg-4 align-self-center">
                  <h1 className="mb-3">{page.frontmatter.heading}</h1>
                  <p className="mb-3 lead">{page.frontmatter.subheading}</p>
                  <Link to="/about" className="btn btn-dark">
                    Read More
                  </Link>
                </div>

                <div className="col-md-6 d-none d-md-block pr-0">
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
