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
import { makeKeys, encryptData, decryptData } from '../../../lib/Encryption';
import { payment } from '../../../../action/serverActions';
import toast from 'react-hot-toast';
import { addIndividualComplaint } from '../../../externalAPI/complaintService';
import { useSession } from 'next-auth/react';

const IndividualForm = () => {
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

    useEffect(() => {
        let db;

        const dbRequest = indexedDB.open('ICDRCDatabase', 1);

        dbRequest.onupgradeneeded = function (e) {
            console.log('upgrading...');
            db = e.target.result;

            db.onerror = (e) => {
                console.error('error happend', db.error);
            };

            // Create an objectStore for this database
            db.createObjectStore('individual', {
                keyPath: 'id',
            });
        };

        dbRequest.onerror = (event) => {
            console.log(`Error while loading`, dbRequest.error);
        };

        dbRequest.onsuccess = (e) => {
            console.log('sucessfully open');
            db = dbRequest.result;

            const objectStore = db
                .transaction('individual', 'readonly')
                .objectStore('individual');
            const request = objectStore.get(1);

            request.onsuccess = async (e) => {
                console.log('success');
                const result = request.result;
                if (result) {
                    const keys = result.keys;
                    const encryptData = result.data;
                    const decryptedData = await decryptData(encryptData, keys);
                    const decryptedJSON = new TextDecoder().decode(
                        decryptedData,
                    );
                    const decryptedObject = JSON.parse(decryptedJSON);
                    setCaseData([decryptedObject]);
                }
            };

            request.onerror = (e) => {
                console.error(
                    'Error fetching data from IndexedDB:',
                    e.target.error,
                );
            };
        };
    }, []);

    useEffect(() => {
        if (state?.length > 1) {
            let data = states.find((s) => s.name === state);
            data && setCityData(City.getCitiesOfState('IN', data?.isoCode));
            setCity('');
        }
    }, [state]);

    const onSubmit = async () => {
        try {
            setLoading((prevState) => !prevState);
            if (!isValidPhoneNumber(mobile)) {
                toast.error('Enter a valid mobile number');
                setLoading((prevState) => !prevState);
                return;
            }

            const complaintData = {
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
            };
            const { error, message } = await addIndividualComplaint(
                token,
                complaintData,
            );
            setLoading((prevState) => !prevState);
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
        } catch (error) {
            setLoading((prevState) => !prevState);
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
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Enter your details</CardTitle>
                        </CardHeader>
                        <CardContent className="w-full">
                            <div className="grid gap-4">
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
                                        maxLength={20}
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
                                        required
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
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a state" />
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
            </form>
        </Fragment>
    );
};

export default IndividualForm;
