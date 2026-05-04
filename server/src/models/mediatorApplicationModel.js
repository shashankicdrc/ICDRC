import { Schema, model } from 'mongoose';

const educationQualificationSchema = new Schema(
    {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        yearOfPassing: { type: String, required: true },
    },
    { _id: false },
);

const professionalQualificationSchema = new Schema(
    {
        category: {
            type: String,
            enum: [
                'Advocate',
                'Retired Judicial Officer',
                'Industry Expert',
                'Professional',
            ],
            required: true,
        },
        enrollmentNo: String,
        barCouncil: String,
        dateOfEnrollment: Date,
    },
    { _id: false },
);

const experienceSchema = new Schema(
    {
        totalExperienceYears: {
            type: Number,
            required: true,
        },
        experienceAreas: {
            type: String,
            required: true,
        },
        presentOccupation: {
            type: String,
            required: true,
        },
        previousPositions: String,
    },
    { _id: false },
);

const mediationTrainingSchema = new Schema(
    {
        institutionName: String,
        duration: String,
        certificateDetails: String,
    },
    { _id: false },
);

const casesHandledSchema = new Schema(
    {
        mediationsConducted: Number,
        disputeNature: String,
    },
    { _id: false },
);

const mediatorApplicationSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        parentName: {
            type: String,
            required: [true, "Father's / Mother's name is required"],
        },
        dob: {
            type: Date,
            required: [true, 'Date of birth is required'],
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        mobileNumber: {
            type: String,
            required: [true, 'Mobile number is required'],
        },
        email: {
            type: String,
            required: [true, 'Email ID is required'],
        },
        educationQualifications: {
            type: [educationQualificationSchema],
            validate: [
                (value) => Array.isArray(value) && value.length > 0,
                'At least one educational qualification is required',
            ],
        },
        professionalQualification: {
            type: professionalQualificationSchema,
            required: true,
        },
        experience: {
            type: experienceSchema,
            required: true,
        },
        mediationTraining: {
            type: mediationTrainingSchema,
            default: {},
        },
        casesHandled: {
            type: casesHandledSchema,
            default: {},
        },
        specialExpertise: {
            type: [String],
            enum: [
                'Insurance Claims',
                'Motor Accident Claims',
                'Health Insurance',
                'Fire / Marine / Property Insurance',
                'Consumer Law',
                'Commercial Disputes',
            ],
            default: [],
        },
        declarationAccepted: {
            type: Boolean,
            required: [true, 'Declaration acceptance is required'],
        },
        signatureTimestamp: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Reviewed', 'Approved', 'Rejected'],
            default: 'Pending',
        },
    },
    { timestamps: true },
);

const MediatorApplication = model(
    'MediatorApplication',
    mediatorApplicationSchema,
);

export default MediatorApplication;
