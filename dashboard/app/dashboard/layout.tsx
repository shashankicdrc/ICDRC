
import DashboardLayoutNavbar from "@/components/dashboard/Navbar/DashboardLayoutNavbar";
import { Metadata } from "next";

interface Props {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "ICDRC - Admin Dashboard"
}

export default function layout({ children }: Props) {
    return (
        <DashboardLayoutNavbar >{children}</DashboardLayoutNavbar>
    );
}
