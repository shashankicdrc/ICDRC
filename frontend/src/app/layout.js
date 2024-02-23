import "../../src/styles/globals.css";
import { Suspense } from "react";
import PageLoader from "../components/pageloader/page";

import { Providers } from "./Providers";
import { store } from "../features/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";


export const metadata = {
  title: "ICDRC-One Stop Solution For Insurance Claim Dispute",
  description: "One Stop Solution For Insurance Claim Dispute",
};

export default function RootLayout({ children }) {
  return (
    <Providers store={store}>
      <html lang="en">
        <body>
          <main>
            <Suspense fallback={<PageLoader />}>
              
             <ChakraProvider>{children}</ChakraProvider> 
              
              </Suspense>
          </main>
        </body>
      </html>
    </Providers>
  );
}
