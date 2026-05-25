'use client';
import React, { useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { applyForMediator } from '../../externalAPI/mediatorService';
import { toast } from 'react-hot-toast';
import HomeNav from '../../components/Navbar/page';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import { Loader2, Plus, Trash2 } from 'lucide-react';

export default function BecomeMediator() {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [hasAccepted, setHasAccepted] = useState(false);
    const tcRef = useRef(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            educationQualifications: [{ degree: '', institution: '', yearOfPassing: '' }],
            specialExpertise: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educationQualifications',
    });

    const handleTcScroll = () => {
        const el = tcRef.current;
        if (!el) return;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
            setHasScrolled(true);
        }
    };

    const onSubmit = async (data) => {
        if (!hasAccepted) {
            toast.error('Please read and accept the Terms & Conditions before submitting.');
            return;
        }
        try {
            const payload = {
                ...data,
                experience: {
                    totalExperienceYears: Number(data.experience.totalExperienceYears),
                    experienceAreas: data.experience.experienceAreas,
                    presentOccupation: data.experience.presentOccupation,
                },
                casesHandled: {
                    mediationsConducted: Number(data.casesHandled.mediationsConducted),
                    disputeNature: data.casesHandled.disputeNature,
                },
                specialExpertise: Array.isArray(data.specialExpertise)
                    ? data.specialExpertise
                    : data.specialExpertise
                    ? [data.specialExpertise]
                    : [],
            };

            const response = await applyForMediator(payload);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success('Application submitted successfully!');
                reset();
                setHasScrolled(false);
                setHasAccepted(false);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Failed to submit application. Please try again.');
        }
    };

    const inputClass =
        'mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500';
    const labelClass = 'block text-sm font-medium text-gray-700';
    const sectionHeading = 'text-2xl font-bold text-gray-900 border-b pb-2 border-gray-200';

    return (
        <div className="min-h-screen bg-gray-50">
            <SocialIcons />
            <HomeNav />

            {/* Hero */}
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: '500px',
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
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

                        {/* ── Personal Details ───────────────────────────────────────── */}
                        <div className="space-y-6">
                            <h2 className={sectionHeading}>Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Full Name *</label>
                                    <input type="text" {...register('name', { required: 'Name is required' })} className={inputClass} />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Parent/Spouse Name *</label>
                                    <input type="text" {...register('parentName', { required: 'Parent/Spouse Name is required' })} className={inputClass} />
                                    {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Date of Birth *</label>
                                    <input type="date" {...register('dob', { required: 'Date of Birth is required' })} className={inputClass} />
                                    {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Mobile Number *</label>
                                    <input type="tel" {...register('mobileNumber', { required: 'Mobile Number is required' })} className={inputClass} />
                                    {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Email Address *</label>
                                    <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className={inputClass} />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Full Address *</label>
                                    <textarea {...register('address', { required: 'Address is required' })} rows="3" className={inputClass}></textarea>
                                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* ── Education Qualifications ────────────────────────────────── */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2 border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Education Qualifications</h2>
                                <button
                                    type="button"
                                    onClick={() => append({ degree: '', institution: '', yearOfPassing: '' })}
                                    className="text-sm flex items-center text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    <Plus className="w-4 h-4 mr-1" /> Add More
                                </button>
                            </div>
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-gray-50 p-4 rounded-lg">
                                    <div className="md:col-span-3">
                                        <label className={labelClass}>Degree *</label>
                                        <input type="text" {...register(`educationQualifications.${index}.degree`, { required: 'Required' })} className={inputClass} />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label className={labelClass}>Institution *</label>
                                        <input type="text" {...register(`educationQualifications.${index}.institution`, { required: 'Required' })} className={inputClass} />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className={labelClass}>Year of Passing *</label>
                                        <input type="text" {...register(`educationQualifications.${index}.yearOfPassing`, { required: 'Required' })} className={inputClass} />
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

                        {/* ── Professional Qualification ──────────────────────────────── */}
                        <div className="space-y-6">
                            <h2 className={sectionHeading}>Professional Qualification</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Category *</label>
                                    <select {...register('professionalQualification.category', { required: 'Required' })} className={inputClass}>
                                        <option value="">Select Category</option>
                                        <option value="Advocate">Advocate</option>
                                        <option value="Retired Judicial Officer">Retired Judicial Officer</option>
                                        <option value="Industry Expert">Industry Expert</option>
                                        <option value="Professional">Professional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Enrollment No.</label>
                                    <input type="text" {...register('professionalQualification.enrollmentNo')} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Bar Council / Authority</label>
                                    <input type="text" {...register('professionalQualification.barCouncil')} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Date of Enrollment</label>
                                    <input type="date" {...register('professionalQualification.dateOfEnrollment')} className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* ── Experience ─────────────────────────────────────────────── */}
                        <div className="space-y-6">
                            <h2 className={sectionHeading}>Experience</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Total Experience (Years) *</label>
                                    <input type="number" min="0" {...register('experience.totalExperienceYears', { required: 'Required' })} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Present Occupation *</label>
                                    <input type="text" {...register('experience.presentOccupation', { required: 'Required' })} className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Areas of Experience *</label>
                                    <textarea {...register('experience.experienceAreas', { required: 'Required' })} rows="2" placeholder="e.g. Family Law, Corporate Disputes" className={inputClass}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* ── Mediation Training ─────────────────────────────────────── */}
                        <div className="space-y-6">
                            <h2 className={sectionHeading}>Mediation Training</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Institution Name</label>
                                    <input type="text" {...register('mediationTraining.institutionName')} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Duration</label>
                                    <input type="text" placeholder="e.g. 40 hours" {...register('mediationTraining.duration')} className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Certificate Details</label>
                                    <textarea {...register('mediationTraining.certificateDetails')} rows="2" className={inputClass}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* ── Cases Handled & Expertise ──────────────────────────────── */}
                        <div className="space-y-6">
                            <h2 className={sectionHeading}>Mediation Cases &amp; Expertise</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Mediations Conducted</label>
                                    <input type="number" min="0" defaultValue={0} {...register('casesHandled.mediationsConducted')} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Nature of Disputes</label>
                                    <input type="text" {...register('casesHandled.disputeNature')} className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Special Expertise</label>
                                    <select multiple {...register('specialExpertise')} className={`${inputClass} h-32`}>
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

                        {/* ── Terms & Conditions ─────────────────────────────────────── */}
                        <div className="space-y-4">
                            <h2 className={sectionHeading}>Terms &amp; Conditions</h2>
                            <p className="text-sm text-gray-600">
                                Please read the following Terms &amp; Conditions carefully and scroll to the bottom before accepting.
                            </p>

                            {/* Scrollable T&C box */}
                            <div
                                ref={tcRef}
                                onScroll={handleTcScroll}
                                className="h-72 overflow-y-auto border border-gray-300 rounded-lg bg-gray-50 p-5 text-sm text-gray-700 space-y-4 leading-relaxed"
                            >
                                <p className="font-semibold text-gray-800">
                                    By applying to join or by accepting empanelment with ICDRC, you agree to comply with these Terms.
                                </p>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">1. Eligibility and Registration</p>
                                    <p>1.1 You must possess the qualifications, certifications, and experience required under applicable laws and ICDRC policies to act as a mediator.</p>
                                    <p>1.2 You agree to provide accurate, complete, and updated information during onboarding and throughout your association with ICDRC.</p>
                                    <p>1.3 ICDRC reserves the right to accept, reject, or revoke mediator empanelment at its sole discretion.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">2. Role and Responsibilities</p>
                                    <p className="mb-1">2.1 As a mediator, you agree to:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Conduct mediations impartially, independently, and in good faith.</li>
                                        <li>Uphold the principles of neutrality, confidentiality, and fairness.</li>
                                        <li>Ensure timely handling of assigned cases.</li>
                                        <li>Comply with applicable mediation laws, rules, and ethical guidelines.</li>
                                    </ul>
                                    <p className="mt-2 mb-1">2.2 You shall not:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Represent any party in disputes assigned to you as a mediator.</li>
                                        <li>Engage in conduct that creates a conflict of interest.</li>
                                        <li>Misuse your position for personal or financial gain.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">3. Code of Conduct</p>
                                    <p>3.1 You agree to adhere to ICDRC&apos;s Code of Ethics and applicable professional standards.</p>
                                    <p>3.2 You must disclose any actual or potential conflicts of interest before accepting an assignment.</p>
                                    <p>3.3 You shall maintain professionalism and respect in all communications with parties and ICDRC staff.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">4. Confidentiality</p>
                                    <p>4.1 All mediation proceedings, documents, and communications are strictly confidential.</p>
                                    <p>4.2 You shall not disclose any information related to cases handled through ICDRC unless required by law or with explicit written consent from all parties.</p>
                                    <p>4.3 This obligation continues even after termination of your association with ICDRC.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">5. Assignment of Cases</p>
                                    <p>5.1 ICDRC will assign cases based on availability, expertise, and other relevant criteria.</p>
                                    <p>5.2 You have the right to accept or decline assignments; however, repeated or unjustified refusals may affect your empanelment status.</p>
                                    <p>5.3 You must promptly inform ICDRC of your availability and any constraints.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">6. Fees and Payments</p>
                                    <p>6.1 Mediator fees shall be governed by ICDRC&apos;s fee structure or as agreed upon for specific cases.</p>
                                    <p>6.2 Payments will be processed by ICDRC subject to completion of services and submission of required documentation.</p>
                                    <p>6.3 You are responsible for complying with all applicable tax laws.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">7. Use of Platform</p>
                                    <p>7.1 You agree to use ICDRC.in solely for professional mediation-related activities.</p>
                                    <p className="mb-1">7.2 You shall not:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Upload or transmit harmful, unlawful, or misleading content.</li>
                                        <li>Attempt to gain unauthorized access to the Platform or its data.</li>
                                    </ul>
                                    <p>7.3 ICDRC may monitor usage to ensure compliance.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">8. Intellectual Property</p>
                                    <p>8.1 All content, materials, and systems on ICDRC.in are the property of ICDRC or its licensors.</p>
                                    <p>8.2 You may not copy, distribute, or reproduce any materials without prior written consent.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">9. Data Protection and Privacy</p>
                                    <p>9.1 You agree to handle all personal data in accordance with applicable data protection laws.</p>
                                    <p>9.2 You shall implement reasonable safeguards to protect sensitive information accessed during mediation.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">10. Performance and Review</p>
                                    <p className="mb-1">10.1 ICDRC reserves the right to evaluate mediator performance based on:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Timeliness</li>
                                        <li>Feedback from parties</li>
                                        <li>Compliance with standards</li>
                                    </ul>
                                    <p>10.2 ICDRC may suspend or terminate your empanelment for unsatisfactory performance or misconduct.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">11. Termination</p>
                                    <p>11.1 Either party may terminate the association with written notice.</p>
                                    <p className="mb-1">11.2 ICDRC may terminate or suspend your empanelment immediately in cases of:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Breach of these Terms</li>
                                        <li>Ethical violations</li>
                                        <li>Legal non-compliance</li>
                                    </ul>
                                    <p>11.3 Ongoing cases must be completed or transitioned as directed by ICDRC.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">12. Limitation of Liability</p>
                                    <p className="mb-1">12.1 ICDRC shall not be liable for:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Any disputes arising from mediation outcomes</li>
                                        <li>Actions taken by parties during or after mediation</li>
                                    </ul>
                                    <p>12.2 Your role is limited to facilitation, and you are not responsible for enforcing settlements.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">13. Indemnity</p>
                                    <p>You agree to indemnify and hold harmless ICDRC, its officers, and affiliates from any claims, damages, or liabilities arising from your actions, omissions, or breach of these Terms.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">14. Amendments</p>
                                    <p>ICDRC reserves the right to modify these Terms at any time. Updated versions will be posted on ICDRC.in. Continued use of the Platform constitutes acceptance of revised Terms.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">15. Governing Law and Jurisdiction</p>
                                    <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in India.</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">16. Contact Information</p>
                                    <p>For any queries or concerns regarding these Terms, please contact:</p>
                                    <p>Email:{' '}<a href="mailto:info@icdrc.in" className="text-orange-600 hover:underline">info@icdrc.in</a></p>
                                    <p>Website:{' '}<a href="https://www.icdrc.in" target="_blank" rel="noreferrer" className="text-orange-600 hover:underline">https://www.icdrc.in</a></p>
                                </div>

                                <div className="border-t border-gray-300 pt-4">
                                    <p className="font-semibold text-gray-800">Declaration</p>
                                    <p>By proceeding with onboarding, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
                                </div>
                            </div>

                            {/* Scroll hint */}
                            {!hasScrolled && (
                                <p className="text-xs text-amber-600 flex items-center gap-1">
                                    ↕ Please scroll through the full Terms &amp; Conditions above to enable the checkbox.
                                </p>
                            )}

                            {/* Acceptance checkbox — enabled only after scrolling to bottom */}
                            <div
                                className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ${
                                    hasScrolled
                                        ? 'bg-orange-50 border-orange-200'
                                        : 'bg-gray-100 border-gray-200 opacity-60 pointer-events-none select-none'
                                }`}
                            >
                                <input
                                    id="termsAccepted"
                                    type="checkbox"
                                    disabled={!hasScrolled}
                                    checked={hasAccepted}
                                    onChange={(e) => setHasAccepted(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                />
                                <label htmlFor="termsAccepted" className="text-sm text-gray-800 cursor-pointer">
                                    I have read, understood, and agree to the{' '}
                                    <span className="font-semibold text-orange-700">Terms &amp; Conditions</span>{' '}
                                    of ICDRC mediator empanelment. I also declare that all information provided above
                                    is true and correct to the best of my knowledge.
                                </label>
                            </div>
                        </div>
                        {/* ── End Terms & Conditions ─────────────────────────────────── */}

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting || !hasAccepted}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
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
                            {!hasAccepted && (
                                <p className="text-center text-xs text-gray-500 mt-2">
                                    You must read and accept the Terms &amp; Conditions to submit.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <div className="h-1 border-t my-5 w-full"></div>
            <Footer />
        </div>
    );
}
