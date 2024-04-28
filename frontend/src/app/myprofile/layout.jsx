import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";

export default function layout({ children }) {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}
