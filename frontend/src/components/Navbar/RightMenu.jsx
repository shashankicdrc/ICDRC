import React, { Fragment } from "react";
import Link from "next/link";
import CaseStatus from "../form/CaseStatus";

export default function RightMenu() {
  return (
    <Fragment>
      <CaseStatus />
      <button className="text-white capitalize bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md">
        <Link href="/register">Register complaints</Link>
      </button>
    </Fragment>
  );
}
