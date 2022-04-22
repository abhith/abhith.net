/** @jsx jsx */
import { jsx } from "theme-ui";

import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import "fontsource-open-sans/latin.css";
import "fontsource-lora/latin.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main
        sx={{
          backgroundColor: "background",
          color: "articleText",
        }}
        role="main"
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
