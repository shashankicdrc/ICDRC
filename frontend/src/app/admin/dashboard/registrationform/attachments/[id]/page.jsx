import React, { Fragment } from "react";
import CommentSection from '../CommentSection'

export default async function page({ params, searchParams }) {
    return (
        <Fragment>
            <CommentSection
                caseId={params.id}
                caseType={searchParams.caseType}
                placed="dashboard"
            />
        </Fragment>
    );
}
