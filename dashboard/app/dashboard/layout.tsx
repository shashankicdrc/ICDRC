
import DashboardLayoutNavbar from "@/components/dashboard/Navbar/DashboardLayoutNavbar";
interface Props {
    children: React.ReactNode;
}
export default function layout({ children }: Props) {
    return (
        <DashboardLayoutNavbar >{children}</DashboardLayoutNavbar>
    );
}
