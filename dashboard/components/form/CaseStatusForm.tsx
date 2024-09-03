import React, { Fragment } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { caseType } from '@/types/columnsType'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import caseStatusSchema from '@/lib/validation/caseStatusSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSession } from 'next-auth/react'
import { caseStatus } from '@/types/complaint'
import { updateIndCaseStatusAction, updateOrgCaseStatusAction } from '@/action'
import { toast } from 'sonner'
import { Icons } from '../Icons'

interface Props {
    caseData: caseType
    caseType: 'individual' | 'organizational'
}

type caseStatusInputValues = z.infer<typeof caseStatusSchema>

export default function CaseStatusForm({ caseData, caseType }: Props) {
    const [open, setopen] = React.useState<boolean>(false);
    const { data: session } = useSession();
    const isDisabled = session?.user.role !== "admin";
    const [isLoading, setisLoading] = React.useState<boolean>(false);
    const token = session?.user.AccessToken as string;

    const form = useForm<caseStatusInputValues>({
        resolver: zodResolver(caseStatusSchema),
        defaultValues: {
            status: caseData.status as caseStatus,
        }
    });


    async function onSubmit(values: caseStatusInputValues) {
        if (!token) return;
        setisLoading((prevState) => !prevState);
        const changeStatusData = {
            id: caseData._id,
            ...values,
        };

        let message;
        let error;

        switch (caseType) {
            case 'individual':
                const indResponse = await updateIndCaseStatusAction(token, changeStatusData)
                if (indResponse.error) {
                    error = indResponse.error;
                } else {
                    message = indResponse.data
                }
                break;
            case 'organizational':
                const orgResponse = await updateOrgCaseStatusAction(token, changeStatusData)
                if (orgResponse.error) {
                    error = orgResponse.error;
                } else {
                    message = orgResponse.data
                }
                break;
            default:
                throw new Error('Invalid type')
        }
        setisLoading(prevState => !prevState)
        if (error) {
            return toast.error(error);
        }
        toast.success(message)
        form.reset();
        setopen(false)
    }
    return (
        <Popover open={open} onOpenChange={setopen} >
            <PopoverTrigger disabled={isDisabled} className="py-1.5 text-sm bg-accent rounded-sm flex px-2 cursor-pointer w-full disabled:cursor-not-allowed"
            >
                Change Case Status
            </PopoverTrigger>
            <PopoverContent side="left" align="start" >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Case Status</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {Object.values(caseStatus).map(item =>
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={item}>
                                                    <FormControl>
                                                        <RadioGroupItem value={item} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {item}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        < Button type="submit" disabled={isLoading} >
                            {
                                isLoading ? (
                                    <Fragment>
                                        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait...
                                    </Fragment>
                                ) : (
                                    "Submit"
                                )}
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    )
}

