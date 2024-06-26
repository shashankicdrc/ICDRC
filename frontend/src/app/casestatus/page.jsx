import React from "react";
import CaseTable from "../../components/CaseStatus/CasedetailsTable";
import AttachmentTable from "../../components/CaseStatus/attachment/AttachmentTable";
import UploadAttachment from "../../components/CaseStatus/attachment/UploadDrawer";
import CaseCommentSection from "../../components/CaseStatus/CaseCommentSection";

export default function page() {
    return (
        <main className="mx-5 md:mx-10 my-32">
            <h1 className="text-4xl">Your Case Status Details.</h1>
            <section className="my-5 shadow-lg rounded-lg border-t">
                <CaseTable />
            </section>
            <section className="my-5">
                <div className="flex item-center justify-between">
                    <h1 className="text-4xl capitalize">Your previous attachments</h1>
                    <UploadAttachment />
                </div>
                <span className="text-sm text-gray-500">
                    Note: If you are not seeing your attachments, please refresh the page.
                </span>
                <div className="shadow-lg my-5 rounded-lg border-t">
                    <AttachmentTable />
                </div>
                <div className="my-5">
                    <h3 className="my-5 text-4xl">Comments</h3>
                    <CaseCommentSection />
                </div>
            </section>
        </main>
    );
}
