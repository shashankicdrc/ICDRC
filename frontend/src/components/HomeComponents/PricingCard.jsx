import Link from 'next/link';
import { Button } from '../ui/button';
import '../../styles/module.home5.css';
import { IndividualFeature, OrganizationalFeature } from './PlanFeatures';

const PricingCard = () => {
    const plans = ['66dc3f2cb7e56779f870c7ab', '66dc3f1cb7e56779f870c7a9'];
    return (
        <section className="bg-background home5-bg" id="subscription">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="text-3xl md:text-6xl py-2 font-[Roboto] font-bold text-center  px-8">
                        Subscription Plans
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
                    <div className="flex flex-col p-6 relative text-center text-gray-900 bg-white rounded-lg border xl:p-8">
                        <h3 className=" text-2xl font-semibold">
                            For An Individual
                        </h3>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">
                                ₹199
                            </span>
                        </div>
                        <IndividualFeature />
                        <div className="">
                            <Button asChild className="w-full capitalize">
                                <Link
                                    href={`/dashboard/subscription?plan=${plans[0]}`}
                                >
                                    Get started
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col p-6 text-center text-gray-900 bg-white rounded-lg border">
                        <h3 className="text-2xl font-semibold">
                            For An Organization
                        </h3>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">
                                ₹1999
                            </span>
                        </div>
                        <OrganizationalFeature />
                        <Link
                            href={`/dashboard/subscription?plan=${plans[1]}`}
                            className="bg-primary capitalize hover:bg-primary/90 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingCard;
