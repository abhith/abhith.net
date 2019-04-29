import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import { graphql } from "gatsby";

export default class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    return (
      <Layout>
        <div class="container">
          <div class="row mt-3">
            <div class="col-md-8 main-loop">
              <h4 class="font-weight-bold spanborder">
                <span>All Stories</span>
              </h4>
              <BlogRoll posts={posts} />
              {/* <div class="mt-5">
         <!-- Pagination links -->
            {% if paginator.total_pages > 1 %}
            <ul class="pagination"> 
              {% if paginator.previous_page %}
                <li class="page-item"><a class="page-link" href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&laquo; Prev</a></li>
              {% else %}
                <li class="page-item disabled"><span class="prev page-link">&laquo;</span></li>
              {% endif %}

              {% for page in (1..paginator.total_pages) %}
                {% if page == paginator.page %}
                <li class="page-item disabled"><span class="webjeda page-link">{{ page }}</span></li>
                {% elsif page == 1 %}
                <li class="page-item"><a class="page-link" href="{{site.baseurl}}/">{{ page }}</a></li>
                {% else %}
                <li class="page-item"><a class="page-link" href="{{ site.paginate_path | prepend: site.baseurl | replace: '//', '/' | replace: ':num', page }}">{{ page }}</a></li>
                {% endif %}
              {% endfor %}

              {% if paginator.next_page %}
                <li class="page-item"><a class="page-link" href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Next &raquo;</a></li>
              {% else %}
                <li class="page-item disabled"><span class="next page-link">&raquo;</span></li>
              {% endif %}
            </ul>
            {% endif %}      
        </div> */}
            </div>

            <div class="col-md-4">
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
