import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Content, { HTMLContent } from "../components/content";
import SEO from "../components/seo/seo";
import Recaptcha from "react-recaptcha";

export const ContactPageTemplate = ({
  title,
  content,
  description,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section is-medium">
      <SEO title={title} description={description} slug="/contact" />
      <div className="container">
        <h1 className="title spanborder has-text-weight-bold">
          <span> {title}</span>
        </h1>
        <div className="columns">
          <div className="column is-5">
            <div className="page-content">
              <PageContent className="content" content={content} />
            </div>
          </div>
          <div className="column is-offset-1 is-6">
            <div className="form-module--component--1t7o4">
              <form
                action="https://getform.io/f/a29691ae-8828-49d6-9b50-242187f6ca83"
                method="POST"
              >
                <div className="block">
                  <label className="label">Name</label>
                  <input className="input" type="text" name="name" required />
                </div>
                <div className="block">
                  <label className="label">Email</label>
                  <input className="input" type="email" name="email" required />
                </div>
                <div className="block">
                  <label className="label">Message</label>
                  <textarea
                    className="textarea"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div className="block">
                  <Recaptcha sitekey="6Ldl1v0UAAAAADH7egN2bhDoyLhv5k6hj3H4y2cM" />
                </div>
                <button className="button k-button k-primary raised has-gradient">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        content={post.html}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
