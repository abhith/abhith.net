import React from "react";
import Layout from "../../../components/Layout";
import SEO from "../../../components/seo/SEO";
import StoriesRoll from "../../../components/StoriesRoll";
import { graphql } from "gatsby";

export default class RecommendedStoriesIndexPage extends React.Component {
  render() {
    const { data } = this.props;

    const stories = data.recommendedStories.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended Developer Stories"
            description="Developer stories which Abhith recommends."
            slug="\recommended\stories"
          />
          <div className="row mt-3">
            <div className="col-md-8 main-loop">
              <h1 className="font-weight-bold title h6 text-uppercase mb-4">
                <span>Recommended</span>
              </h1>
              <h4 className="font-weight-bold spanborder">
                <span>Developer Stories</span>
              </h4>
              <StoriesRoll posts={stories} />
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
  query RecommendedStoriesIndexPageQuery {
    recommendedStories: allStoriesJson(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          date(formatString: "MMM DD, YYYY")
          description
          id
          tags
          url
        }
      }
    }
  }
`;
