import "../../src/styles/globals.css";
import { Suspense } from "react";
import PageLoader from "../components/pageloader/page";

import { Providers } from "./Providers";
import { store } from "../features/store";

import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast"

import { NextAuthProvider } from "./Providers";

export const metadata = {
    title: "ICDRC-One Stop Solution For Insurance Claim Dispute",
    description: "One Stop Solution For Insurance Claim Dispute",
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/favicon-32x32.png",
                href: "/favicon-32x32.png",
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: "/apple-touch-icon.png",
                sizes: "180x180",
                href: "/apple-touch-icon.png",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <Providers store={store}>
            <html lang="en">
                <body>
                    <main>
                        <Suspense fallback={<PageLoader />}>

                            <ChakraProvider>
                                <NextAuthProvider>
                                    {children}
                                </NextAuthProvider>

                                <Toaster /></ChakraProvider>

                        </Suspense>
                    </main>
                </body>
            </html>
        </Providers>
    );
}
