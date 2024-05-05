import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { IoEllipsisVertical } from "react-icons/io5";
import StatusDrawer from "./StatusDrawer";
import DeleteCase from "./DeleteCase";
import Link from "next/link";

export default function MenuComp({ caseId, caseType }) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<IoEllipsisVertical />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem>
          <Link
            href={`/admin/dashboard/registrationform/attachments/${caseId}?caseType=${caseType}`}
          >
            View Attacments
          </Link>
        </MenuItem>
        <StatusDrawer caseId={caseId} caseType={caseType} />
        <div className="">
          <DeleteCase caseId={caseId} caseType={caseType} />
        </div>
      </MenuList>
    </Menu>
  );
}
