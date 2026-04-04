import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";
import { MediationCase } from "@/types/mediation";

interface Props {
  mediationCase: MediationCase;
  onClick: (mediationCase: MediationCase) => void;
}

const MediationCard: React.FC<Props> = ({ mediationCase, onClick }) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "submitted":
        return "bg-green-100 text-green-700 border-green-200";
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "draft":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPaymentStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200 border"
      onClick={() => onClick(mediationCase)}
    >
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold underline">
          {mediationCase.fullName}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-1">
        <div className="text-xs text-muted-foreground">
          Category:{" "}
          <span className="text-foreground font-medium">
            {mediationCase.category}
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          Submitted On:{" "}
          <span className="text-foreground font-medium">
            {formatDate(mediationCase.createdAt)}
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          Email:{" "}
          <span className="text-foreground font-medium">
            {mediationCase.email}
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          Case Status:{" "}
          <span
            className={`font-medium capitalize ${getStatusStyle(mediationCase.status)}`}
          >
            {mediationCase.status}
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] text-muted-foreground">Payment:</span>
          <Badge
            className={`text-xs px-2 py-0.5 capitalize ${getPaymentStatusStyle(mediationCase.paymentStatus || "")}`}
          >
            {mediationCase.paymentStatus || "N/A"}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MediationCard;
