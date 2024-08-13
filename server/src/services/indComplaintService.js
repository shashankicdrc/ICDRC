import indComplaintModel from "#models/indComplaintModel";

class IndComplaintService {
    async addComplaints(data) {
        const createComplaint = await indComplaintModel.create(data)
        return createComplaint ?? undefined;
    }
}

export default IndComplaintService; 
