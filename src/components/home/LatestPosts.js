import React from 'react'
import { graphql, StaticQuery, Link } from "gatsby";
import Img from 'gatsby-image'

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const latestPost = data.latestPost.edges
        const recentPosts = data.recentPosts.edges
        // console.log(recentPost)
        return (
          <div class="container" >
            <div class="row remove-site-content-margin">
              <div class="col-md-6">
                {latestPost.map(({ node }) => {
                  const title = node.frontmatter.title


                  return (
                    <div class="card border-0 mb-4 box-shadow h-xl-300" >
                      <Link to={`${node.fields.slug}`}>
                        <Img fluid={node.frontmatter.image.childImageSharp.fluid}></Img>
                        {/* <div style={{ backgroundImage: 'url(./assets/img/demo/1.jpg)', height: '200px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div> */}
                      </Link>
                      <div class="card-body px-0 pb-0 d-flex flex-column align-items-start">
                        <h2 class="h4 font-weight-bold">
                          <Link class="text-dark" to={`${node.fields.slug}`}>
                            {title}
                          </Link>
                        </h2>
                        <p class="excerpt">
                          {node.excerpt}
                        </p>
                        <div>
                          <small class="d-block text-muted">
                            In <span class="catlist">
                              <a class="text-capitalize text-muted smoothscroll" href="/"> category </a><span class="sep">, </span>
                            </span> </small>
                          <small class="text-muted">{node.frontmatter.date} &middot; 5 min read</small>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div class="col-md-6">
                {recentPosts.map(({ node }) => {
                  const title = node.frontmatter.title

                  return (
                    <div class="mb-3 d-flex align-items-center">
                      <div class="col-md-4">
                        <Link to={`${node.fields.slug}`}>
                          <Img class="w-100" fluid={node.frontmatter.image.childImageSharp.fluid}></Img>
                        </Link>
                      </div>
                      <div>
                        <h2 class="mb-2 h6 font-weight-bold">
                          <Link class="text-dark" to={`${node.fields.slug}`}>
                            {title}
                          </Link>
                        </h2>
                        <small class="d-block text-muted">
                          In <span class="catlist">
                            <a class="text-capitalize text-muted smoothscroll" href="{{site.baseurl}}/categories.html#{{ category | downcase }}"> category </a><span class="sep">, </span>

                          </span>
                        </small>
                        <small class="text-muted">
                          {node.frontmatter.date} &middot; 5 min read
                    </small>
                      </div>
                    </div>

                  )
                })}
              </div>
            </div>
          </div >
        )
      }}
    />
  )
}


export default LatestPosts

export const query = graphql`
  query {
    latestPost: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: { frontmatter: {templateKey: { eq: "blog-post"}}}, 
      limit: 1
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            image {
               childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }

          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
       filter: { frontmatter: {templateKey: { eq: "blog-post"}}},
      skip:1, 
      limit:3
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            image {
               childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
