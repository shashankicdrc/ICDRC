import orgComplaintModel from '#models/orgComplaintModel';

class OrgComplaintService {
    async addComplaints(data) {
        const createComplaint = await orgComplaintModel.create(data);
        return createComplaint ?? undefined;
    }
}

export default OrgComplaintService;
