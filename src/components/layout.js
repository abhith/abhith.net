import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import "typeface-lora";
import "typeface-open-sans";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main role="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
