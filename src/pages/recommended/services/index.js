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

          <h1 className="has-text-weight-bold title h6 text-uppercase mb-4">
            <span>Recommended</span>
          </h1>
          <h4 className="has-text-weight-bold spanborder">
            <span>Services</span>
          </h4>

          <ServicesRoll services={services} />
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
