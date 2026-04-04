"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { acceptMediationSession } from "@/externalAPI/mediationService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  caseId: string;
  token: string;
  status: string;
}

export default function AcceptSessionButton({ caseId, token, status }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setLoading(true);

    const { success, error } = await acceptMediationSession(token, caseId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Session accepted & emails sent");
      router.refresh();
    }

    setLoading(false);
  };

  const isAccepted = status === "Session Scheduled" || status === "In Mediation";

  return (
    <Button
      onClick={handleAccept}
      disabled={loading || status !== "Session Requested"}
      className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
    >
      {loading ? "Processing..." : isAccepted ? "Session Accepted" : "Accept Schedule"}
    </Button>
  );
}
