import React from "react";

import Layout from "@components/layout";
import Seo from "@components/seo/seo";
import PageHero from "@components/page-hero";

const PageTemplate = (props) => {
  const {
    frontmatter: { title, description },
  } = props.pageContext;

  return (
    <Layout>
      {/* TODO(abhith): remove hard coded slug */}
      <Seo title={title} description={description} slug="/donate/" />
      <PageHero title={title} subtitle={description} />
      <section className="section">
        <div className="container">
          <article className="content is-medium">{props.children}</article>
        </div>
      </section>
    </Layout>
  );
};

export default PageTemplate;
