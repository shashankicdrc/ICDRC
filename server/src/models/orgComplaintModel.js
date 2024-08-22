import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        organizationName: {
            type: String,
            required: [true, 'Organization Name is required'],
        },
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
            default: 'Pending',
            enum: ['Pending', 'Processing', 'Completed'],
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
        isDeleted: {
            type: Boolean,
            required: [true, 'isDeleted is required.'],
            default: false,
        },
    },
    { timestamps: true },
);

const generateCaseId = async function () {
    const latestDoc = await orgComplaintModel.findOne().sort('-caseId').exec();
    let currentId = 1000;

    if (latestDoc) {
        const lastId = parseInt(latestDoc.caseId.split('-')[2]);
        currentId = lastId + 1;
    }

    const newId = `ICDRC-ORG-${currentId}`;
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

const orgComplaintModel = model('OrganizationComplaint', schema);

export default orgComplaintModel;
