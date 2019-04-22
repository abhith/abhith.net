import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  image,
  tags,
  title,
  helmet,
  date,
  author,
  authorURL
}) => {
  console.log(description)
  const PostContent = contentComponent || Content
  return (
    <div>
      {helmet || ''}
      <div class="container">
        <div class="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
          <div class="h-100 tofront">
            <div className={image == null ? `row justify-content-center` : `row justify-content-between`}>
              <div className={image == null ? ` col-md-8 pr-0 pr-md-4 pt-4 pb-4 align-self-center` : `col-md-6 pr-0 pr-md-4 pt-4 pb-4 align-self-center`}>
                <p class="text-uppercase font-weight-bold">                  
                  {tags && tags.length ? (              
                  <span class="taglist">
                    {tags.map(tag => (
                    <><Link className="sscroll text-danger" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link> <span class="sep">, </span></>))}
                  </span>              
                ) : null}                                      
                </p>
                <h1 class="display-4 mb-4 article-headline">{title}</h1>

                <div class="d-flex align-items-center">
                  {/* {% if author.avatar %}
                        <img class="rounded-circle" src="{{site.baseurl}}/{{author.avatar}}" alt="{{author.name}}" width="70"/>
                        {% endif %} */}
                  <small class="ml-3"> {author} <span>
                    <OutboundLink target="_blank" className="btn btn-outline-success btn-sm btn-round ml-1"
                    href={authorURL}>     
                    Follow    
                  </OutboundLink>
                  </span>
                    <span class="text-muted d-block mt-1">{date} ·
                      {/* {% include meta-read-time.html %} */}
                    </span>
                  </small>
                </div>
              </div>

              {image && <div class="col-md-6 pr-0 align-self-center">
                <Img class="rounded" fluid={image.childImageSharp.fluid}></Img>
              </div>
              }

            </div>
          </div>
        </div>
      </div>
      <div class="container-lg pt-4 pb-4">
        <div class="row justify-content-center"> 
          <div class="col-md-12 col-lg-8">
            <PostContent content={content} className={`article-post`} />
            {tags && tags.length ? (
              <div class="mb-4">
                <span class="taglist">
                  {tags.map(tag => (
                    <Link className="sscroll btn btn-light btn-sm font-weight-bold" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>))}
                </span>
              </div>
            ) : null}

            <div class="row mt-5">
              <div class="col-md-2 align-self-center">
                {/* {% if author.avatar %}
                        <img class="rounded-circle" src="{{site.baseurl}}/{{author.avatar}}" alt="{{author.name}}" width="90" />
                    {% endif %} */}
              </div>
              <div class="col-md-10">
                <h5 class="font-weight-bold">Written by {author} <span>
                  <OutboundLink target="_blank" className="btn btn-outline-success btn-sm btn-round ml-2"
                    href={authorURL}>     
                    Follow    
                  </OutboundLink>
                  </span></h5>
                {/* {{ author.bio }} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  image: PropTypes.object,
  date: PropTypes.string,
  author: PropTypes.string,
  authorURL: PropTypes.string
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Abhith Rajan">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        date={post.frontmatter.date}
        author={post.frontmatter.author}
        authorURL={post.frontmatter.authorURL}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author
        authorURL
      }
    }
  }
`
