import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Helmet from "react-helmet";

export const AboutPageTemplate = ({
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

    // <section className="section section--gradient">

    //   <div className="container">
    //     <div className="columns">
    //       <div className="column is-10 is-offset-1">
    //         <div className="section">
    //           <h2 className="title is-size-3 has-text-weight-bold is-bold-light">

    //           </h2>

    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
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
