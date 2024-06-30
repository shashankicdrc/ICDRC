import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";

export default function layout({ children }) {
    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            {children}
        </Fragment>
    );
}
