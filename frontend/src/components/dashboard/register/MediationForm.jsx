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
import { Loader2 } from 'lucide-react';
import {
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
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

    const {
        isOpen: isReviewOpen,
        onOpen: onReviewOpen,
        onClose: onReviewClose,
    } = useDisclosure();
    const {
        isOpen: isPaymentOpen,
        onOpen: onPaymentOpen,
        onClose: onPaymentClose,
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
                    // Find the most recent pending case that isn't subscribed
                    const pending = data.find(
                        (c) => c.paymentStatus === 'Pending',
                    );
                    if (pending) {
                        setPendingCase(pending);
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
        setFiles([...e.target.files]);
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

            console.log(mediationData);

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
            setShowPayment(true); // Always toggle to payment view for case fee
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    if (showPayment && pendingCase) {
        return (
            <div className="max-w-xl mx-auto py-10 px-4">
                <MediationPayment
                    caseData={pendingCase}
                    isSubscribed={isValidSubscription}
                />
            </div>
        );
    }

    return (
        <Fragment>
            {/* Review Modal */}
            <Modal isOpen={isReviewOpen} onClose={onReviewClose} size="xl">
                <ModalOverlay backdropFilter="blur(5px)" bg="blackAlpha.300" />
                <ModalContent className="dark:bg-[#0f172a] border dark:border-slate-800 rounded-2xl">
                    <ModalHeader className="border-b dark:border-slate-800 font-bold text-xl">
                        Review Your Submission
                    </ModalHeader>
                    <ModalCloseButton className="mt-2" />
                    <ModalBody className="py-6 max-h-[70vh] overflow-y-auto">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Full Name
                                    </p>
                                    <p className="font-medium">{fullName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Email
                                    </p>
                                    <p className="font-medium">{email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Opponent Name
                                    </p>
                                    <p className="font-medium">
                                        {opponentName}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Dispute Category
                                    </p>
                                    <p className="font-medium">{category}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Dispute Amount
                                    </p>
                                    <p className="font-medium">
                                        ₹{amount || 'N/A'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Jurisdiction
                                    </p>
                                    <p className="font-medium">
                                        {jurisdiction}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Language
                                    </p>
                                    <p className="font-medium">
                                        {language || 'Not Specified'}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Timeline of Events
                                </p>
                                <p className="text-sm bg-muted/30 p-3 rounded-lg">
                                    {timeline || 'N/A'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Description
                                </p>
                                <p className="text-sm bg-muted/50 p-3 rounded-lg">
                                    {description}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Desired Resolution
                                </p>
                                <p className="font-medium">{resolution}</p>
                            </div>
                            {files.length > 0 && (
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                                        Files Attached
                                    </p>
                                    <p className="text-sm">
                                        {files.length} document(s)
                                    </p>
                                </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex gap-3 pt-4 border-t dark:border-slate-800">
                        <Button
                            variant="outline"
                            onClick={onReviewClose}
                            className="px-6 rounded-full hover:bg-muted transition-colors"
                        >
                            Edit Details
                        </Button>
                        <Button
                            onClick={onConfirmSubmission}
                            className="px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-all shadow-lg hover:shadow-orange-500/20"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin mr-2" />
                            ) : (
                                'Confirm & Submit'
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

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
                    <CardContent>
                        <Input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
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
