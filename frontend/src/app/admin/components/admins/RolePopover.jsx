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

const RolePopover = ({ id, role }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setIsloading] = useState(false);
  const [currentRole, setCurrentRole] = useState(role);
  const firstFieldRef = React.useRef(null);
  const admin = useSelector((state) => state.admin);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!id) return toast.error("Please provide id");

      setIsloading((prvState) => !prvState);
      const response = await fetch(`${url}/api/admins/roles`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({ id, role: currentRole }),
      });
      const { data, error } = await response.json();
      setIsloading((prvState) => !prvState);
      if (response.status !== 200) {
        toast.error(error);
        return;
      }
      if (!data) return toast.error("something is went wrong");
      toast.success(data);
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
          <Button
            colorScheme="green"
            disabled={admin.role !== "admin"}
            size="sm"
            mr="2"
          >
            Change role
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <RadioGroup
              ref={firstFieldRef}
              value={currentRole}
              onChange={(newRole) => setCurrentRole(newRole)}
              className="space-y-2"
            >
              <div>
                <Radio value="admin">Admin</Radio>
              </div>
              <div>
                <Radio value="subadmin">Sub admin</Radio>
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

export default RolePopover;
