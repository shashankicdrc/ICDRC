"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserSubscription } from "../../../externalAPI/subscriptionService";
import { checkSubscriptionStatus, SubscriptionStatus } from "../../../lib/subscription";
import { addMediationCase } from "../../../externalAPI/mediationService";

const MediationForm = () => {

  const { data: session } = useSession();
  const token = session?.user?.AccessToken;
  const router = useRouter();

  // Basic Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [description, setDescription] = useState("");

  // Case Details
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [language, setLanguage] = useState("");

  // Files
  const [files, setFiles] = useState([]);

  // Resolution
  const [resolution, setResolution] = useState("");

  // Subscription
  const [subscriptionData, setSubscriptionData] = useState({});
  const [isValidSubscription, setIsValidSubscription] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!token) return;
      const { data } = await getUserSubscription(token);
      setSubscriptionData(data);

      const status = checkSubscriptionStatus(data, "Mediation");
      if (status === SubscriptionStatus.VALID) {
        setIsValidSubscription(true);
      } else {
        setIsValidSubscription(false);
        setSubscriptionMessage("Subscription required or expired.");
      }
    };
    fetchSubscription();
  }, [token]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const onSubmit = async () => {
    if (!isChecked) {
      return toast.error("Please accept terms to proceed");
    }

    setLoading(true);

    try {
      const mediationData = {
        fullName,
        email,
        opponentName,
        description,
        category,
        amount,
        timeline,
        jurisdiction,
        language,
        resolution,
        files,
        isSubscribed: isValidSubscription,
        subscriptionId: subscriptionData?._id ?? null,
      };

      console.log(mediationData);

      const { error, message, data } = await addMediationCase(token, mediationData);

      if (error) {
        setLoading(false);
        return toast.error(error);
      }

      toast.success(message || "Mediation case submitted successfully");
      setLoading(false);

      if (!isValidSubscription) {
        onOpen();
      }

    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Fragment>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Required</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Please complete payment to process mediation case.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button ml={3}>Pay Now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <form
        className="grid gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Mediation Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">

            <div>
              <Label>Full Name</Label>
              <Input required value={fullName} onChange={(e)=>setFullName(e.target.value)} />
            </div>

            <div>
              <Label>Email Address</Label>
              <Input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div>
              <Label>Opponent Name</Label>
              <Input required value={opponentName} onChange={(e)=>setOpponentName(e.target.value)} />
            </div>

            <div>
              <Label>Short Description of Dispute</Label>
              <Textarea required value={description} onChange={(e)=>setDescription(e.target.value)} className="min-h-[90px] resize-y"/>
            </div>

          </CardContent>
        </Card>

        {/* Case Details */}
        <Card>
          <CardHeader>
            <CardTitle>Add Case Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">

            <div>
              <Label>Dispute Category</Label>
              <Input required value={category} onChange={(e)=>setCategory(e.target.value)} />
            </div>

            <div>
              <Label>Dispute Amount</Label>
              <Input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} />
            </div>

            <div>
              <Label>Timeline of Events</Label>
              <Textarea value={timeline} onChange={(e)=>setTimeline(e.target.value)} />
            </div>

            <div>
              <Label>Jurisdiction / Country</Label>
              <Input required value={jurisdiction} onChange={(e)=>setJurisdiction(e.target.value)} />
            </div>

            <div>
              <Label>Preferred Language</Label>
              <Input value={language} onChange={(e)=>setLanguage(e.target.value)} />
            </div>

          </CardContent>
        </Card>

        {/* Evidence Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Evidence</CardTitle>
            <CardDescription>Contracts, Invoices, Screenshots, Emails, Images / PDFs</CardDescription>
          </CardHeader>
          <CardContent>
            <Input type="file" multiple onChange={handleFileChange} />
          </CardContent>
        </Card>

        {/* Resolution Preference */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Preference</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setResolution} value={resolution} required>
              <SelectTrigger>
                <SelectValue placeholder="Select desired outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Refund">Refund</SelectItem>
                <SelectItem value="Compensation">Compensation</SelectItem>
                <SelectItem value="Payment Plan">Payment Plan</SelectItem>
                <SelectItem value="Replacement">Replacement</SelectItem>
                <SelectItem value="Other">Other negotiated outcome</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4">
              <Checkbox
                isChecked={isChecked}
                onChange={(e)=>setIsChecked(e.target.checked)}
              >
                I accept the terms and conditions.
              </Checkbox>
            </div>
          </CardContent>
        </Card>

        <Button disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 w-4 h-4" />
              Please wait...
            </>
          ) : (
            "Submit Mediation Case"
          )}
        </Button>

      </form>
    </Fragment>
  );
};

export default MediationForm;