'use client';
import { Fragment, useState } from 'react';
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

const MediationIndividualForm = () => {
    const { data: session } = useSession();
    const token = session?.user?.AccessToken;

    // Individual Fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    // Opposite Party Fields
    const [oppositePartyName, setOppositePartyName] = useState('');
    const [oppositePartyEmail, setOppositePartyEmail] = useState('');
    const [oppositePartyContact, setOppositePartyContact] = useState('');

    // Dispute Details
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    // Terms
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const clearForm = () => {
        setFullName('');
        setEmail('');
        setContact('');
        setWhatsapp('');
        setOppositePartyName('');
        setOppositePartyEmail('');
        setOppositePartyContact('');
        setDescription('');
        setAmount('');
        setIsChecked(false);
    };

    const onSubmit = async () => {
        try {
            setLoading(true);

            if (!isValidPhoneNumber(contact)) {
                toast.error('Enter a valid contact number');
                setLoading(false);
                return;
            }

            if (!isValidPhoneNumber(whatsapp)) {
                toast.error('Enter a valid WhatsApp number');
                setLoading(false);
                return;
            }

            if (!isValidPhoneNumber(oppositePartyContact)) {
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
                type: 'Individual',
                fullName,
                email,
                contact,
                whatsapp,
                oppositePartyName,
                oppositePartyEmail,
                oppositePartyContact,
                description,
                amount,
            };

            // TODO: Replace with actual API call when backend is ready
            console.log('Mediation Individual Data:', mediationData);
            toast.success('Mediation case submitted successfully!');
            clearForm();
            setLoading(false);
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
                    {/* Personal Details */}
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Your Details</CardTitle>
                            <CardDescription>
                                Please provide your personal information
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
                                        placeholder="Enter your full name"
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
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Contact Number</Label>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        placeholder="Enter contact number"
                                        onChange={setContact}
                                        value={contact}
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
                                        onChange={setWhatsapp}
                                        value={whatsapp}
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
                                        value={oppositePartyName}
                                        onChange={(e) =>
                                            setOppositePartyName(e.target.value)
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
                                        value={oppositePartyEmail}
                                        onChange={(e) =>
                                            setOppositePartyEmail(
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
                                        onChange={setOppositePartyContact}
                                        value={oppositePartyContact}
                                        defaultCountry="IN"
                                        required
                                        maxLength={20}
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Terms & Conditions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Terms & Conditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                By submitting this mediation request, you agree
                                to participate in good faith in the mediation
                                process. All discussions during mediation are
                                confidential and without prejudice. The mediator
                                acts as a neutral facilitator and does not impose
                                any decision on the parties.
                            </CardDescription>
                            <div className="my-4 flex items-center">
                                <Checkbox
                                    colorScheme="orange"
                                    size="sm"
                                    isChecked={isChecked}
                                    onChange={(e) =>
                                        setIsChecked(e.target.checked)
                                    }
                                >
                                    I accept the Terms & Conditions.
                                </Checkbox>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Submit */}
                <div>
                    <Button className="w-fit" disabled={loading}>
                        {loading ? (
                            <Fragment>
                                <Loader2 className="mr-2 animate-spin w-4 h-4" />
                                Please wait...
                            </Fragment>
                        ) : (
                            'Submit Mediation Request'
                        )}
                    </Button>
                </div>
            </form>
        </Fragment>
    );
};

export default MediationIndividualForm;
