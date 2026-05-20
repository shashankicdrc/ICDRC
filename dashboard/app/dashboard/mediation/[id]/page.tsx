// SAME IMPORTS — no change
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getMediationCaseById } from "@/externalAPI/mediationService";
import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Mail,
  User,
  Briefcase,
  MapPin,
  IndianRupee,
  Clock,
  Languages,
  CreditCard,
  ShieldCheck,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AcceptCaseButton from "@/components/mediation/AcceptCaseButton";
import AcceptSessionButton from "@/components/mediation/AcceptSessionButton";
import CloseCaseButton from "@/components/mediation/CloseCaseButton";

export default async function CaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const { id } = params;
  const { data: mediationCase, error } = await getMediationCaseById(
    session.user.AccessToken as string,
    id,
  );

  if (error || !mediationCase) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          asChild
          className="text-slate-600 hover:text-slate-900"
        >
          <Link
            href="/dashboard/mediation"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs px-3 py-1">
            {mediationCase.status}
          </Badge>

          {/* ACTION BUTTONS (INDIVIDUAL) */}
          <div className="flex items-center gap-2">
            <AcceptCaseButton
              caseId={mediationCase._id}
              token={session.user.AccessToken as string}
              status={mediationCase.status}
            />
            
            <AcceptSessionButton
              caseId={mediationCase._id}
              token={session.user.AccessToken as string}
              status={mediationCase.status}
            />

            <CloseCaseButton
              caseId={mediationCase._id}
              token={session.user.AccessToken as string}
              status={mediationCase.status}
            />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border rounded-xl p-5 md:p-6">
        {/* Top Info */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-orange-500">
            {mediationCase.fullName}
          </h1>

          <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
            <span>ID: {mediationCase._id}</span>
            <span>{formatDate(mediationCase.createdAt)}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem icon={Mail} label="Email" value={mediationCase.email} />
          <InfoItem
            icon={User}
            label="Opponent"
            value={mediationCase.opponentName}
          />
          <InfoItem
            icon={Briefcase}
            label="Category"
            value={mediationCase.category}
          />
          <InfoItem
            icon={MapPin}
            label="Jurisdiction"
            value={mediationCase.jurisdiction}
          />
          <InfoItem
            icon={IndianRupee}
            label="Amount"
            value={
              mediationCase.amount
                ? `₹${mediationCase.amount.toLocaleString("en-IN")}`
                : "N/A"
            }
          />
          <InfoItem
            icon={Clock}
            label="Timeline"
            value={mediationCase.timeline || "N/A"}
          />
          <InfoItem
            icon={Languages}
            label="Language"
            value={mediationCase.language || "N/A"}
          />

          <InfoItem
            icon={CreditCard}
            label="Payment"
            value={
              <Badge variant="outline" className="text-xs text-green-600 bg-green-100">
                {mediationCase.paymentStatus || "Pending"}
              </Badge>
            }
          />

          <InfoItem
            icon={ShieldCheck}
            label="Subscription"
            value={
              <Badge variant="secondary" className="text-xs">
                {mediationCase.isSubscribed ? "true" : "NA"}
              </Badge>
            }
          />
        </div>

        <Separator className="my-6" />

        {/* Description */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">
            Description
          </h3>
          <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {mediationCase.description}
          </div>
        </section>

        {/* Session Details */}
        {(mediationCase.sessionDate || mediationCase.sessionMode) && (
          <section className="mb-6 bg-slate-50 border rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Session Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-500 block mb-1 text-xs">Mode</span>
                <span className="font-medium text-slate-800">{mediationCase.sessionMode}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 text-xs">Date</span>
                <span className="font-medium text-slate-800">{mediationCase.sessionDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 text-xs">Time</span>
                <span className="font-medium text-slate-800">{mediationCase.sessionStartTime} - {mediationCase.sessionEndTime}</span>
              </div>
              {mediationCase.googleMeetLink && (
                <div>
                  <span className="text-slate-500 block mb-1 text-xs">Meeting Link</span>
                  <a href={mediationCase.googleMeetLink} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                    Join Google Meet
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Resolution */}
        {mediationCase.resolution && (
          <section className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Resolution
            </h3>
            <div className="text-sm text-slate-600">
              {mediationCase.resolution}
            </div>
          </section>
        )}

        {/* Files */}
        {mediationCase.files && mediationCase.files.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Attachments
            </h3>

            <div className="space-y-2">
              {mediationCase.files.map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border rounded-lg p-3 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-700">
                      {file.name || `Document ${idx + 1}`}
                    </span>
                  </div>
                  <span className="text-xs text-blue-600">Open</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* Simplified Info Item */
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border rounded-lg p-3">
      <Icon className="h-4 w-4 text-slate-500" />
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm text-slate-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
