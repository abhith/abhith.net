import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo/seo";
import PageHero from "@components/page-hero";
import Content, { HTMLContent } from "../components/content";

const PrivacyPolicyPageTemplate = ({
  title,
  content,
  description,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <>
      <Seo title={title} description={description} slug="/privacy-policy/" />
      <PageHero title={title} subtitle={description} />
      <div className="section">
        <div className="container">
          <PageContent className="content is-medium" content={content} />
        </div>
      </div>
    </>
  );
};

PrivacyPolicyPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const PrivacyPolicyPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <PrivacyPolicyPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        content={post.html}
      />
    </Layout>
  );
};

PrivacyPolicyPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PrivacyPolicyPage;

export const pageQuery = graphql`
  query Page($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
