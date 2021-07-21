import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Content, { HTMLContent } from "../components/content";
import Seo from "../components/seo/seo";
import Timeline from "../components/about/timeline";
import PageHero from "@components/page-hero";

const AboutPageTemplate = ({
  title,
  content,
  description,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <>
      <Seo title={title} description={description} slug="/about/" />
      <PageHero title={title} subtitle={description} />
      <section className="section">
        <div className="container">
          <PageContent className="content is-medium" content={content} />
        </div>
      </section>
      <Timeline></Timeline>
    </>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
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
  data: PropTypes.object.isRequired,
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
