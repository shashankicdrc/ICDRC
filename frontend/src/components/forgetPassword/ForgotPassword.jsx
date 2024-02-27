
import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import { UserAuthAPI } from '..//..//app/api';
import { toast } from 'react-hot-toast';
import { apiConnector } from '..//..//app/apiconnector'

const ForgotPassword = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [otpSend, setOtpSend] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');

    const [verify, setVerify] = useState(false);

    const sendCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({
                method: 'GET',
                url: UserAuthAPI.userSendOTP_API + `?email=${email}`,
            })
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setOtpSend(true);
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
    }

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({
                method: 'POST',
                url: UserAuthAPI.userVerifyOTP_API,
                bodyData: {
                    email: email,
                    OTP: otp,
                }
            })
            // console.log(res.data)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setVerify(true);
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
    }

    const UpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({
                method: 'PUT',
                url: UserAuthAPI.userUpdatePassword_API + `/${email}`,
                bodyData: {
                    newPassword: password,
                    OTP: otp,
                },
            })
            // console.log(res.data)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setPassword('');
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
    }
    return (
        <>
            <p className='font-[Poppins] text-sm text-red-600 font-[500] underline tracking-wider' onClick={onOpen} ref={btnRef}>
                <Button>Forgot Password?</Button>
            </p>

            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="outside"
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className='font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4'>
                            FORGOT PASSWORD
                        </p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='flex flex-col gap-3'>
                            {!verify ?
                                <>
                                    {!otpSend &&
                                        <>
                                            <p className='tracking-wide text-center text-blue-600 font-[Poppins] font-[500]  text-sm' >
                                                Enter Your Email Id
                                            </p>
                                            <div className='mb-4 flex flex-col'>
                                                <input onChange={(e) => setEmail(e.target.value)} autoComplete="email" value={email} name="email" type="email" className='text-sm border-2 border-green-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                            </div>
                                            <div className='flex justify-center items-center'>
                                                <Button isLoading={loading} isDisabled={loading} colorScheme="blue" size="sm" onClick={sendCode}>
                                                    <p className='font-[Poppins] font-[400] tracking-wider'
                                                    >
                                                        Send Code
                                                    </p>
                                                </Button>
                                            </div>
                                        </>
                                    }
                                    {
                                        otpSend &&
                                        <div className=''>
                                            <h2 className='font-[Poppins] text-center font-[500] pb-4 text-sm tracking-wide'>Enter OTP send to {" "}
                                                <span className='text-blue-600 italic underline'>{email}</span>
                                            </h2>

                                            <div className='mb-4 flex flex-col'>
                                                <label htmlFor="otp" className='text-sm font-[Poppins] font-[500]'>OTP</label>
                                                <input onChange={(e) => setOtp(e.target.value)} autoComplete="otp" value={otp} name="otp" type="text" className='text-sm border-2 border-green-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                            </div>

                                            <div className='flex justify-center items-center mt-4'>
                                                <Button isLoading={loading} isDisabled={loading} colorScheme="teal" size="sm" onClick={handleOtpVerify} >
                                                    <p className='font-[Poppins] font-[400] tracking-wider'
                                                    >
                                                        Verify OTP
                                                    </p>
                                                </Button>
                                            </div>


                                        </div>
                                    }
                                </>
                                :
                                <>
                                    <div className=''>
                                        <h2 className='font-[Poppins] text-center font-[500] pb-4 text-sm tracking-wide'>
                                            Enter Your New Password
                                        </h2>

                                        <div className='mb-4 flex flex-col'>
                                            <input onChange={(e) => setPassword(e.target.value)} autoComplete="password" value={password} name="password" type="text" className='text-sm border-2 border-green-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                        </div>

                                        <div className='flex justify-center items-center mt-4'>
                                            <Button isLoading={loading} isDisabled={loading} colorScheme="teal" size="sm"
                                                onClick={UpdatePassword} >
                                                <p className='font-[Poppins] font-[400] tracking-wider'
                                                >
                                                    Update Password
                                                </p>
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" size="sm" onClick={onClose}>
                            <p className='font-[Poppins] font-[400] tracking-wider'
                            >
                                Close</p>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ForgotPassword