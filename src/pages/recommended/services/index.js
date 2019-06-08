import React from "react";
import { graphql } from "gatsby";
import Layout from "../../../components/Layout";
import SEO from "../../../components/seo/SEO";
import ServicesRoll from "../../../components/ServicesRoll";

export default class RecommendedServicesIndexPage extends React.Component {
  render() {
    const { data } = this.props;

    const services = data.recommendedServices.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended Services"
            description="Service/Service providers which Abhith recommends."
            slug="\recommended\services"
          />
          <div className="row mt-3">
            <div className="col-md-8 main-loop">
              <h1 className="font-weight-bold title h6 text-uppercase mb-4">
                <span>Recommended</span>
              </h1>
              <h4 className="font-weight-bold spanborder">
                <span>Services</span>
              </h4>
              <div className="row">
                <ServicesRoll services={services} />
              </div>
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
  query RecommendedServicesIndexPageQuery {
    recommendedServices: allServicesJson(
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          title
          id
          tags
          url
          description
          image
        }
      }
    }
  }
`;
