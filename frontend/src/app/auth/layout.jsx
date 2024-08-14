
import Image from "next/image";

export default function layout({ children }) {
    return (
        <main className="container max-w-screen-2xl">
            <div className="w-full lg:grid min-h-[600px] lg:grid-cols-2 gap-20">
                <div className="hidden my-5 lg:block">
                    <Image
                        src="/auth.jpg"
                        alt="Auth Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover"
                    />
                </div>

                <section className="flex items-center justify-center">
                    {children}
                </section>
            </div>
        </main>
    );
}
