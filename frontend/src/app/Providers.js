"use client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../features/store";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
    return <ReduxProvider store={store}>
        {children}
    </ReduxProvider>;
}

export const NextAuthProvider = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};
