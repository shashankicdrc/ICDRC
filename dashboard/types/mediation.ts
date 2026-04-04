
export interface MediationFile {
    name: string;
    url: string;
}

export interface UserSummary {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
}

export interface MediationCase {
    _id: string;
    userId: UserSummary | string;
    fullName: string;
    email: string;
    opponentName: string;
    description: string;
    category: string;
    amount?: number;
    timeline?: string;
    jurisdiction: string;
    language?: string;
    resolution?: string;
    files: MediationFile[];
    isSubscribed: boolean;
    subscriptionId?: string;
    status: string;
    paymentStatus?: string;
    sessionDate?: string;
    sessionStartTime?: string;
    sessionEndTime?: string;
    sessionMode?: string;
    googleMeetLink?: string;
    createdAt: string;
    updatedAt: string;
}

export interface MediationCasesResponse {
    cases: MediationCase[];
    totalCount: number;
    page: number;
    perRow: number;
}
