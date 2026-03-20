
const browserBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://77.37.45.141:7000";
const internalBaseUrl = process.env.INTERNAL_BACKEND_URL || browserBaseUrl;
const developmentBaseUrl =
    typeof window === "undefined" ? internalBaseUrl : browserBaseUrl;

export const BASE_URL =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : developmentBaseUrl;


export const problemOptions = [
    "Claim is denied/Repudiated",
    "Short payment/less payment",
    "Claim is delayed/No progress",
    "No survey/Surveyor is nor appointed",
    "Fraud",
    "Mis-selling of policy",
    "Policy document not received",
    "No Claim Bonus related issue",
];
export const PolicyType = [
    "Life Insurance",
    "Health Insurance",
    "Motor Insurance",
    "Travel Insurance",
    "Crop Insurance",
    "Fire Insurance",
    "Marine Insurance",
    "Liability Insurance",
    "Cyber Insurance",
    "Personal Accident Insurance",
    "Property Insurance",
    "Event Insurance",
    "Professional Indemnity Insurance",
];

export const insurance = [
    "Aditya Birla Health Insurance Co. Ltd.",
    "Care Health Insurance Ltd (formerly known as Religare Health Insurance Co. Ltd.)",
    "Manipal Cigna Health Insurance Company Limited",
    "Niva Bupa Health Insurance Co Ltd.",
    "Star Health & Allied Insurance Co.Ltd.",
    "Life Insurance Corporation of India",
    "Max Life Insurance Company Limited",
    "HDFC Life Insurance Company Limited",
    "ICICI Prudential Life Insurance Company Limited",
    "Kotak Mahindra Life Insurance Company Limited",
    "Aditya Birla SunLife Insurance Company Limited",
    "TATA AIA Life Insurance Company Limited",
    "SBI Life Insurance Company Limited",
    "Bajaj Allianz Life Insurance Company Limited",
    "PNB MetLife India Insurance Company Limited",
    "Reliance Nippon Life Insurance Company Limited",
    "Aviva Life Insurance Company India Limited",
    "Sahara India Life Insurance Company Limited",
    "Shriram Life Insurance Company Limited",
    "Bharti AXA Life Insurance Company Limited",
    "Future Generali India Life Insurance Company Limited",
    "Ageas Federal Life Insurance Company Limited",
    "Canara HSBC Life Insurance Company Limited",
    "Aegon Life Insurance Company Limited",
    "Pramerica Life Insurance Company Limited",
    "Star Union Dai-Ichi Life Insurance Company Limited",
    "IndiaFirst Life Insurance Company Limited",
    "Edelweiss Tokio Life Insurance Company Limited",
    "Credit Access Life Insurance Limited",
    "Acko Life Insurance Limited",
    "Go Digit Life Insurance Limited",
    "Acko General Insurance Limited",
    "Agriculture Insurance Company of India Limited",
    "Bajaj Allianz General Insurance Company Limited",
    "Cholamandalam MS General Insurance Company Limited",
    "ECGC Limited",
    "Future Generali India Insurance Company Limited",
    "Go Digit General Insurance Limited",
    "HDFC ERGO General Insurance Company Limited",
    "ICICI Lombard General Insurance Company Limited",
    "IFFCO TOKIO General Insurance Company Limited",
    "Kotak Mahindra General Insurance Company Limited",
    "Kshema General Insurance Limited",
    "Liberty General Insurance Limited",
    "Magma HDI General Insurance Company Limited",
    "National Insurance Company Limited",
    "Navi General Insurance Limited",
    "Raheja QBE General Insurance Co. Ltd.",
    "Reliance General Insurance Company Limited",
    "Royal Sundaram General Insurance Company Limited",
    "SBI General Insurance Company Limited",
    "Shriram General Insurance Company Limited",
    "Tata AIG General Insurance Company Limited",
    "The New India Assurance Company Limited",
    "The Oriental Insurance Company Limited",
    "United India Insurance Company Limited",
    "Universal Sompo General Insurance Company Limited",
    "Zuno General Insurance Ltd.",
];
