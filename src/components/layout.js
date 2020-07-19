import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import "typeface-lora";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main role="main" className="h-card">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
