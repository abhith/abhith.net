import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/all.sass";

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
