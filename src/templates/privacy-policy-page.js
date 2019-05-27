import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import Content, { HTMLContent } from "../components/Content";

export const PrivacyPolicyPageTemplate = ({
  title,
  content,
  description,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="container">
      <SEO title={title} description={description} />

      <h3 className="font-weight-bold spanborder">
        <span> {title}</span>
      </h3>
      <div className="page-content">
        <PageContent className="content" content={content} />
      </div>
    </div>
  );
};

PrivacyPolicyPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func
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
  data: PropTypes.object.isRequired
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
