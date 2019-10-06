import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "typeface-lora";


const TemplateWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <main role="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default TemplateWrapper;
