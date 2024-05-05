import React, { Fragment, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  RadioGroup,
  Radio,
  FocusLock,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLoader } from "react-icons/fi";
import { url } from "../../../api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const StatusDrawer = ({ caseId, caseType, status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setIsloading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const firstFieldRef = React.useRef(null);
  const admin = useSelector((state) => state.admin);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsloading((prvState) => !prvState);
      const response = await fetch(`${url}/api/casestatus`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin._id}`,
        },
        body: JSON.stringify({ caseId, caseType, status: currentStatus }),
      });
      const { data, error } = await response.json();
      setIsloading((prvState) => !prvState);
      if (response.status !== 200) {
        toast.error(error);
        return;
      }
      if (!data) return toast.error("something is went wrong");
      toast.success("Status has been updated successfully.");
      onClose();
    } catch (error) {
      setIsloading((prvState) => !prvState);
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        initialFocusRef={firstFieldRef}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <button
            variant={"ghost"}
            className="px-2 py-2 hover:bg-gray-100 inline-flex w-full text"
          >
            Change status
          </button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <RadioGroup
              ref={firstFieldRef}
              value={currentStatus}
              onChange={(newStatus) => setCurrentStatus(newStatus)}
              className="space-y-2"
            >
              <div>
                <Radio value="pending">Pending</Radio>
              </div>
              <div>
                <Radio value="triggered">Triggered</Radio>
              </div>
              <div>
                <Radio value="success">Success</Radio>
              </div>
              <Button
                type="submit"
                onClick={submitHandler}
                colorScheme={"orange"}
                disabled={isloading ? true : false}
                className="disabled:cursor-not-allowed"
              >
                {isloading ? (
                  <>
                    <FiLoader className="mr-2 animate-spin text-xl" />
                    please wait...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </RadioGroup>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
};

export default StatusDrawer;
