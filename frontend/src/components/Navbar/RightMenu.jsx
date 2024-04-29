import React, { Fragment } from "react";
import Link from "next/link";

export default function RightMenu() {
  return (
    <Fragment>
      <button className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md">
        <Link href="/casestatus">Case status</Link>
      </button>
      <button className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md">
        <Link href="/register">Register complaints</Link>
      </button>
    </Fragment>
  );
}
