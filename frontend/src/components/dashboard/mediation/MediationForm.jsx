'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../ui/tabs';
import { Loader2 } from 'lucide-react';
import MediationIndividualForm from './MediationIndividualForm';
import MediationOrganisationForm from './MediationOrganisationForm';
import MediationStatus from './MediationStatus';
import { getMediationCases } from '../../../externalAPI/mediationService';
import toast from 'react-hot-toast';

const MediationForm = () => {
    const { data: session } = useSession();
    const token = session?.user?.AccessToken;
    
    const [activeCase, setActiveCase] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCases = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const { data, error } = await getMediationCases(token);
            if (error) {
                toast.error(error);
            } else if (data && data.length > 0) {
                // Find if there is any active or pending case
                const currentActive = data.find(c => 
                    c.status === 'Submitted' || 
                    c.status === 'Pending' || 
                    c.status === 'In Progress' ||
                    c.paymentStatus === 'Pending'
                );
                
                if (currentActive) {
                    setActiveCase(currentActive);
                } else {
                    setActiveCase(null);
                }
            }
        } catch (err) {
            console.error('Error fetching mediation cases:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchCases();
        } else if (session === null) {
            setLoading(false);
        }
    }, [token, session]);

    const handleSuccess = () => {
        fetchCases();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 w-full">
                <Loader2 className="animate-spin text-orange-500 w-10 h-10" />
            </div>
        );
    }

    if (activeCase) {
        return <MediationStatus caseData={activeCase} />;
    }

    return (
        <Tabs defaultValue="individual" className="w-full">
            <TabsList>
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="organisation">Organisation</TabsTrigger>
            </TabsList>
            <TabsContent value="individual" className="w-full">
                <MediationIndividualForm onSuccess={handleSuccess} />
            </TabsContent>
            <TabsContent value="organisation" className="w-full">
                <MediationOrganisationForm onSuccess={handleSuccess} />
            </TabsContent>
        </Tabs>
    );
};

export default MediationForm;
