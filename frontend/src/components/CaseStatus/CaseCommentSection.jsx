'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CommenSection from '../../app/admin/dashboard/registrationform/attachments/CommentSection'


export default function CaseCommentSection() {
    const [caseData, setCaseData] = useState([]);
    const [caseType, setcaseType] = useState('')
    const router = useRouter();

    useEffect(() => {
        if (window) {
            const sessionData = JSON.parse(sessionStorage.getItem("caseDetails"));
            if (!sessionData) {
                toast.error("You don't have any data.");
                router.push("/", { scroll: false });
                return;
            }
            setCaseData([sessionData.data]);
            setcaseType(sessionData.case_type)
        }
    }, []);
    if (caseData.length && caseType.length) {
        return (<CommenSection
            placed="user"
            caseType={caseType}
            caseId={caseData[0]._id}
            email={caseData[0].email} />
        )

    }
}

