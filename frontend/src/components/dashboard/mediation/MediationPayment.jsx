"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { initiatePayment } from "../../../externalAPI/paymentService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const MediationPayment = ({ caseData, isSubscribed }) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { data: session } = useSession();
  const token = session?.user?.AccessToken;
  const router = useRouter();

  const handleMakePayment = async () => {
    if (!token || !caseData) return;

    setPaymentLoading(true);
    try {
      const paymentData = {
        id: caseData._id,
        complaintType: "MediationCase", // Assuming backend terminology
        amount: 500,
        userId: caseData.userId,
      };

      const { error, data } = await initiatePayment(token, paymentData);
      
      if (error) {
        toast.error(error);
        return;
      }
      
      if (data?.instrumentResponse?.redirectInfo?.url) {
        router.push(data.instrumentResponse.redirectInfo.url);
      } else {
        toast.error("Payment initiation failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
        <div>
          <CardTitle className="text-green-700 dark:text-green-400">
            Mediation Case Submitted!
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-500">
            Your case has been successfully registered.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {caseData?._id && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Case ID:</span> {caseData._id}
          </p>
        )}
        {caseData?.caseId && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Display Case ID:</span> {caseData.caseId}
            </p>
        )}
        {isSubscribed ? (
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✅ Your subscription covers this case. No payment required.
          </p>
        ) : caseData?.paymentStatus === "Pending" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              To proceed with processing your mediation case, please complete
              the payment of{" "}
              <span className="font-semibold text-foreground">₹500</span>.
            </p>
            <Button 
                className="w-fit" 
                onClick={handleMakePayment}
                disabled={paymentLoading}
            >
              {paymentLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                  Initiating Payment...
                </>
              ) : (
                "Pay ₹500 Now"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              ✅ Payment Verified. Your case is now in progress.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium italic">Next Step:</span> Our mediation expert will review your case and reach out to you within 24-48 hours via email or phone.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediationPayment;
