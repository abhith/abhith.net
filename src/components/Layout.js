import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TemplateWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <main role="main" className="site-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default TemplateWrapper;
