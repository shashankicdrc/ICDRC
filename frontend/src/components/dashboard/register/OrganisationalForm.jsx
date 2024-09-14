'use client';
import { Fragment, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { State, City } from 'country-state-city';
import './PhoneNumber.css';
import {
    insurance,
    PolicyType as InsurancePolicyType,
    problemOptions,
} from '../../../lib/constant';
import { Button } from '../../ui/button';
import { Loader2 } from 'lucide-react';
// import { makeKeys, encryptData, decryptData } from '../../../lib/Encryption';
import toast from 'react-hot-toast';
import { addOrganizationComplaint } from '../../../externalAPI/complaintService';
import { useSession } from 'next-auth/react';
import {
    SubscriptionStatus,
    checkSubscriptionStatus,
} from '../../../lib/subscription';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { initiatePayment } from '../../../externalAPI/paymentService';
import { useRouter } from 'next/navigation';
import { getUserSubscription } from '../../../externalAPI/subscriptionService';

const OganisationalForm = () => {
    const [organizationName, setorganizationName] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [policyCompany, setPolicyCompany] = useState('');
    const [policyType, setPolicyType] = useState('');
    const [otherPolicyType, setOtherPolicyType] = useState('');
    const [problem, setProblem] = useState('');
    const [problemDetails, setProblemDetails] = useState('');

    const [otherPolicyCompany, setOtherPolicyCompany] = useState('');
    const [otherProblem, setOtherProblem] = useState('');

    const [loading, setLoading] = useState(false);
    const [paymentLoading, setpaymentLoading] = useState(false);
    const { data: session } = useSession();
    const token = session?.user.AccessToken;
    const [cityData, setCityData] = useState();

    const states = State.getStatesOfCountry('IN');
    const [subscriptionData, setsubscriptionData] = useState({});
    const [subscriptionMessage, setsubscriptionMessage] = useState('');
    const [isValidSubscription, setIsValidSubscription] = useState(false);
    const [caseData, setCaseData] = useState({});
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const clearForm = () => {
        setorganizationName('');
        setName('');
        setMobile('');
        setEmail('');
        setState('');
        setCity('');
        setAddress('');
        setPolicyCompany(null);
        setPolicyType(null);
        setOtherPolicyType(null);
        setProblem(null);
        setProblemDetails('');
        setOtherPolicyCompany(null);
        setOtherProblem('');
    };

    useEffect(() => {
        const subscriptions = async () => {
            if (!token) return;
            const { data } = await getUserSubscription(token);
            setsubscriptionData(data);
            const planType = 'Organisational';
            const subscriptionStatus = checkSubscriptionStatus(data, planType);
            switch (subscriptionStatus) {
                case SubscriptionStatus.EXPIRED:
                    setIsValidSubscription(false);
                    setsubscriptionMessage(
                        'Your subscription has expired. You have to pay for case registration.',
                    );
                    break;

                case SubscriptionStatus.NOT_ACTIVE:
                    setIsValidSubscription(false);
                    setsubscriptionMessage('Your subscription is InActive.');
                    break;

                case SubscriptionStatus.LIMIT_EXCEEDED:
                    setIsValidSubscription(false);
                    setsubscriptionMessage(
                        'You have exceeded your complaint limit. You have to pay for case registration.',
                    );
                    break;
                case SubscriptionStatus.VALID:
                    setIsValidSubscription(true);
                    setsubscriptionMessage('Your subscription is valid.');
                    break;
                case SubscriptionStatus.DOES_NOT_EXIST:
                    setIsValidSubscription(false);
                    setsubscriptionMessage(
                        'Subscription does not exist. You have to pay for case registration.',
                    );
                    console.log('Subscription does not exist.');
                    break;
                default:
                    console.log('Unknown subscription status.');
            }
        };
        subscriptions();
    }, [session]);

    useEffect(() => {
        if (state?.length > 1) {
            let data = states.find((s) => s.name === state);
            data && setCityData(City.getCitiesOfState('IN', data?.isoCode));
            setCity('');
        }
    }, [state]);

    const initiateCasePayment = async (data) => {
        const plainObject = {
            id: data._id,
            complaintType: 'OrganizationComplaint',
            amount: 5000,
            userId: data.userId,
        };
        setCaseData(plainObject);
        onOpen();
    };

    const onSubmit = async () => {
        try {
            setLoading((prevState) => !prevState);
            if (!isValidPhoneNumber(mobile)) {
                toast.error('Enter a valid mobile number');
                setLoading((prevState) => !prevState);
                return;
            }

            const complaintData = {
                organizationName,
                name,
                mobile,
                email,
                state,
                city,
                address,
                policyType:
                    policyType === 'Other' ? otherPolicyType : policyType,
                policyCompany:
                    policyCompany === 'Other'
                        ? otherPolicyCompany
                        : policyCompany,
                otherPolicyType,
                problem,
                otherProblem,
                problemDetails,
                otherPolicyCompany,
                isSubscribed: isValidSubscription,
                subscriptionId: !subscriptionData
                    ? null
                    : (subscriptionData._id ?? null),
            };
            const { error, message, data } = await addOrganizationComplaint(
                token,
                complaintData,
            );
            setLoading((prevState) => !prevState);
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
            setCaseData(data);
            clearForm();
            if (!subscriptionData || !isValidSubscription) {
                initiateCasePayment(data);
            }
        } catch (error) {
            setLoading((prevState) => !prevState);
            toast.error(error.message);
        }
    };

    const makePayment = async (e) => {
        e.preventDefault();
        setpaymentLoading((prevState) => !prevState);
        try {
            if (!caseData) return setpaymentLoading((prevState) => !prevState);
            const { error, data } = await initiatePayment(token, caseData);
            setpaymentLoading((prevState) => !prevState);
            if (error) {
                toast.error(error);
                return;
            }
            router.push(data.instrumentResponse.redirectInfo.url);
        } catch (error) {
            console.error('Error while making payment:', error);
            setpaymentLoading((prevState) => !prevState);
            toast.error(error.message);
        }
    };

    return (
        <Fragment>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Make Payment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Your case has been registered sucessfully and an email
                        has been send regarding the case. For further processing
                        your case plase make the payment.
                    </ModalBody>
                    <ModalFooter className="space-x-3">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            disable={paymentLoading}
                        >
                            Cancel
                        </Button>
                        <Button disabled={paymentLoading} onClick={makePayment}>
                            {paymentLoading ? (
                                <>
                                    <Loader2
                                        className="animate-spin mr-2 w-4 h-4"
                                        size={30}
                                    />
                                    please wait ...
                                </>
                            ) : (
                                'Pay ₹5000'
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <form
                className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Enter your details</CardTitle>
                        </CardHeader>
                        <CardContent className="w-full">
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <Label>Orgaisation Name</Label>
                                    <Input
                                        value={organizationName}
                                        onChange={(e) =>
                                            setorganizationName(e.target.value)
                                        }
                                        required
                                        type="text"
                                        maxLength={50}
                                        placeholder="Enter your organisation name"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Name</Label>
                                    <Input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        type="text"
                                        maxLength={50}
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Email</Label>
                                    <Input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                        maxength={50}
                                        required={true}
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Phone Number</Label>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        placeholder="Enter phone number"
                                        onChange={setMobile}
                                        value={mobile}
                                        defaultCountry="IN"
                                        required
                                        maxLength={20}
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Policy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label>Policy Company</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setPolicyCompany(value)
                                        }
                                        value={policyCompany}
                                        required={true}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a policy company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {insurance
                                                .sort()
                                                .map((item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {policyCompany === 'Other' && (
                                    <div className="space-y-2">
                                        <Label>Enter other company name</Label>
                                        <Input
                                            required
                                            value={otherPolicyCompany}
                                            onChange={(e) =>
                                                setOtherPolicyCompany(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter other company name"
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label>Policy Type</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setPolicyType(value)
                                        }
                                        value={policyType}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a policy type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {InsurancePolicyType.sort().map(
                                                (item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ),
                                            )}
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {policyType === 'Other' && (
                                    <div className="space-y-2">
                                        <Label>Enter other policy type</Label>
                                        <Input
                                            required
                                            value={otherPolicyType}
                                            onChange={(e) =>
                                                setOtherPolicyType(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter other policy type"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Problem Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label>Problem Details</Label>
                                <Textarea
                                    required
                                    value={problemDetails}
                                    onChange={(e) =>
                                        setProblemDetails(e.target.value)
                                    }
                                    placeholder="Enter your full problem details"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Location Details</CardTitle>
                        </CardHeader>
                        <CardContent className="w-full">
                            <div className="space-y-2">
                                {states?.length > 0 && (
                                    <Fragment>
                                        <Label>State</Label>
                                        <Select
                                            value={state}
                                            onValueChange={(value) =>
                                                setState(value)
                                            }
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {states.map((state) => (
                                                    <SelectItem
                                                        key={state.isoCode}
                                                        value={state.name}
                                                    >
                                                        {state.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Fragment>
                                )}
                                {cityData?.length > 0 && state?.length > 0 && (
                                    <Fragment>
                                        <Label>City</Label>
                                        <Select
                                            required
                                            onValueChange={(value) =>
                                                setCity(value)
                                            }
                                            value={city}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cityData.map((city) => (
                                                    <SelectItem
                                                        key={city.name}
                                                        value={city.name}
                                                    >
                                                        {city.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Fragment>
                                )}
                                <div className="spacy-y-2">
                                    <Label> Address</Label>
                                    <Input
                                        value={address}
                                        required
                                        maxLength={200}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        placeholder="Enter your address"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Problems</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label>Problem</Label>
                                    <Select
                                        required
                                        onValueChange={(value) =>
                                            setProblem(value)
                                        }
                                        value={problem}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a problem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {problemOptions
                                                .sort()
                                                .map((problem, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={problem}
                                                    >
                                                        {problem}
                                                    </SelectItem>
                                                ))}
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {problem === 'Other' && (
                                    <div className="space-y-2">
                                        <Label>Enter Other Problem</Label>
                                        <Input
                                            value={otherProblem}
                                            required
                                            onChange={(e) =>
                                                setOtherProblem(e.target.value)
                                            }
                                            placeholder="Enter other problem"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    {subscriptionData && !isValidSubscription && (
                        <p className="pb-2 font-semibold w-full">
                            Note: {subscriptionMessage}
                        </p>
                    )}
                    {!caseData.hasOwnProperty('id') ? (
                        <Button className="w-fit" disabled={loading}>
                            {loading ? (
                                <Fragment>
                                    <Loader2 className="mr-2 animate-spin w-4 h-4" />
                                    Please wait...
                                </Fragment>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    ) : (
                        <div className="w-full space-y-2">
                            <p className="text-accent-foreground">
                                You have sucessfully register your case. Please
                                pay ₹5000 for further processing your case.{' '}
                            </p>
                            <Button onClick={onOpen}> Pay ₹5000</Button>
                        </div>
                    )}
                </div>
            </form>
        </Fragment>
    );
};

export default OganisationalForm;
