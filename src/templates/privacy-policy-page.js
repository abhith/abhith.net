import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Helmet from "react-helmet";

export const PrivacyPolicyPageTemplate = ({
  title,
  content,
  description,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div class="container">
      <Helmet titleTemplate="%s | Abhith Rajan">
        <title>{`${title}`}</title>
        <meta name="description" content={`${description}`} />
      </Helmet>
      <h3 class="font-weight-bold spanborder">
        <span> {title}</span>
      </h3>
      <div class="page-content">
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
