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
