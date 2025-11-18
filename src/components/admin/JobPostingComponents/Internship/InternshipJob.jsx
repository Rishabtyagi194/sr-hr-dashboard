"use client";
import React, { useState } from "react";
import InternshipDetails from "./InternshipDetails";
import PereferedCandidate from "./PreferedCandidate";
import { InternshipDescription } from "./InternshipDescription";
import JobResponseSettings from "./InternshipResponseSettings";

const InternshipJob = () => {
  // Combine all data in parent
  const [details, setDetails] = useState({});
  const [candidate, setCandidate] = useState({});
  const [description, setDescription] = useState("");
  const [responseSettings, setResponseSettings] = useState({});

  // Submit API handler
  const handlePostInternship = async (status) => {
    // ✅ Get token from localStorage dynamically
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No authentication token found. Please log in again.");
      return;
    }

    const payload = {
      internshipTitle: details.jobTitle,
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
      AboutCompany: details.aboutCompany || "NA",
      Status: status,  
    };

    try {
      const res = await fetch("http://147.93.72.227:5000/api/internship/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Internship posted successfully!");
        console.log("Response:", data);
      } else {
        alert(`Failed to post internship: ${data.message}`);
      }
    } catch (err) {
      console.error("Error posting internship:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-10">
      <InternshipDetails setDetails={setDetails} />
      <PereferedCandidate setCandidate={setCandidate} />
      <InternshipDescription setDescription={setDescription} />
      <JobResponseSettings
        setResponseSettings={setResponseSettings}
        onPost={(status) => handlePostInternship(status)}
      />
    </div>
  );
};

export default InternshipJob;
