import { adminRole } from "@/lib/commonEnum";

export interface subscriptionType {
    _id: string,
    userId: string,
    planId: {
        _id: string,
        name: string,
    },
    complaintLimit: number,
    usedComplaints: number,
    startDate: string,
    endDate: string,
    createdAt: string,

}

export type PaymentFor = 'Subscription' | 'Case Registration'
export type PaymentHistoryStatus = 'Success' | "Failed"
export type complaintType = 'OrganizationComplaint' | "IndividualComplaint"

export type paymentType = {
    _id: string,
    userId: string,
    transactionId: string,
    paymentFor: PaymentFor,
    amount: number,
    paymentStatus: PaymentHistoryStatus,
    paymentDate: string,
    subscriptionId?: string,
    complaintType?: complaintType,
    complaintId?: string,
    organizationId?: string,
    individualId?: string
}

export type blogType = {
    _id: string;
    name: string;
    image: string;
    description: string;
    keywords: string[]
    content: string;
    createdAt: string;
    updatedAt: string
};

export type adminType = {
    _id: string;
    name: string;
    email: string;
    role: adminRole;
    createdAt: string;
};

export type caseStatus = "Pending" | "Processing" | "Completed"
export type paymentStatus = "Pending" | "Paid"

export interface caseType {
    _id: string,
    name: string,
    email: string,
    mobile: string,
    status: caseStatus,
    city: string,
    caseId: string,
    paymentStatus: paymentStatus
    problemDetails: string,
    problem: string,
    policyType: string,
    policyCompany: string,
    address: string
    state: string
    createdAt: string,
    updatedAt: string
}

export interface indvidualCaseType extends caseType {
}

export interface organisationalCaseType extends caseType {
    organizationName: string,
}

export interface chatBotType {
    _id: string,
    name: string,
    email: string,
    mobile: string,
    issue: string,
    createdAt: string

}

export interface contactType {
    _id: string,
    name: string,
    email: string,
    mobile: string,
    whatsapp: string,
    message: string,
    createdAt: string
}

export interface partnerType {
    _id: string;
    name: string;
    email: string;
    mobile: string,
    company: string
    createdAt: string,
}
