'use client'
import React, { Fragment } from 'react'
import CasedetailsTable from './CasedetailsTable'
import CaseCommentSection from "../../components/CaseStatus/CaseCommentSection";
import * as Tabs from '@radix-ui/react-tabs';

const StatusTab = () => {
    return (
        <Fragment>
            <Tabs.Root
                defaultValue="caseDetails">
                <Tabs.List
                    className="flex border-b justify-start bg-white pb-5 items-center 
                p-1 text-muted-foreground mx-2"
                >
                    <Tabs.Trigger value="caseDetails" className="w-full rounded-md py-2 data-[state=active]:bg-muted">Case Details</Tabs.Trigger>
                    <Tabs.Trigger value="conversation" className="w-full py-2 rounded-md data-[state=active]:bg-muted">Conversation</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="caseDetails" className=" p-4">
                    <CasedetailsTable />
                </Tabs.Content>
                <Tabs.Content value="conversation" className="flex flex-col h-screen">
                    <CaseCommentSection />
                </Tabs.Content>
            </Tabs.Root>
        </Fragment>
    )
}

export default StatusTab;
