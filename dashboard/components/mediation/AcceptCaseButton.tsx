"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { acceptMediationCase } from "@/externalAPI/mediationService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  caseId: string;
  token: string;
  status: string;
}

export default function AcceptCaseButton({ caseId, token, status }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setLoading(true);

    const { success, error } = await acceptMediationCase(token, caseId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Case accepted & email sent to client.");
      router.refresh();
    }

    setLoading(false);
  };

  // Disable if already accepted or any further stage
  const isAlreadyAccepted = [
    'Accepted',
    'Session Requested',
    'Mediator Assigned',
    'Closed',
  ].includes(status);

  return (
    <Button
      onClick={handleAccept}
      disabled={loading || isAlreadyAccepted}
      className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
    >
      {loading ? "Processing..." : isAlreadyAccepted ? "Case Accepted" : "Accept the Case"}
    </Button>
  );
}
