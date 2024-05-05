import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { url } from "../../../api";

export default function DeleteCase({ caseId, caseType }) {
  const admin = useSelector((state) => state.admin);
  const [isloading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteHandler = async () => {
    try {
      if (!caseId) return toast.error("Please provide case id");
      setIsloading((prevState) => !prevState);
      const res = await fetch(`${url}/api/casestatus`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${admin._id}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseId, caseType }),
      });
      setIsloading((prevState) => !prevState);
      const { data, error } = await res.json();
      if (error) return toast.error(error);
      toast.success(data);
      setOpen(false);
    } catch (err) {
      setIsloading((prevState) => !prevState);
      toast.error(err.message);
    }
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button className="px-2 py-2 hover:bg-gray-100 inline-flex w-full text">
          Delete
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete
            complaints and remove data server.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <button
              onClick={deleteHandler}
              disabled={isloading ? true : false}
              className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] 
                 items-center justify-center rounded-[4px] px-[15px] font-medium leading-none 
                outline-none focus:shadow-[0_0_0_2px]"
            >
              {isloading ? (
                <>
                  <FiLoader className="mr-2 text-xl animate-spin" />
                  Please wait...
                </>
              ) : (
                "Yes, delete complaint"
              )}
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
