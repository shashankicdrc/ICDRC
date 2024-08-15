import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from '../../../../components/ui/card';
import ChangePassword from '../../../../components/dashboard/settings/ChangePassword';

export default async function page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <ChangePassword />
            </CardContent>
        </Card>
    );
}
