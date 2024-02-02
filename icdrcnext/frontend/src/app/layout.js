import "../../src/styles/globals.css";
import { Suspense } from "react";
import PageLoader from "../components/pageloader/page";

import { Providers } from "./Providers";
import store from '../features/store';

export const metadata = {
  title: "ICDRC: ",
  description: "One Stop Solution For Insurance Claim Dispute",
};

export default function RootLayout({ children }) {
  return (
    <Providers store={store}>
      <html lang="en">
        <body>
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </body>
      </html>
    </Providers>
  );
}
