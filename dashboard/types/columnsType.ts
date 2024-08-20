
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
