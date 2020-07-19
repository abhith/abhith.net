import React from "react";
import Layout from "../components/layout";

const NotFoundPage = () => (
  <Layout>
    <div className="container">
      <h1>404</h1>

      <p>
        <strong>Page not found :(</strong>
      </p>
      <p>The requested page could not be found.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
