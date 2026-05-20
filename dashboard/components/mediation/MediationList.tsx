
"use client"
import React, { useState } from 'react';
import MediationCard from './MediationCard';
import { MediationCase, MediationCasesResponse } from '@/types/mediation';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";

interface Props {
    initialData: MediationCasesResponse;
}

const MediationList: React.FC<Props> = ({ initialData }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const handleCardClick = (mediationCase: MediationCase) => {
        router.push(`/dashboard/mediation/${mediationCase._id}`);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('All');
    };

    const filteredCases = initialData.cases.filter(c => {
        const matchesSearch = 
            c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.opponentName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col gap-1.5 w-full sm:max-w-md">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Search Cases</label>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-blue-500" />
                        <Input 
                            placeholder="Search by name, email, or opponent..." 
                            className="pl-10 h-10 border-gray-200 transition-all focus:ring-2 focus:ring-blue-100"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="flex flex-col gap-1.5 w-full sm:w-48">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Filter Status</label>
                        <Select onValueChange={setStatusFilter} value={statusFilter}>
                            <SelectTrigger className="h-10 border-gray-200 bg-white">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Submitted">Submitted</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    {(searchTerm || statusFilter !== 'All') && (
                        <div className="flex flex-col gap-1.5 items-end justify-end">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={clearFilters}
                                className="h-10 w-10 text-destructive hover:bg-destructive/10"
                                title="Clear Filters"
                            >
                                <FilterX className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCases.map((c) => (
                    <MediationCard 
                        key={c._id} 
                        mediationCase={c} 
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {filteredCases.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 mx-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                        <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No Results Found</h3>
                    <p className="text-sm text-gray-500 max-w-[300px]">
                        We couldn't find any mediation cases matching your current search or filters.
                    </p>
                    <Button 
                        variant="link" 
                        onClick={clearFilters} 
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}

        </div>
    );
};

export default MediationList;
