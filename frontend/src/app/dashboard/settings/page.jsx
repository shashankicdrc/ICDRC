import { getServerSession } from 'next-auth';
import { getUserDetails } from '../../../externalAPI/userService';
import { authOptions } from '../../../lib/authOptions';
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from '../../../components/ui/card';
import ChangeName from '../.././../components/dashboard/settings/ChangeName';

export default async function page() {
    const session = await getServerSession(authOptions);
    const token = session.user.AccessToken;
    if (!session) {
        throw new Error('You are unauthorized.');
    }
    const { data, error } = await getUserDetails(token);
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
