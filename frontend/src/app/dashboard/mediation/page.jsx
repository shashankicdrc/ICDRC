"use client";

import MediationForm from "@/components/dashboard/register/MediationForm";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function MediationPage() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Mediation
      </Heading>

      <Text fontSize="md">
        Welcome to the Mediation section. Here you can manage mediation cases.
      </Text>

      <MediationForm/>
    </Box>
  );
}