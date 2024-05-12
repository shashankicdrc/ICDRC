import React from "react";
import Createadmin from "../../components/forms/createadmin";
import TableItems from "../../components/admins";
import { Flex } from "@chakra-ui/react";

export default function page() {
  const userData = [];
  return (
    <Flex direction="column" mt="8">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">All Admins</h2>
        <Createadmin />
      </div>
      <TableItems />
    </Flex>
  );
}
