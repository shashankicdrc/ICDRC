import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../../ui/select';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { requestMediationSession } from '../../../externalAPI/mediationService';
import { useSession } from 'next-auth/react';

const MediationScheduleForm = ({ caseId, onSuccess }) => {
    const { data: session } = useSession();
    const token = session?.user?.AccessToken;

    const [loading, setLoading] = useState(false);
    const [sessionMode, setSessionMode] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionStartTime, setSessionStartTime] = useState('');
    const [sessionEndTime, setSessionEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!sessionMode || !sessionDate || !sessionStartTime || !sessionEndTime) {
            return toast.error('All fields are required');
        }

        setLoading(true);
        try {
            const data = {
                sessionMode,
                sessionDate,
                sessionStartTime,
                sessionEndTime,
            };

            const res = await requestMediationSession(token, caseId, data);
            
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Session request submitted successfully');
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mt-4 border-orange-200 bg-orange-50/50 shadow-sm">
            <CardHeader className="border-b border-orange-100 pb-3">
                <CardTitle className="text-sm font-semibold text-orange-800">
                    Schedule Mediation Session
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Session Mode</Label>
                        <Select onValueChange={setSessionMode} value={sessionMode}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Online">Online (Google Meet)</SelectItem>
                                <SelectItem value="Offline">Offline (ICDRC Office)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Preferred Date</Label>
                        <Input
                            type="date"
                            value={sessionDate}
                            onChange={(e) => setSessionDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div>
                        <Label>Start Time</Label>
                        <Input
                            type="time"
                            value={sessionStartTime}
                            onChange={(e) => setSessionStartTime(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>End Time</Label>
                        <Input
                            type="time"
                            value={sessionEndTime}
                            onChange={(e) => setSessionEndTime(e.target.value)}
                        />
                    </div>

                    <div className="sm:col-span-2 pt-2">
                        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Submit Schedule Request
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default MediationScheduleForm;
