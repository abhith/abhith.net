import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import "typeface-lora";

const TemplateWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <main role="main">{children}</main>
      <Footer />
    </>
  );
};

export default TemplateWrapper;
