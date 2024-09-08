import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ExtendSubscription from "@/components/subscriptions/ExtendSubcription"

export default function page() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Extend Subscription Date</CardTitle>
                    <CardDescription>Extend subscription date by choosing the date from below date picker.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ExtendSubscription />
                </CardContent>
            </Card>
        </div>
    )
}
