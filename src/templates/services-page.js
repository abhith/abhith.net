import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ServicesRoll from "../components/ServicesRoll";
import Pagination from "../components/Pagination";

export default class RecommendedServicesIndexPage extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { previousPagePath, nextPagePath } = pageContext;
    const services = data.recommendedServices.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended Services"
            description="Service/Service providers which Abhith recommends."
            slug="\recommended\services"
          />
          <div className="section">
            <h1 className="title is-6 has-text-weight-bold mb-4">
              <span>Recommended</span>
            </h1>
            <h4 className="title is-4 has-text-weight-bold spanborder">
              <span>Services</span>
            </h4>
            <div className="columns">
              <div className="column is-two-thirds">
                <ServicesRoll services={services} />
                <Pagination
                  previousPagePath={previousPagePath}
                  nextPagePath={nextPagePath}
                ></Pagination>
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query RecommendedServicesIndexPageQuery($skip: Int!, $limit: Int!) {
    recommendedServices: allServicesJson(
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
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
