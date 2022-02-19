import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo/seo";
import ServicesRoll from "../components/services-roll";
import Pagination from "../components/pagination";
import PageHero from "@components/page-hero";

export default class RecommendedServicesIndexPage extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { previousPagePath, nextPagePath } = pageContext;
    const services = data.recommendedServices.edges;
    const pageTitle = `Recommended Tools & Services`;
    const subTitle = `Tools and services which Abhith recommends.`;
    return (
      <Layout>
        <Seo
          title={pageTitle}
          description={subTitle}
          slug="/recommended/services/"
        />
        <PageHero title={pageTitle} subtitle={subTitle} />
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <ServicesRoll services={services} />
                <Pagination
                  previousPagePath={previousPagePath}
                  nextPagePath={nextPagePath}
                  kind={`services`}
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
    recommendedServices: allRecommendedService(
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
