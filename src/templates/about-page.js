import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import SEO from "../components/seo/SEO";
import Timeline from "../components/about/Timeline";

export const AboutPageTemplate = ({
  title,
  content,
  description,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="container">
      <SEO title={title} description={description} slug="/about" />
      <section className="section">
        <h1 className="title spanborder has-text-weight-bold">
          <span> {title}</span>
        </h1>
        <div className="page-content">
          <PageContent className="content" content={content} />
        </div>
      </section>
      <Timeline></Timeline>
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
