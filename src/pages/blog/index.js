import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

export default class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    return (
      <Layout>
        <div className="container">
          <Helmet titleTemplate="%s | Abhith Rajan">
            <title>{`Blog`}</title>
            <meta
              name="description"
              content={`Abhith Rajan on Programming, The Web, Open Source, .NET, The Cloud and More`}
            />
          </Helmet>
          <div className="row mt-3">
            <div className="col-md-8 main-loop">
              <h4 className="font-weight-bold spanborder">
                <span>All Stories</span>
              </h4>
              <BlogRoll posts={posts} />
              {/* <div className="mt-5">
         <!-- Pagination links -->
            {% if paginator.total_pages > 1 %}
            <ul className="pagination"> 
              {% if paginator.previous_page %}
                <li className="page-item"><a className="page-link" href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&laquo; Prev</a></li>
              {% else %}
                <li className="page-item disabled"><span className="prev page-link">&laquo;</span></li>
              {% endif %}

              {% for page in (1..paginator.total_pages) %}
                {% if page == paginator.page %}
                <li className="page-item disabled"><span className="webjeda page-link">{{ page }}</span></li>
                {% elsif page == 1 %}
                <li className="page-item"><a className="page-link" href="{{site.baseurl}}/">{{ page }}</a></li>
                {% else %}
                <li className="page-item"><a className="page-link" href="{{ site.paginate_path | prepend: site.baseurl | replace: '//', '/' | replace: ':num', page }}">{{ page }}</a></li>
                {% endif %}
              {% endfor %}

              {% if paginator.next_page %}
                <li className="page-item"><a className="page-link" href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Next &raquo;</a></li>
              {% else %}
                <li className="page-item disabled"><span className="next page-link">&raquo;</span></li>
              {% endif %}
            </ul>
            {% endif %}      
        </div> */}
            </div>

            <div className="col-md-4">
              {/* {% include sidebar-featured.html %}     */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 186)
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
            tags
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
`;
