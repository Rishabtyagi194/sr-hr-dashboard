import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchResume } from "../resdex/SearchResume";
import ExperienceFilter from "../resdex/ResumeFilter";
import EmploymentDetails from "../resdex/EmploymentDetailsResdex";
import EducationDetailsResdex from "../resdex/EducationDetailsResdex";
import DiversityAndAdditionalDetails from "../resdex/DiversityAndAdditionalDetails";
import WorkAndDisplayDetails from "../resdex/WorkAndDisplayDetails";
import { UserResponse } from "./UserResponse";

/* ============================
   Helper: normalize API data
============================ */
const normalizeApplications = (res) =>
  res?.job?.user_applications ||
  res?.data?.job?.user_applications ||
  [];

const JobAppliesPage = () => {
  const { jobId } = useParams();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================
     FILTER STATES
  ============================ */
  const [experienceFilters, setExperienceFilters] = useState({
    skills: [],
    minExperience: "",
    locations: [],
    includeRelocation: true,
    excludeAnywhere: false,
    minSalary: "",
    maxSalary: "",
    includeNoSalary: false,
  });

  const [employmentDetails, setEmploymentDetails] = useState({
    department: "",
    industry: "",
    company: "",
    excludeCompany: [],
    designation: "",
    designationBoolean: "OR",
    noticePeriod: [],
  });

  const [educationDetails, setEducationDetails] = useState({
    ug: {
      mode: "Any UG qualification",
      course: "",
      institute: "",
      fromYear: "",
      toYear: "",
    },
    pg: {
      mode: "Any PG qualification",
      course: "",
      institute: "",
      fromYear: "",
      toYear: "",
    },
  });

  const [diversityDetails, setDiversityDetails] = useState({
    gender: "",
    pwdOnly: false,
    candidateCategory: "",
    minAge: 18,
    maxAge: 80,
  });

  const [workDisplayDetails, setWorkDisplayDetails] = useState({
    jobType: "",
    employmentType: "",
    workPermit: "",
    showCandidates: "All candidates",
    verifiedMobile: false,
    verifiedEmail: false,
    attachedResume: false,
  });

  /* ============================
     FETCH JOB APPLICATIONS
  ============================ */
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://147.93.72.227:5000/api/jobs/employer-job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        console.log("JOB RESPONSES 👉", data);

        const applications = normalizeApplications(data);
        console.log("FINAL APPLICATIONS 👉", applications);

        setCandidates(applications);
      } catch (error) {
        console.error("FETCH ERROR 👉", error);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId]);

  /* ============================
     SEARCH RESDEX CANDIDATES
  ============================ */
  const handleSearchCandidates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        keywords: [],
        boolean: employmentDetails.designationBoolean,

        skills: experienceFilters.skills,
        experience: Number(experienceFilters.minExperience) || 0,
        currentLocations: experienceFilters.locations,
        includeRelocation: experienceFilters.includeRelocation,
        excludeAnywhere: experienceFilters.excludeAnywhere,

        minSalary: Number(experienceFilters.minSalary) || 0,
        maxSalary: Number(experienceFilters.maxSalary) || 0,
        includeNoSalary: experienceFilters.includeNoSalary,

        department: employmentDetails.department,
        industry: employmentDetails.industry,
        company: employmentDetails.company,
        excludeCompany: employmentDetails.excludeCompany,
        designation: employmentDetails.designation,
        noticePeriod: employmentDetails.noticePeriod,

        ug: educationDetails.ug,
        pg: educationDetails.pg,

        gender: diversityDetails.gender,
        pwdOnly: diversityDetails.pwdOnly,
        candidateCategory: diversityDetails.candidateCategory,
        minAge: Number(diversityDetails.minAge) || 18,
        maxAge: Number(diversityDetails.maxAge) || 80,

        jobType: workDisplayDetails.jobType,
        employmentType: workDisplayDetails.employmentType,
        workPermit: workDisplayDetails.workPermit,
        showCandidates: workDisplayDetails.showCandidates,
        verifiedMobile: workDisplayDetails.verifiedMobile,
        verifiedEmail: workDisplayDetails.verifiedEmail,
        attachedResume: workDisplayDetails.attachedResume,
      };

      console.log("SEARCH PAYLOAD 👉", payload);

      const response = await fetch(
        "http://147.93.72.227:5000/api/search/resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("SEARCH RESPONSE 👉", data);

      if (response.ok) {
        const applications = normalizeApplications(data);
        console.log("SEARCH APPLICATIONS 👉", applications);
        setCandidates(applications);
      } else {
        console.error("SEARCH FAILED 👉", data);
        setCandidates([]);
      }
    } catch (error) {
      console.error("SEARCH ERROR 👉", error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  /* ============================
     DEBUG STATE CHANGE
  ============================ */
  useEffect(() => {
    console.log("CANDIDATES STATE UPDATED 👉", candidates);
  }, [candidates]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* LEFT FILTER SIDEBAR */}
      <div className="w-[50%] bg-white border-r">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <SearchResume />

            <ExperienceFilter
              filters={experienceFilters}
              setFilters={setExperienceFilters}
            />

            <EmploymentDetails
              filters={employmentDetails}
              setFilters={setEmploymentDetails}
            />

            <EducationDetailsResdex
              filters={educationDetails}
              setFilters={setEducationDetails}
            />

            <DiversityAndAdditionalDetails
              filters={diversityDetails}
              setFilters={setDiversityDetails}
            />

            <WorkAndDisplayDetails
              filters={workDisplayDetails}
              setFilters={setWorkDisplayDetails}
            />
          </div>

          {/* SEARCH BUTTON */}
          <div className="border-t p-4 flex justify-end">
            <button
              onClick={handleSearchCandidates}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search candidates"}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <UserResponse candidates={candidates} loading={loading} />
    </div>
  );
};

export default JobAppliesPage;
