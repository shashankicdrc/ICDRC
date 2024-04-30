import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/page";

export default function layout({ children }) {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      {children}
      <Footer />
    </Fragment>
  );
}
