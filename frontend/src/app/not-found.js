import Link from 'next/link';
import { Button } from '../components/ui/button';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="mx-5 md:mx-auto md:w-[70%] flex flex-col items-center justify-center">
                <div className="flex flex-col text-center">
                    <p className="text-8xl font-bold text-primary font-[Roboto]">
                        404
                    </p>
                    <p className="text-5xl font-semibold text-primary font-[Poppins] mt-4">
                        The Page you are looking for is not available.
                    </p>
                    <p className="text-3xl font-semibold text-primary font-[Poppins] mt-4">
                        You can return back to home page.
                    </p>
                    <div className="flex items-center space-x-3 my-5 justify-center">
                        <Button asChild>
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                        <span>or</span>
                        <Button asChild variant="outline">
                            <Link href="/">Go to Home</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

