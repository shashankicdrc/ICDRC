
"use client";
import React, { Fragment } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { deleteCaseStudyAction } from "@/action";

interface Props {
    caseStudyIds: string[];
}

export const AlertDeleteCaseStudy = ({ caseStudyIds }: Props) => {
    const [isLoading, setisLoading] = React.useState(false);
    const { data: session } = useSession();
    const isDisable = session?.user.role !== "admin" ? true : false;
    const token = session?.user.AccessToken as string;
    const [open, setopen] = React.useState(false);

    const onClick = async () => {
        try {
            setisLoading((prevState) => !prevState);
            const { error, message } = await deleteCaseStudyAction(token, caseStudyIds);
            setisLoading((prevState) => !prevState);
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
            setopen(false);
        } catch (error: any) {
            setisLoading((prevState) => !prevState);
            toast.error(error.message);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setopen}>
            <AlertDialogTrigger asChild>
                <button
                    disabled={isDisable}
                    className="py-1.5 text-sm hover:bg-accent rounded-sm flex px-2 cursor-pointer w-full disabled:cursor-not-allowed"
                >
                    <Icons.delete className="mr-2 h-4 w-4" />
                    Delete
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete case study and
                        remove your data from the servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={onClick} disabled={isLoading}>
                        {isLoading ? (
                            <Fragment>
                                <Icons.loader className="h-4 w-4 mr-2 animate-spin" />
                                Please wait...
                            </Fragment>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

