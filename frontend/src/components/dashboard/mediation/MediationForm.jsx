'use client';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../ui/tabs';
import MediationIndividualForm from './MediationIndividualForm';
import MediationOrganisationForm from './MediationOrganisationForm';

const MediationForm = () => {
    return (
        <Tabs defaultValue="individual" className="w-full">
            <TabsList>
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="organisation">Organisation</TabsTrigger>
            </TabsList>
            <TabsContent value="individual" className="w-full">
                <MediationIndividualForm />
            </TabsContent>
            <TabsContent value="organisation" className="w-full">
                <MediationOrganisationForm />
            </TabsContent>
        </Tabs>
    );
};

export default MediationForm;
