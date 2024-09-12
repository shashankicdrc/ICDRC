'u/home/hayat/Downloads/Reach out to us, Our Process, About us/Complaint Resolution.webpse client';
import {
    CalendarCheck,
    CreditCard,
    FilePenLine,
    FileStack,
    LogIn,
    SquareMousePointer,
    ThumbsUp,
} from 'lucide-react';
import '../../styles/module.home4.css';

const Home4 = () => {
    return (
        <div className="my-8 md:py-12">
            <h1
                className=" text-3xl md:text-6xl font-[Roboto] font-bold text-center px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                Claim Resolution Process at ICDRC
            </h1>
            <p
                className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                At ICDRC, we offer an efficient process for resolving insurance
                disputes through expert arbitration, settlements, and
                litigation.{' '}
            </p>

            <div className="container mx-auto overflow-hidden">
                <div className="row">
                    <div className="col-md-12">
                        <div className="road-map-main">
                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <SquareMousePointer
                                            style={{
                                                height: '40px',
                                                width: '110px',
                                            }}
                                        />
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Choose Your Subscription{' '}
                                    </h4>
                                    <p className="card-text">
                                        Select the subscription plan that suits
                                        your needs—whether you are an individual
                                        or representing an organization. Each
                                        plan offers tailored support for your
                                        insurance dispute resolution.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <LogIn
                                            style={{
                                                height: '40px',
                                                width: '110px',
                                            }}
                                        />
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Create Your Account & Login{' '}
                                    </h4>
                                    <p className="card-text">
                                        Start by creating your account on our
                                        website and logging in to access our
                                        services. Our team is ready to assist
                                        you throughout your journey.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <CreditCard
                                            style={{
                                                height: '40px',
                                                width: '110px',
                                            }}
                                        />{' '}
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Subscription Fee Payment{' '}
                                    </h4>
                                    <p className="card-text">
                                        Pay the subscription fee to proceed: Rs.
                                        199 for individuals and Rs. 1999 for
                                        organizations. Our affordable fees
                                        ensure high-quality service without
                                        breaking the bank.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <FilePenLine
                                            style={{
                                                height: '40px',
                                                width: '110px',
                                            }}
                                        />
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Register a Case{' '}
                                    </h4>
                                    <p className="card-text">
                                        Submit your insurance-related case by
                                        providing a clear description of your
                                        issue. This is the first step in
                                        addressing and resolving your concerns
                                        efficiently.
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <FileStack
                                            style={{
                                                height: '40px',
                                                width: '110px',
                                            }}
                                        />
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Share Your Documents
                                    </h4>
                                    <p className="card-text">
                                        Upload the necessary insurance documents
                                        and KYC details securely. This helps us
                                        fully understand your case and ensures
                                        an accurate, thorough assessment.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <CalendarCheck
                                            style={{
                                                height: '40px',
                                                width: '110px',
                                            }}
                                        />
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Schedule an Appointment
                                    </h4>
                                    <p className="card-text">
                                        We’ll handle the appointment scheduling
                                        for you. Our team will contact you at
                                        your preferred time, making it
                                        convenient to discuss your case in
                                        detail.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <ThumbsUp
                                            style={{
                                                height: '40px',
                                                width: '110px',
                                            }}
                                        />
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Complaint Resolution
                                    </h4>
                                    <p className="card-text">
                                        Our team will work diligently to resolve
                                        your complaint, ensuring a fair and
                                        satisfactory outcome. We charge a
                                        success fee of 10% + GST, which is the
                                        lowest in the industry. Your
                                        satisfaction is our priority.{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home4;
