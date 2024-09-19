
type chatType = {
    _id: string;
    text: string;
    complaintId: {
        _id: string,
        caseId: string,
    };
    complaintType: 'IndividualComplaint' | 'OrganizationComplaint'
    authorId: {
        _id: string;
        email: string;
        name: string;
    };
    authorType: 'user' | 'admins';
    attachment?: {
        _id: string;
        attachment_name: string;
        media: {
            url: string,
            _id: string
        }[];
        __v: number;
    };
    createdAt: string;
};
