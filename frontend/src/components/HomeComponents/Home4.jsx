
import {
    CalendarCheck,
    CreditCard,
    LogIn,
    ThumbsUp,
    Handshake,
    UserRoundPlus
} from 'lucide-react';
import '../../styles/module.home4.css';
import { TbUserStar } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";

const Home4 = () => {
    return (
        <div className="my-8 md:py-12">
            <h1
                className=" text-3xl md:text-6xl font-[Roboto] font-bold text-center px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                Mediation Process at ICDRC
            </h1>
            <p
                className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                At ICDRC, we provide a structured and efficient mediation process to help parties resolve insurance disputes amicably through expert-guided discussions and mutually acceptable settlements.{' '}
            </p>

            <div className="container mx-auto overflow-hidden">
                <div className="row">
                    <div className="col-md-12">
                        <div className="road-map-main">

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <UserRoundPlus
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
                                        Sign Up{' '}
                                    </h4>
                                    <p className="card-text">
                                        Create your account on the ICDRC mediation portal to access our dispute resolution services. Registration is simple, secure, and takes only a few minutes.{' '}
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
                                        Sign In{' '}
                                    </h4>
                                    <p className="card-text">
                                        Log in using your registered credentials to access your dashboard, manage cases, and track the progress of your mediation requests.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <GoChecklist
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
                                        Submit Case Details{' '}
                                    </h4>
                                    <p className="card-text">
                                    Provide the required information, including parties’ details, dispute description, insurance policy information, claim amount, and relevant case particulars. Upload supporting documents for a comprehensive review.{' '}
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
                                        />
                                    </span>
                                </div>
                                <div
                                    className="road-map-card"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Registration Fee Payment{' '}
                                    </h4>
                                    <p className="card-text">
                                    Complete the registration process by paying the applicable fee through our secure online payment system. Your submission will be processed upon successful payment.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <Handshake
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
                                    Opposite Party Consent
                                    </h4>
                                    <p className="card-text">
                                    Our team will contact the opposite party and explain the mediation process. Mediation proceedings will commence once consent is obtained from all participating parties.{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="road-map-wrapper">
                                <div className="road-map-circle">
                                    <span className="road-map-circle-text flex items-center justify-center">
                                        <TbUserStar
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
                                        Mediator Appointment
                                    </h4>
                                    <p className="card-text">
                                        Upon receiving consent, ICDRC will appoint an experienced Insurance Expert Mediator to facilitate fair and impartial discussions between the parties.{' '}
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
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                >
                                    <h4 className="card-head">
                                        Schedule Mediation Session
                                    </h4>
                                    <p className="card-text">
                                        A mediation session will be scheduled at a mutually convenient date and time in consultation with both parties and the appointed mediator.{' '}
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
                                        Dispute Resolution
                                    </h4>
                                    <p className="card-text">
                                        Participate in the mediation process to explore mutually acceptable solutions and work toward an amicable resolution of the dispute in a confidential and efficient manner.{' '}
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
