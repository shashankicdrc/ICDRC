'use client';

import { Fragment, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '../../ui/card';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../../ui/select';
import { Button } from '../../ui/button';
import { Loader2, File, X, UploadCloud } from 'lucide-react';
import {
    Checkbox,
    useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getUserSubscription } from '../../../externalAPI/subscriptionService';
import {
    checkSubscriptionStatus,
    SubscriptionStatus,
} from '../../../lib/subscription';
import {
    addMediationCase,
    getUserMediationCases,
} from '../../../externalAPI/mediationService';
import MediationPayment from '../mediation/MediationPayment';
import MediationCaseList from '../mediation/MediationCaseList';
import ReviewModal from '../mediation/ReviewModal';


const MediationForm = () => {
    const { data: session } = useSession();
    const token = session?.user?.AccessToken;
    const router = useRouter();

    // Basic Details
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [opponentName, setOpponentName] = useState('');
    const [description, setDescription] = useState('');

    // Case Details
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [timeline, setTimeline] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [language, setLanguage] = useState('');

    // Files
    const [files, setFiles] = useState([]);

    // Resolution
    const [resolution, setResolution] = useState('');

    // Subscription
    const [subscriptionData, setSubscriptionData] = useState({});
    const [isValidSubscription, setIsValidSubscription] = useState(false);
    const [subscriptionMessage, setSubscriptionMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [pendingCase, setPendingCase] = useState(null); // To store the submitted case if payment is needed
    const [showPayment, setShowPayment] = useState(false); // To toggle between form and payment view
    const [allCases, setAllCases] = useState([]); // Store all cases for history


    const {
        isOpen: isReviewOpen,
        onOpen: onReviewOpen,
        onClose: onReviewClose,
    } = useDisclosure();

    useEffect(() => {
        const fetchSubscription = async () => {
            if (!token) return;
            const { data } = await getUserSubscription(token);
            setSubscriptionData(data);

            const status = checkSubscriptionStatus(data, 'Mediation');
            if (status === SubscriptionStatus.VALID) {
                setIsValidSubscription(true);
            } else {
                setIsValidSubscription(false);
                setSubscriptionMessage('Subscription required or expired.');
            }
        };

        const checkPendingCase = async () => {
            if (!token) return;
            try {
                const { data, error } = await getUserMediationCases(token);
                if (data && data.length > 0) {
                    setAllCases(data); // Store all cases for the summary list
                    
                    // Find the most recent active case that isn't closed
                    const activeCase = data.find((c) => c.status !== 'Closed');
                    if (activeCase) {
                        setPendingCase(activeCase);
                        setShowPayment(true);
                    }
                }
            } catch (err) {
                console.error('Error checking pending case:', err);
            }
        };

        fetchSubscription();
        checkPendingCase();
    }, [token]);

    useEffect(() => {
        if (session?.user?.email) {
            setEmail(session.user.email);
        }
    }, [session]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleReviewSubmit = () => {
        if (!isChecked) {
            return toast.error('Please accept terms to proceed');
        }
        // Open review modal instead of direct submission
        onReviewOpen();
    };

    const onConfirmSubmission = async () => {
        onReviewClose();
        setLoading(true);

        try {
            const mediationData = {
                fullName,
                email,
                opponentName,
                description,
                category,
                amount,
                timeline,
                jurisdiction,
                language,
                resolution,
                files,
                isSubscribed: isValidSubscription,
                subscriptionId: subscriptionData?._id ?? null,
            };

            const { error, message, data } = await addMediationCase(
                token,
                mediationData,
            );

            if (error) {
                setLoading(false);
                return toast.error(error);
            }

            toast.success(message || 'Mediation case submitted successfully');
            setLoading(false);

            setPendingCase(data); // Set the returned case data
            setAllCases((prev) => [data, ...prev]); // Add the new case to the history list
            setShowPayment(true); // Always toggle to payment view for case fee
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    if (showPayment && pendingCase && pendingCase.status !== 'Closed') {
        const needsPayment = pendingCase.paymentStatus === 'Pending' || pendingCase.paymentStatus === 'Failed';
        
        return (
            <div className="max-w-xl mx-auto py-10 px-4">
                {needsPayment && (
                    <MediationPayment
                        caseData={pendingCase}
                        isSubscribed={isValidSubscription}
                    />
                )}
                <MediationCaseList cases={allCases} />
            </div>
        );
    }

    return (
        <Fragment>
            <ReviewModal
                isOpen={isReviewOpen}
                onClose={onReviewClose}
                formData={{
                    fullName,
                    email,
                    opponentName,
                    description,
                    category,
                    amount,
                    timeline,
                    jurisdiction,
                    language,
                    files,
                    resolution
                }}
                onConfirm={onConfirmSubmission}
                loading={loading}
            />

            <form
                className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleReviewSubmit();
                }}
            >
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mediation Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <Label>Full Name</Label>
                            <Input
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <Label>Email Address</Label>
                            <Input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address (auto-filled)"
                                disabled
                                className="bg-muted/50 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <Label>Opponent Name</Label>
                            <Input
                                required
                                value={opponentName}
                                onChange={(e) =>
                                    setOpponentName(e.target.value)
                                }
                                placeholder="Enter name of the other party"
                            />
                        </div>

                        <div>
                            <Label>Short Description of Dispute</Label>
                            <Textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-[90px] resize-y"
                                placeholder="Briefly explain the issue you are facing"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Case Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Add Case Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <Label>Dispute Category</Label>
                            <Input
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g. Commercial, Family, Labour"
                            />
                        </div>

                        <div>
                            <Label>Dispute Amount</Label>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Total value of the dispute in ₹"
                            />
                        </div>

                        <div>
                            <Label>Timeline of Events</Label>
                            <Textarea
                                value={timeline}
                                onChange={(e) => setTimeline(e.target.value)}
                                placeholder="Key dates and events leading to this dispute"
                            />
                        </div>

                        <div>
                            <Label>Jurisdiction / Country</Label>
                            <Input
                                required
                                value={jurisdiction}
                                onChange={(e) =>
                                    setJurisdiction(e.target.value)
                                }
                                placeholder="State or country of residence"
                            />
                        </div>

                        <div>
                            <Label>Preferred Language</Label>
                            <Input
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                placeholder="e.g. English, Hindi"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Evidence Upload */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Evidence</CardTitle>
                        <CardDescription>
                            Contracts, Invoices, Screenshots, Emails, Images /
                            PDFs
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative group border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 transition-all hover:bg-muted/50 hover:border-orange-500/30 flex flex-col items-center justify-center gap-3">
                            <Input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="p-3 bg-orange-500/10 rounded-full group-hover:scale-110 transition-transform">
                                <UploadCloud className="w-8 h-8 text-orange-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-lg">Click to Upload</p>
                                <p className="text-sm text-muted-foreground">or drag and drop multiple files here</p>
                            </div>
                            <div className="text-xs bg-muted border rounded-full px-4 py-1.5 font-medium text-muted-foreground">
                                Supported: PDF, Images, Word documents
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="group relative flex items-center gap-3 p-3 bg-card border rounded-xl hover:border-orange-500/50 transition-all shadow-sm"
                                    >
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <File className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate pr-6">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground uppercase">
                                                {(file.size / 1024).toFixed(0)} KB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Resolution Preference */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resolution Preference</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select
                            onValueChange={setResolution}
                            value={resolution}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select desired outcome" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Refund">Refund</SelectItem>
                                <SelectItem value="Compensation">
                                    Compensation
                                </SelectItem>
                                <SelectItem value="Payment Plan">
                                    Payment Plan
                                </SelectItem>
                                <SelectItem value="Replacement">
                                    Replacement
                                </SelectItem>
                                <SelectItem value="Other">
                                    Other negotiated outcome
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="mt-4">
                            <Checkbox
                                isChecked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            >
                                I accept the terms and conditions.
                            </Checkbox>
                        </div>
                    </CardContent>
                </Card>

                <Button disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2 w-4 h-4" />
                            Please wait...
                        </>
                    ) : (
                        'Submit Mediation Case'
                    )}
                </Button>
            </form>
        </Fragment>
    );
};

export default MediationForm;
