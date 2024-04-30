import React from "react";
import CaseTable from "../../components/CaseStatus/CasedetailsTable";
import AttachmentTable from "../../components/CaseStatus/attachment/AttachmentTable";
import UploadAttachment from "../../components/CaseStatus/attachment/UploadDrawer";

export default function page() {
  return (
    <main className="mx-5 md:mx-10 my-32">
      <h1 className="text-5xl">Your case status details.</h1>
      <section className="my-2">
        <CaseTable />
      </section>
      <section className="my-5">
        <div className="flex item-center justify-between">
          <h1 className="text-4xl">Your previous attachments</h1>
          <UploadAttachment />
        </div>
        <AttachmentTable />
      </section>
    </main>
  );
}
