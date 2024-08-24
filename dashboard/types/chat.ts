
type chatType = {
    _id: string;
    text: string;
    complaintId: string;
    complaintType: 'IndividualComplaint' | 'OrganizationalComplaint'
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
