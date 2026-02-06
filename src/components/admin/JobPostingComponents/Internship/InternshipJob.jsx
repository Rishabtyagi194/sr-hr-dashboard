"use client";
import React, { useState } from "react";
import InternshipDetails from "./InternshipDetails";
import PereferedCandidate from "./PreferedCandidate";
import { InternshipDescription } from "./InternshipDescription";
import JobResponseSettings from "./InternshipResponseSettings";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InternshipJob = () => {
  // ================= STATES =================
  const [details, setDetails] = useState({});
  const [candidate, setCandidate] = useState({});
  const [description, setDescription] = useState("");
  const [responseSettings, setResponseSettings] = useState({});

  const [errors, setErrors] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingStatus, setPendingStatus] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const navigate = useNavigate();

  // ================= FORM VALIDITY CHECK =================
  const isInternshipFormValid = () => {
    return (
      details.jobTitle?.trim() &&
      details.employmentType &&
      details.internshipDuration &&
      details.internshipDate &&
      details.offeredStipend &&
      details.workMode &&
      details.location &&
      details.industry &&
      candidate.skills?.length > 0 &&
      candidate.education?.length > 0 &&
      description?.trim() 
    );
  };

  // ================= VALIDATION =================
  const validateInternshipForm = () => {
    const newErrors = {};

    if (!details.jobTitle?.trim())
      newErrors.jobTitle = "Internship title is required";
    if (!details.employmentType)
      newErrors.employmentType = "Employment type is required";
    if (!details.internshipDuration)
      newErrors.duration = "Duration is required";
    if (!details.internshipDate)
      newErrors.date = "Start date is required";
    if (!details.offeredStipend)
      newErrors.stipend = "Stipend is required";
    if (!details.workMode)
      newErrors.workMode = "Work mode is required";
    if (!details.location)
      newErrors.location = "Location is required";
    if (!details.industry)
      newErrors.industry = "Industry is required";

    if (!candidate.skills || candidate.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    if (!candidate.education || candidate.education.length === 0)
      newErrors.education = "Education is required";

    if (!description?.trim())
      newErrors.description = "Internship description is required";

    if (!responseSettings.date)
      newErrors.lastDate = "Last date to apply is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= API CALL =================
  const handlePostInternship = async (status) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Authentication expired. Please login again.");
      setErrorModalOpen(true);
      return;
    }

    const payload = {
      internshipTitle: details.jobTitle,
      is_consultant_Job_Active: responseSettings.isConsultantVisible,
      AboutCompany: responseSettings.aboutCompany, 
      employmentType: details.employmentType,
      duration: details.internshipDuration,
      internshipStartDate: details.internshipDate,
      OfferStipend: `${details.currency}${details.offeredStipend}/month`,
      workMode: details.workMode,
      intershipLocation: {
        city: details.city || details.location?.split(",")[0] || "",
        state: details.state || "",
        country: details.country || "India",
      },
      willingToRelocate: details.relocate,
      CompanyIndustry: details.industry,
      perksAndBenefit: details.perks?.join(", "),
      noOfVacancies: details.vacancies?.toString(),
      skills: candidate.skills || [],
      qualification: candidate.education?.join(", ") || "",
      videoProfile: candidate.videoProfile || "",
      jobDescription: description,
      lastDateToApply: responseSettings.date,
      collabrateWithTeam: responseSettings.collabrateWithTeam || [""],
      receivedResponseOverMail: responseSettings.receivedResponseOverMail || "",
      addResponseCode: responseSettings.referenceCode || "",
      // AboutCompany: details.aboutCompany || "NA",
      Status: status,
    };

    try {
      setIsPosting(true);

      const res = await fetch("https://qa.api.rozgardwar.cloud/api/internship/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to post internship");
      }

      setConfirmModalOpen(false);
      setSuccessModalOpen(true);

      // Auto redirect after success
      setTimeout(() => {
        navigate("/jobposting");
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setErrorModalOpen(true);
    } finally {
      setIsPosting(false);
    }
  };

  // ================= RENDER =================
  return (
    <div className="space-y-10">
      <InternshipDetails setDetails={setDetails} />
      <PereferedCandidate setCandidate={setCandidate} />
      <InternshipDescription setDescription={setDescription} />
      <JobResponseSettings
        setResponseSettings={setResponseSettings}
        isFormValid={isInternshipFormValid()}
        onPost={(status) => {
          const isValid = validateInternshipForm();

          if (!isValid) {
            setErrorMessage(
              "Please fill all required fields before continuing."
            );
            setErrorModalOpen(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }

          setPendingStatus(status);
          setConfirmModalOpen(true);
        }}
      />

      {/* ================= CONFIRM MODAL ================= */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Confirm {pendingStatus === "draft" ? "Save Draft" : "Post Internship"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to{" "}
              {pendingStatus === "draft"
                ? "save this internship as draft"
                : "post this internship"}?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isPosting}
              onClick={() => handlePostInternship(pendingStatus)}
              className="flex items-center gap-2"
            >
              {isPosting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isPosting
                ? "Processing..."
                : pendingStatus === "draft"
                ? "Save Draft"
                : "Yes, Post Internship"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= SUCCESS MODAL ================= */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Success 🎉</DialogTitle>
            <DialogDescription>
              {pendingStatus === "draft"
                ? "Your internship has been saved as draft. You can post it anytime."
                : "Your internship has been posted successfully and is now live."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end">
            <Button onClick={() => navigate("/jobposting")}>
              Go to Internship List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= ERROR MODAL ================= */}
      <Dialog open={errorModalOpen} onOpenChange={setErrorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Action Required</DialogTitle>
            <DialogDescription>
              {errorMessage || "Something went wrong. Please try again."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end">
            <Button onClick={() => setErrorModalOpen(false)}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InternshipJob;
