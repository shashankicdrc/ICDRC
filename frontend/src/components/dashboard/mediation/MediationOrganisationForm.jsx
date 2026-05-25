'use client';
import { Fragment, useRef, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../ui/card';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Loader2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../register/PhoneNumber.css';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Checkbox } from '@chakra-ui/react';
import { addMediationCase } from '../../../externalAPI/mediationService';

const MediationOrganisationForm = ({ onSuccess }) => {
    const { data: session } = useSession();
    const token = session?.user?.AccessToken;

    // Organisation Details
    const [organisationName, setOrganisationName] = useState('');
    const [organisationEmail, setOrganisationEmail] = useState('');
    const [organisationContact, setOrganisationContact] = useState('');
    const [organisationAddress, setOrganisationAddress] = useState('');

    // Contact Person Details
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');

    // Opposite Party Details
    const [opponentName, setOpponentName] = useState('');
    const [opponentEmail, setOpponentEmail] = useState('');
    const [opponentContact, setOpponentContact] = useState('');

    // Dispute Details
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    // Terms
    const [isChecked, setIsChecked] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const tcRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleTcScroll = () => {
        const el = tcRef.current;
        if (!el) return;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
            setHasScrolled(true);
        }
    };

    const clearForm = () => {
        setOrganisationName('');
        setOrganisationEmail('');
        setOrganisationContact('');
        setOrganisationAddress('');
        setFullName('');
        setEmail('');
        setContactNumber('');
        setWhatsappNumber('');
        setOpponentName('');
        setOpponentEmail('');
        setOpponentContact('');
        setDescription('');
        setAmount('');
        setIsChecked(false);
        setHasScrolled(false);
    };

    const onSubmit = async () => {
        try {
            setLoading(true);

            if (!isValidPhoneNumber(organisationContact)) {
                toast.error('Enter a valid organisation contact number');
                setLoading(false);
                return;
            }

            if (!isValidPhoneNumber(contactNumber)) {
                toast.error('Enter a valid contact person number');
                setLoading(false);
                return;
            }

            if (!isValidPhoneNumber(whatsappNumber)) {
                toast.error('Enter a valid WhatsApp number');
                setLoading(false);
                return;
            }

            if (!isValidPhoneNumber(opponentContact)) {
                toast.error('Enter a valid opposite party contact number');
                setLoading(false);
                return;
            }

            if (!isChecked) {
                toast.error('Please accept the Terms & Conditions to proceed');
                setLoading(false);
                return;
            }

            const mediationData = {
                caseType: 'Organisation',
                organisationName,
                organisationEmail,
                organisationContact,
                organisationAddress,
                fullName,
                email,
                contactNumber,
                whatsappNumber,
                opponentName,
                opponentEmail,
                opponentContact,
                description,
                amount: Number(amount),
                termsAccepted: true,
            };

            const { error, message } = await addMediationCase(
                token,
                mediationData,
            );
            setLoading(false);

            if (error) {
                return toast.error(error);
            }

            toast.success(message || 'Mediation case submitted successfully!');
            clearForm();
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <Fragment>
            <form
                className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    {/* Organisation Details */}
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Organisation Details</CardTitle>
                            <CardDescription>
                                Provide your organisation information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="w-full">
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <Label>Organisation Name</Label>
                                    <Input
                                        value={organisationName}
                                        onChange={(e) =>
                                            setOrganisationName(e.target.value)
                                        }
                                        required
                                        type="text"
                                        maxLength={150}
                                        placeholder="Enter organisation name"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Organisation Email</Label>
                                    <Input
                                        value={organisationEmail}
                                        onChange={(e) =>
                                            setOrganisationEmail(e.target.value)
                                        }
                                        required
                                        type="email"
                                        placeholder="Enter organisation email"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Organisation Contact Number</Label>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        placeholder="Enter organisation contact"
                                        onChange={setOrganisationContact}
                                        value={organisationContact}
                                        defaultCountry="IN"
                                        required
                                        maxLength={20}
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Organisation Address</Label>
                                    <Textarea
                                        value={organisationAddress}
                                        onChange={(e) =>
                                            setOrganisationAddress(
                                                e.target.value,
                                            )
                                        }
                                        required
                                        maxLength={300}
                                        placeholder="Enter organisation address"
                                        className="min-h-[80px] resize-y"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Person Details */}
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Contact Person Details</CardTitle>
                            <CardDescription>
                                Details of the person representing the
                                organisation
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="w-full">
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <Label>Full Name</Label>
                                    <Input
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                        required
                                        type="text"
                                        maxLength={100}
                                        placeholder="Enter contact person's full name"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Email Address</Label>
                                    <Input
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        type="email"
                                        placeholder="Enter contact person's email"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Contact Number</Label>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        placeholder="Enter contact number"
                                        onChange={setContactNumber}
                                        value={contactNumber}
                                        defaultCountry="IN"
                                        required
                                        maxLength={20}
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>WhatsApp Number</Label>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        placeholder="Enter WhatsApp number"
                                        onChange={setWhatsappNumber}
                                        value={whatsappNumber}
                                        defaultCountry="IN"
                                        required
                                        maxLength={20}
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dispute Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Dispute Details</CardTitle>
                            <CardDescription>
                                Describe the dispute and amount involved
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <Label>Short Description of Dispute</Label>
                                    <Textarea
                                        required
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="Briefly describe the dispute"
                                        className="min-h-[100px] resize-y"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Amount Involved in Dispute (₹)</Label>
                                    <Input
                                        required
                                        type="number"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        placeholder="Enter the dispute amount"
                                        min={0}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    {/* Opposite Party Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Opposite Party Details</CardTitle>
                            <CardDescription>
                                Provide details of the other party
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="w-full">
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <Label>Opposite Party Name</Label>
                                    <Input
                                        value={opponentName}
                                        onChange={(e) =>
                                            setOpponentName(e.target.value)
                                        }
                                        required
                                        type="text"
                                        maxLength={100}
                                        placeholder="Enter opposite party's name"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Opposite Party Email</Label>
                                    <Input
                                        value={opponentEmail}
                                        onChange={(e) =>
                                            setOpponentEmail(
                                                e.target.value,
                                            )
                                        }
                                        required
                                        type="email"
                                        placeholder="Enter opposite party's email"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Opposite Party Contact Number</Label>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        placeholder="Enter opposite party's contact"
                                        onChange={setOpponentContact}
                                        value={opponentContact}
                                        defaultCountry="IN"
                                        required
                                        maxLength={20}
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Terms & Conditions and Submit */}
                <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Terms &amp; Conditions</CardTitle>
                            <CardDescription>
                                Please read the full Terms &amp; Conditions carefully and scroll to the bottom before accepting.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Scrollable T&C box */}
                            <div
                                ref={tcRef}
                                onScroll={handleTcScroll}
                                className="h-64 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-4 text-sm text-gray-700 space-y-3 leading-relaxed"
                            >
                                <p className="font-semibold text-gray-800">By submitting this mediation request, you agree to comply with the following Terms &amp; Conditions of ICDRC.</p>

                                <div><p className="font-semibold text-gray-800 mb-1">1. Eligibility and Registration</p><p>1.1 You must possess the qualifications, certifications, and experience required under applicable laws and ICDRC policies.</p><p>1.2 You agree to provide accurate, complete, and updated information during onboarding and throughout your association with ICDRC.</p><p>1.3 ICDRC reserves the right to accept, reject, or revoke empanelment at its sole discretion.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">2. Role and Responsibilities</p><p className="mb-1">2.1 You agree to:</p><ul className="list-disc pl-5 space-y-1"><li>Participate in mediations impartially, independently, and in good faith.</li><li>Uphold the principles of neutrality, confidentiality, and fairness.</li><li>Ensure timely handling of assigned cases.</li><li>Comply with applicable mediation laws, rules, and ethical guidelines.</li></ul><p className="mt-2 mb-1">2.2 You shall not:</p><ul className="list-disc pl-5 space-y-1"><li>Represent any party in disputes assigned to you.</li><li>Engage in conduct that creates a conflict of interest.</li><li>Misuse your position for personal or financial gain.</li></ul></div>

                                <div><p className="font-semibold text-gray-800 mb-1">3. Code of Conduct</p><p>3.1 You agree to adhere to ICDRC&apos;s Code of Ethics and applicable professional standards.</p><p>3.2 You must disclose any actual or potential conflicts of interest before accepting an assignment.</p><p>3.3 You shall maintain professionalism and respect in all communications.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">4. Confidentiality</p><p>4.1 All mediation proceedings, documents, and communications are strictly confidential.</p><p>4.2 You shall not disclose any information related to cases handled through ICDRC unless required by law or with explicit written consent from all parties.</p><p>4.3 This obligation continues even after termination of your association with ICDRC.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">5. Assignment of Cases</p><p>5.1 ICDRC will assign cases based on availability, expertise, and other relevant criteria.</p><p>5.2 You have the right to accept or decline assignments; however, repeated or unjustified refusals may affect your status.</p><p>5.3 You must promptly inform ICDRC of your availability and any constraints.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">6. Fees and Payments</p><p>6.1 Fees shall be governed by ICDRC&apos;s fee structure or as agreed upon for specific cases.</p><p>6.2 Payments will be processed subject to completion of services and submission of required documentation.</p><p>6.3 You are responsible for complying with all applicable tax laws.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">7. Use of Platform</p><p>7.1 You agree to use ICDRC.in solely for professional mediation-related activities.</p><p className="mb-1">7.2 You shall not:</p><ul className="list-disc pl-5 space-y-1"><li>Upload or transmit harmful, unlawful, or misleading content.</li><li>Attempt to gain unauthorized access to the Platform or its data.</li></ul><p>7.3 ICDRC may monitor usage to ensure compliance.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">8. Intellectual Property</p><p>8.1 All content, materials, and systems on ICDRC.in are the property of ICDRC or its licensors.</p><p>8.2 You may not copy, distribute, or reproduce any materials without prior written consent.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">9. Data Protection and Privacy</p><p>9.1 You agree to handle all personal data in accordance with applicable data protection laws.</p><p>9.2 You shall implement reasonable safeguards to protect sensitive information accessed during mediation.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">10. Performance and Review</p><p className="mb-1">10.1 ICDRC reserves the right to evaluate performance based on:</p><ul className="list-disc pl-5 space-y-1"><li>Timeliness</li><li>Feedback from parties</li><li>Compliance with standards</li></ul><p>10.2 ICDRC may suspend or terminate empanelment for unsatisfactory performance or misconduct.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">11. Termination</p><p>11.1 Either party may terminate the association with written notice.</p><p className="mb-1">11.2 ICDRC may terminate immediately in cases of:</p><ul className="list-disc pl-5 space-y-1"><li>Breach of these Terms</li><li>Ethical violations</li><li>Legal non-compliance</li></ul><p>11.3 Ongoing cases must be completed or transitioned as directed by ICDRC.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">12. Limitation of Liability</p><p className="mb-1">12.1 ICDRC shall not be liable for:</p><ul className="list-disc pl-5 space-y-1"><li>Any disputes arising from mediation outcomes</li><li>Actions taken by parties during or after mediation</li></ul><p>12.2 Your role is limited to facilitation, and you are not responsible for enforcing settlements.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">13. Indemnity</p><p>You agree to indemnify and hold harmless ICDRC, its officers, and affiliates from any claims, damages, or liabilities arising from your actions, omissions, or breach of these Terms.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">14. Amendments</p><p>ICDRC reserves the right to modify these Terms at any time. Updated versions will be posted on ICDRC.in. Continued use constitutes acceptance of revised Terms.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">15. Governing Law and Jurisdiction</p><p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in India.</p></div>

                                <div><p className="font-semibold text-gray-800 mb-1">16. Contact Information</p><p>For queries: <a href="mailto:info@icdrc.in" className="text-orange-600 hover:underline">info@icdrc.in</a> | <a href="https://www.icdrc.in" className="text-orange-600 hover:underline">www.icdrc.in</a></p></div>

                                <div className="border-t border-gray-200 pt-3"><p className="font-semibold text-gray-800">Declaration</p><p>By proceeding, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p></div>
                            </div>

                            {/* Scroll hint */}
                            {!hasScrolled && (
                                <p className="text-xs text-amber-600">↕ Please scroll through the full Terms &amp; Conditions above to enable the checkbox.</p>
                            )}

                            {/* Acceptance checkbox — unlocks after scrolling */}
                            <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                                hasScrolled ? 'bg-orange-50 border-orange-200' : 'bg-gray-100 border-gray-200 opacity-60 pointer-events-none select-none'
                            }`}>
                                <Checkbox
                                    colorScheme="orange"
                                    size="sm"
                                    isChecked={isChecked}
                                    isDisabled={!hasScrolled}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                >
                                    I have read, understood, and agree to the <span className="font-semibold text-orange-700">Terms &amp; Conditions</span> of ICDRC.
                                </Checkbox>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-1">
                        <Button className="w-fit" disabled={loading || !isChecked}>
                            {loading ? (
                                <Fragment>
                                    <Loader2 className="mr-2 animate-spin w-4 h-4" />
                                    Please wait...
                                </Fragment>
                            ) : (
                                'Submit Mediation Request'
                            )}
                        </Button>
                        {!isChecked && (
                            <p className="text-xs text-gray-500">You must read and accept the Terms &amp; Conditions to submit.</p>
                        )}
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default MediationOrganisationForm;
