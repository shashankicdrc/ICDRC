import React from 'react'
import {
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export default function Filter({ columnFilters, setColumnFilters }) {
    return (
        <HStack spacing={3}>
            <InputGroup size="md" maxW="12rem">
                <InputLeftElement pointerEvents="none">
                    <Icon as={CiSearch} />
                </InputLeftElement>
                <Input
                    type="text"
                    variant="filled"
                    placeholder="Name"
                    borderRadius={5}
                    value={dataName}
                />
            </InputGroup>
        </HStack>)
}

