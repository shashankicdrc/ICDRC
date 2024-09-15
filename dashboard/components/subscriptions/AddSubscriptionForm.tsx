"use client"
import { Fragment, useState } from "react"
import { useDebouncedCallback } from 'use-debounce';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { toast } from "sonner";
import { BASE_URL } from "@/lib/constant";
import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Icons } from "../Icons";
import { addSubscriptionAction } from "@/action";

interface planType {
    _id: string,
    name: string
}

interface UserType {
    _id: string,
    email: string
}

interface Props {
    plan: planType[]
}

export default function AddSubscriptionForm({ plan }: Props) {
    const [searchQuery, setSearchQuery] = useState("")
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setusers] = useState<UserType[]>([])
    const { data: session } = useSession();
    const token = session?.user.AccessToken as string;
    const [userData, setuserData] = useState<null | UserType>(null)
    const [selectedPlan, setselectedPlan] = useState<null | string>('')
    const isDisabled = session?.user.role !== "admin";
    const [isLoading, setisLoading] = useState<boolean>(false);


    const getUsers = async (query: string) => {
        try {
            if (!token) return;
            const response = await fetch(`${BASE_URL}/api/admin/users?email=${query}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const { status, statusCode, message, data } = await response.json();
            if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
                return toast.error(message)
            }
            setusers(data)
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleSearch = useDebouncedCallback((term) => {
        setSearchQuery(term)
        getUsers(term)
    }, 300)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setisLoading(prevState => !prevState)
        if (!userData || !selectedPlan) {
            return toast.error("Please select a user and a plan.");
        }

        try {
            const values = {
                userId: userData._id,
                planId: selectedPlan
            }
            const { message, error } = await addSubscriptionAction(token, values)
            setisLoading(prevState => !prevState)
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
            setSearchQuery("");
            setuserData(null);
            setselectedPlan(null);
        } catch (error: any) {
            toast.error(error.message);
            setisLoading(false)
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-full space-y-2">
            <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery || userData?.email || ""}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            if (userData) {
                                setuserData(null)
                            }
                            setShowDropdown(true)
                            handleSearch(e.target.value)
                        }}
                        defaultValue={userData?.email}
                        className="pr-10"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full"
                    >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                </div>
                {showDropdown && searchQuery && (
                    <div className="relative">
                        <ScrollArea className="h-[200px] w-full rounded-md border">
                            <div className="p-4">
                                {users.length > 0 ? (
                                    users.map((item, index) => (
                                        <div
                                            key={index}
                                            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                                            onClick={() => {
                                                setSearchQuery('')
                                                setShowDropdown(false)
                                                setuserData(item)
                                            }}
                                        >
                                            {item.email}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500">No results found</div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <Label>Plan</Label>
                <Select onValueChange={(value) => setselectedPlan(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                        {plan.map(item => <SelectItem value={item._id} key={item._id}>{item.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" disabled={isLoading || isDisabled} className="w-full">
                {
                    isLoading ? (
                        <Fragment>
                            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </Fragment>
                    ) : (
                        "Subscription"
                    )}
            </Button>
        </form>
    )
}
