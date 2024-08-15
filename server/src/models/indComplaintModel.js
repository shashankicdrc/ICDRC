import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        state: {
            type: String,
            required: [true, 'state is required'],
        },
        city: {
            type: String,
            required: [true, 'city is required'],
        },
        address: {
            type: String,
            required: [true, 'address is required'],
        },
        policyCompany: {
            type: String,
            required: [true, 'policy_company is required'],
        },
        policyType: {
            type: String,
            required: [true, 'policyType is required'],
        },
        problem: {
            type: String,
            required: [true, 'problem is required'],
        },
        problemDetails: {
            type: String,
            required: [true, 'problemDetails is required'],
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Completed'],
            default: 'Pending',
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid'],
            default: 'Pending',
        },
        caseId: {
            type: String,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'userId is required'],
            ref: 'user',
        },
    },
    { timestamps: true },
);

const generateCaseId = async function () {
    const latestDoc = await indComplaintModel.findOne().sort('-caseId').exec();
    let currentId = 1000;

    if (latestDoc) {
        const lastId = parseInt(latestDoc.caseId.split('-')[2]);
        currentId = lastId + 1;
    }

    const newId = `ICDRC-IND-${currentId}`;
    return newId;
};

schema.pre('save', async function (next) {
    try {
        if (!this.caseId) {
            this.caseId = await generateCaseId();
        }
        next();
    } catch (error) {
        console.error('Error in pre-save middleware:', error);
        next(error);
    }
});

const indComplaintModel = model('IndividualComplaint', schema);

export default indComplaintModel;
