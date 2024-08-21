
import ChangeName from "@/components/form/settings/ChangeName";
import { getAdminById } from "@/externalAPI/adminService";
import { authOptions } from "@/lib/authOptions";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Settings",
};

export default async function page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("You are unauthorized.");
    }
    const token = session.user.AccessToken as string;
    const { data, error } = await getAdminById(token, session.user.id as string);
    if (error) {
        return <div className="text-center">{error}</div>;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Name</CardTitle>
            </CardHeader>
            <CardContent>
                <ChangeName data={data} />
            </CardContent>
        </Card>
    );
}
