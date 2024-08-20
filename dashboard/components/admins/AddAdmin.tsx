
"use client";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { AddAdminForm } from "../form/admin/AddAdminForm";

const AddAdmin = () => {
    const [open, setopen] = React.useState<boolean>(false);
    const { data: session } = useSession();
    const isDisabled = session?.user.role !== "admin";

    const closeSheet = (value: boolean) => setopen(!value);

    return (
        <Sheet open={open} onOpenChange={setopen}>
            <SheetTrigger asChild>
                <Button disabled={isDisabled}>Add Admin</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add New Admin</SheetTitle>
                </SheetHeader>{" "}
                <AddAdminForm closeSheet={closeSheet} />
            </SheetContent>
        </Sheet>
    );
};

export default AddAdmin;
