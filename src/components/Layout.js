import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SEO from "../components/Seo";

const TemplateWrapper = ({ children }) => {
  return (
    <>
      <SEO title="Full Stack Developer" />
      <Navbar />
      <main role="main" className="site-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default TemplateWrapper;
