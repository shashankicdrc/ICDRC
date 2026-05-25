import { Router } from 'express';
import CustomError from '#utils/CustomError';
import { httpStatus, httpStatusCode } from '#utils/constant';
import asyncHandler from '#utils/asyncHandler';
import MediatorApplication from '#models/mediatorApplicationModel';
import {Base} from '#utils/Base';

class MediatorApplicationController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/mediators/apply', this.#submitMediatorApplication);
    }

    #submitMediatorApplication = asyncHandler(async (req, res) => {
        const {
            name,
            parentName,
            dob,
            address,
            mobileNumber,
            email,
            educationQualifications,
            professionalQualification,
            experience,
            mediationTraining,
            casesHandled,
            specialExpertise,
            declarationAccepted,
        } = req.body;

        if (
            !name ||
            !parentName ||
            !dob ||
            !address ||
            !mobileNumber ||
            !email ||
            !Array.isArray(educationQualifications) ||
            educationQualifications.length === 0 ||
            !professionalQualification?.category ||
            !experience?.totalExperienceYears ||
            !experience?.experienceAreas ||
            !experience?.presentOccupation ||
            declarationAccepted !== true
        ) {
            throw new CustomError(
                'Missing required mediator application fields.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const application = await MediatorApplication.create({
            name,
            parentName,
            dob: new Date(dob),
            address,
            mobileNumber,
            email,
            educationQualifications,
            professionalQualification: {
                category: professionalQualification.category,
                enrollmentNo: professionalQualification.enrollmentNo,
                barCouncil: professionalQualification.barCouncil,
                dateOfEnrollment: professionalQualification.dateOfEnrollment
                    ? new Date(professionalQualification.dateOfEnrollment)
                    : undefined,
            },
            experience,
            mediationTraining: mediationTraining || {},
            casesHandled: casesHandled || {},
            specialExpertise: Array.isArray(specialExpertise)
                ? specialExpertise
                : [],
            declarationAccepted: true,
            signatureTimestamp: new Date(),
        });

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediator application submitted successfully.',
            {
                applicationId: application._id,
                status: application.status,
            },
        );
    });
}

export default new MediatorApplicationController().router;
