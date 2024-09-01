
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { AddTestimonialForm } from "../form/testimonial/AddTestimonialForm";

interface Props {
    action: "add" | "edit";
    data?: any;
}

const AddTestimonial = ({ action, data }: Props) => {
    const [open, setopen] = React.useState<boolean>(false);
    const { data: session } = useSession();
    const closeSheet = (value: boolean) => setopen(value);
    const isDisabled = session?.user.role !== "admin";
    return (
        <Sheet open={open} onOpenChange={setopen}>
            <SheetTrigger asChild>
                {action === "edit" ? (
                    <button
                        disabled={isDisabled}
                        className="py-1.5 text-sm bg-accent rounded-sm flex px-2 cursor-pointer w-full disabled:cursor-not-allowed"
                    >
                        Edit Testimonial
                    </button>
                ) : (
                    <Button disabled={isDisabled}>
                        <span className="capitalize mr-1">{action}</span> Testimonial
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <span className="capitalize">{action}</span> Testimonial
                    </SheetTitle>
                    <SheetDescription>
                        Fill the form correctly here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>{" "}
                <AddTestimonialForm action={action} closeSheet={closeSheet} data={data} />
            </SheetContent>
        </Sheet>
    );
};

export default AddTestimonial;
