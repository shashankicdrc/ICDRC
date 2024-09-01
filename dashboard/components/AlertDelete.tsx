
"use client";
import React from "react";
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
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Icons } from "@/components/Icons";
import {
    deleteAdminsAction,
    deleteChatBotAction,
    deleteContactAction,
    deleteIndCaseAction,
    deleteOrgCaseAction,
    deleteParntersAction,
    deleteTestimonialAction,
} from "@/action";
import { tableType } from "@/types/tableType";



interface Props {
    type: tableType;
    arr: string[];
}

const AlertDelete = ({ type, arr }: Props) => {
    const [open, setopen] = React.useState<boolean>(false);
    const { data } = useSession();
    const token = data?.user.AccessToken as string;
    const [isLoading, setisLoading] = React.useState<boolean>(false);
    const isDisable = data?.user.role !== "admin";

    const deleteData = async () => {
        setisLoading((prevState) => !prevState);
        let message = "";
        let error = "";

        switch (type) {
            case 'testimonials':
                const deleteTestResponse = await deleteTestimonialAction(token, arr);
                if (deleteTestResponse.error) {
                    error = deleteTestResponse.error;
                } else {
                    message = deleteTestResponse.data;
                }
                break;
            case 'organisational':
                const organisationalDeleteRes = await deleteOrgCaseAction(token, arr)
                if (organisationalDeleteRes.error) {
                    error = organisationalDeleteRes.error;
                } else {
                    message = organisationalDeleteRes.message
                }
                break;
            case 'individual':
                const individualDeleteRes = await deleteIndCaseAction(token, arr)
                if (individualDeleteRes.error) {
                    error = individualDeleteRes.error;
                } else {
                    message = individualDeleteRes.message
                }
                break;
            case 'contacts':
                const contactDeleteRes = await deleteContactAction(token, arr);
                if (contactDeleteRes.error) {
                    error = contactDeleteRes.error;
                } else {
                    message = contactDeleteRes.message
                }
                break;
            case 'partners':
                const partnersDeleteRes = await deleteParntersAction(token, arr)
                if (partnersDeleteRes.error) {
                    error = partnersDeleteRes.error
                } else {
                    message = partnersDeleteRes.message
                }
                break;
            case 'chatbot':
                const chatbotDeleteRes = await deleteChatBotAction(token, arr)
                if (chatbotDeleteRes.error) {
                    error = chatbotDeleteRes.error
                } else {
                    message = chatbotDeleteRes.message
                }
                break;
            case "admins":
                const admindeleteResponse = await deleteAdminsAction(token, arr);
                if (admindeleteResponse.error) {
                    error = admindeleteResponse.error;
                } else {
                    message = admindeleteResponse.message as string;
                }
                break;
            default:
                throw new Error("Invalid type is provided");
        }
        if (error) {
            toast.error(error, {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
            setisLoading((prevState) => !prevState);
        } else {
            setisLoading((prevState) => !prevState);
            toast.success(message, {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
            setopen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setopen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDisable}>
                    Delete <span className="capitalize ml-1">{type}</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        <span className="mx-1">{type}</span> details and remove your data
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={deleteData}>
                        {isLoading ? (
                            <React.Fragment>
                                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </React.Fragment>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDelete;
