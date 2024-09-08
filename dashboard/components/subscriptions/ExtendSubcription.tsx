"use client"

import { Fragment, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { Icons } from "../Icons"
import { toast } from "sonner"
import { extendSubscriptionAction } from "@/action"
import { useParams } from "next/navigation"

const FormSchema = z.object({
    endDate: z.date({
        required_error: "A endDate is required.",
    }),
})

export default function ExtendSubscription() {
    const { data: session } = useSession();
    const isDisabled = session?.user.role !== "admin";
    const [isLoading, setisLoading] = useState<boolean>(false);
    const token = session?.user.AccessToken as string;
    const params = useParams();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            if (!token || !params.id) return;
            setisLoading(prevState => !prevState)
            const { message, error } = await extendSubscriptionAction(token, { ...values, subscriptionId: params.id })
            setisLoading(prevState => !prevState)
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
            form.reset();
        } catch (error: any) {
            setisLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Extend Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading || isDisabled}> {
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
    )
}
