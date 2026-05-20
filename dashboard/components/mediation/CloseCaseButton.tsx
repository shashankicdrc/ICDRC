"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { closeMediationCase } from "@/externalAPI/mediationService";

interface Props {
  caseId: string;
  token: string;
  status: string;
}

export default function CloseCaseButton({ caseId, token, status }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = async () => {
    if (
      !confirm(
        "Are you sure you want to close this case? This action cannot be undone.",
      )
    )
      return;

    setLoading(true);

    const { success, error } = await closeMediationCase(token, caseId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Case marked as closed");
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <Button
      onClick={handleClose}
      disabled={loading || status === "Closed"}
      variant="destructive"
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      {loading ? "Closing..." : status === "Closed" ? "Closed" : "Close Case"}
    </Button>
  );
}
