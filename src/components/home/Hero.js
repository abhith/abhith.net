import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import Img from "gatsby-image";

export default function Hero() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        // console.log(data);
        const page = data.markdownRemark;
        return (
          <div class="container">
            <div class="jumbotron jumbotron-fluid jumbotron-home pt-0 pb-0 mb-2rem bg-lightblue position-relative">
              <div class="pl-4 pr-0 h-100 tofront">
                <div class="row justify-content-between">
                  <div class="col-md-6 pt-6 pb-6 pr-lg-4 align-self-center">
                    <h1 class="mb-3">{page.frontmatter.heading}</h1>
                    <p class="mb-3 lead">{page.frontmatter.subheading}</p>
                    <Link to="/about" className="btn btn-dark">
                      Read More
                    </Link>
                  </div>
                  <div
                    class="col-md-6 d-none d-md-block pr-0"
                    style={{
                      backgroundSize: "cover",
                      backgroundImage: `url(${
                        !!page.frontmatter.image.childImageSharp
                          ? page.frontmatter.image.childImageSharp.fluid.src
                          : page.frontmatter.image
                      })`
                    }}
                  />
                  {/* <div class="col-md-6 d-none d-md-block pr-0">
                    <Img fluid={page.frontmatter.image.childImageSharp.fluid} />
                  </div> */}
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
            fluid(maxHeight: 410) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
