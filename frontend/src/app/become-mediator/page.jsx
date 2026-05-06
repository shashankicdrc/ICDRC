'use client';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { applyForMediator } from '../../externalAPI/mediatorService';
import { toast } from 'react-hot-toast';
import HomeNav from '../../components/Navbar/page';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import { Loader2, Plus, Trash2 } from 'lucide-react';

export default function BecomeMediator() {
    const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        defaultValues: {
            educationQualifications: [{ degree: '', institution: '', yearOfPassing: '' }],
            specialExpertise: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "educationQualifications"
    });

    const onSubmit = async (data) => {
        try {
            // Process data to match API expectations
            const payload = {
                ...data,
                experience: {
                    totalExperienceYears: Number(data.experience.totalExperienceYears),
                    experienceAreas: data.experience.experienceAreas,
                    presentOccupation: data.experience.presentOccupation
                },
                casesHandled: {
                    mediationsConducted: Number(data.casesHandled.mediationsConducted),
                    disputeNature: data.casesHandled.disputeNature
                },
                specialExpertise: Array.isArray(data.specialExpertise) ? data.specialExpertise : (data.specialExpertise ? [data.specialExpertise] : []),
            };

            const response = await applyForMediator(payload);
            
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success('Application submitted successfully!');
                reset();
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Failed to submit application. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <SocialIcons />
            <HomeNav />
            
            {/* Hero Section */}
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: '500px',
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div className="mt-6 md:mt-10 flex h-full items-center justify-start md:ml-12 ml-3">
                        <div className="text-white flex justify-start flex-col">
                            <h2
                                className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            >
                                Become a Mediator
                            </h2>
                            <p
                                className="text-lg md:text-xl text-start px-4 md:px-4 text-gray-200"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                                data-aos-delay="200"
                            >
                                Join our panel of esteemed mediators and help resolve disputes effectively.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 md:px-10 space-y-8">
                        {/* Personal Details */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 border-gray-200">Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                                    <input type="text" {...register("name", { required: "Name is required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parent/Spouse Name *</label>
                                    <input type="text" {...register("parentName", { required: "Parent/Spouse Name is required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                                    <input type="date" {...register("dob", { required: "Date of Birth is required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                                    <input type="tel" {...register("mobileNumber", { required: "Mobile Number is required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                                    <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Full Address *</label>
                                    <textarea {...register("address", { required: "Address is required" })} rows="3" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"></textarea>
                                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Education Qualifications */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2 border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Education Qualifications</h2>
                                <button type="button" onClick={() => append({ degree: '', institution: '', yearOfPassing: '' })} className="text-sm flex items-center text-orange-600 hover:text-orange-700 font-medium">
                                    <Plus className="w-4 h-4 mr-1" /> Add More
                                </button>
                            </div>
                            
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-gray-50 p-4 rounded-lg relative">
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">Degree *</label>
                                        <input type="text" {...register(`educationQualifications.${index}.degree`, { required: "Required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label className="block text-sm font-medium text-gray-700">Institution *</label>
                                        <input type="text" {...register(`educationQualifications.${index}.institution`, { required: "Required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">Year of Passing *</label>
                                        <input type="text" {...register(`educationQualifications.${index}.yearOfPassing`, { required: "Required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                    </div>
                                    <div className="md:col-span-1 pt-6 flex justify-end">
                                        {fields.length > 1 && (
                                            <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 p-2">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Professional Qualification */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 border-gray-200">Professional Qualification</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category *</label>
                                    <select {...register("professionalQualification.category", { required: "Required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                        <option value="">Select Category</option>
                                        <option value="Advocate">Advocate</option>
                                        <option value="Retired Judicial Officer">Retired Judicial Officer</option>
                                        <option value="Industry Expert">Industry Expert</option>
                                        <option value="Professional">Professional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Enrollment No.</label>
                                    <input type="text" {...register("professionalQualification.enrollmentNo")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bar Council / Authority</label>
                                    <input type="text" {...register("professionalQualification.barCouncil")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Enrollment</label>
                                    <input type="date" {...register("professionalQualification.dateOfEnrollment")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 border-gray-200">Experience</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Total Experience (Years) *</label>
                                    <input type="number" min="0" {...register("experience.totalExperienceYears", { required: "Required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Present Occupation *</label>
                                    <input type="text" {...register("experience.presentOccupation", { required: "Required" })} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Areas of Experience *</label>
                                    <textarea {...register("experience.experienceAreas", { required: "Required" })} rows="2" placeholder="e.g. Family Law, Corporate Disputes" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Mediation Training */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 border-gray-200">Mediation Training</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                                    <input type="text" {...register("mediationTraining.institutionName")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                                    <input type="text" placeholder="e.g. 40 hours" {...register("mediationTraining.duration")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Certificate Details</label>
                                    <textarea {...register("mediationTraining.certificateDetails")} rows="2" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Cases Handled & Expertise */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 border-gray-200">Mediation Cases & Expertise</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mediations Conducted</label>
                                    <input type="number" min="0" defaultValue={0} {...register("casesHandled.mediationsConducted")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nature of Disputes</label>
                                    <input type="text" {...register("casesHandled.disputeNature")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Special Expertise</label>
                                    <select multiple {...register("specialExpertise")} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 h-32">
                                        <option value="Insurance Claims">Insurance Claims</option>
                                        <option value="Motor Accident Claims">Motor Accident Claims</option>
                                        <option value="Health Insurance">Health Insurance</option>
                                        <option value="Fire / Marine / Property Insurance">Fire / Marine / Property Insurance</option>
                                        <option value="Consumer Law">Consumer Law</option>
                                        <option value="Commercial Disputes">Commercial Disputes</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Command (Mac) to select multiple options.</p>
                                </div>
                            </div>
                        </div>

                        {/* Declaration */}
                        <div className="mt-6 bg-orange-50 p-4 rounded-lg border border-orange-100">
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input id="declaration" type="checkbox" {...register("declarationAccepted", { required: "You must accept the declaration" })} className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="declaration" className="font-medium text-gray-900">I declare that all information provided above is true and correct to the best of my knowledge.</label>
                                    {errors.declarationAccepted && <p className="text-red-600 mt-1">{errors.declarationAccepted.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-6 w-6" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="h-1 border-t my-5 w-full"></div>
            <Footer />
        </div>
    );
}
