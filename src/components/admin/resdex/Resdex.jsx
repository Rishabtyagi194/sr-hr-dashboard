import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResume } from "./SearchResume";
import ExperienceFilter from "./ResumeFilter";
import EmploymentDetails from "./EmploymentDetailsResdex";
import EducationDetailsResdex from "./EducationDetailsResdex";
import DiversityAndAdditionalDetails from "./DiversityAndAdditionalDetails";
import WorkAndDisplayDetails from "./WorkAndDisplayDetails";
import CandidateSearchResults from "./CandidateSearchResults";
import CandidateProfile from "./CandidateProfile";
import { FaArrowLeft } from "react-icons/fa";

const Resdex = () => {
  const [showResults, setShowResults] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    designationBoolean: "OR", // OR / AND
    noticePeriod: [],
  });

  const [educationDetails, setEducationDetails] = useState({
    ug: {
      mode: "Any UG qualification",
      course: "",
      institute: "",
      educationType: "Full Time",
      fromYear: "",
      toYear: "",
    },
    pg: {
      mode: "Any PG qualification",
      course: "",
      institute: "",
      educationType: "Full Time",
      fromYear: "",
      toYear: "",
    },
  });

  const [diversityDetails, setDiversityDetails] = useState({
    gender: "", // "Male" | "Female" | ""
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

  const handleSearchCandidates = async () => {
    try {
      setLoading(true);
      setShowResults(true);
      setSelectedCandidate(null);

      const token = localStorage.getItem("token");

      // 🔍 DEBUG (keep this once)
      console.log("EXPERIENCE FILTERS 👉", experienceFilters);

      const payload = {
        keywords: [],
        boolean: employmentDetails.designationBoolean,

        // 🔹 EXPERIENCE FILTERS
        skills: experienceFilters.skills,
        experience: Number(experienceFilters.minExperience) || 0,

        currentLocations: experienceFilters.locations,
        includeRelocation: experienceFilters.includeRelocation,
        excludeAnywhere: experienceFilters.excludeAnywhere,

        minSalary: Number(experienceFilters.minSalary) || 0,
        maxSalary: Number(experienceFilters.maxSalary) || 0,
        includeNoSalary: experienceFilters.includeNoSalary,

        // 🔹 EMPLOYMENT DETAILS
        department: employmentDetails.department,
        industry: employmentDetails.industry,
        company: employmentDetails.company,
        excludeCompany: employmentDetails.excludeCompany,
        designation: employmentDetails.designation,
        noticePeriod: employmentDetails.noticePeriod,

        ug: {
          mode: educationDetails.ug.mode,
          course: educationDetails.ug.course,
          institute: educationDetails.ug.institute,
          fromYear: educationDetails.ug.fromYear,
          toYear: educationDetails.ug.toYear,
        },
        pg: {
          mode: educationDetails.pg.mode,
          course: educationDetails.pg.course,
          institute: educationDetails.pg.institute,
          fromYear: educationDetails.pg.fromYear,
          toYear: educationDetails.pg.toYear,
        },

        gender: diversityDetails.gender,
        pwdOnly: diversityDetails.pwdOnly,
        candidateCategory: diversityDetails.candidateCategory,
        minAge: diversityDetails.minAge
        ? Number(diversityDetails.minAge)
        : 18,
      
      maxAge: diversityDetails.maxAge
        ? Number(diversityDetails.maxAge)
        : 80,
      

        jobType: workDisplayDetails.jobType,
        employmentType: workDisplayDetails.employmentType,
        workPermit: workDisplayDetails.workPermit,
        showCandidates: workDisplayDetails.showCandidates,
        verifiedMobile: workDisplayDetails.verifiedMobile,
        verifiedEmail: workDisplayDetails.verifiedEmail,
        attachedResume: workDisplayDetails.attachedResume,
      };

      console.log("FINAL PAYLOAD 👉", payload);

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

      if (response.ok) {
        setCandidates(data?.data || []);
      } else {
        console.error("Search failed:", data);
        setCandidates([]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] p-6 flex flex-col">
      {/* 🔙 TOP BAR */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* LEFT SIDE – FILTERS */}
        <div className="w-[720px] shrink-0 border-r flex flex-col">
          <div className="flex-1 overflow-y-auto pr-4">
            <SearchResume />
            <ExperienceFilter
              filters={experienceFilters}
              setFilters={setExperienceFilters}
            />
            <EmploymentDetails
              filters={employmentDetails}
              setFilters={setEmploymentDetails}
            />

            <div className="pt-6">
              <EducationDetailsResdex
                filters={educationDetails}
                setFilters={setEducationDetails}
              />
            </div>

            <div className="pt-6">
              <DiversityAndAdditionalDetails
                filters={diversityDetails}
                setFilters={setDiversityDetails}
              />
            </div>

            <div className="pt-6">
              <WorkAndDisplayDetails
                filters={workDisplayDetails}
                setFilters={setWorkDisplayDetails}
              />
            </div>
          </div>

          {/* 🔹 FIXED SEARCH BAR */}
          <div className="sticky bottom-0 bg-white p-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-700 cursor-pointer">
              Active in – <span className="font-medium">3 months</span> ▼
            </p>

            <button
              onClick={handleSearchCandidates}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              {loading ? "Searching..." : "Search candidates"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE – RESULTS / PROFILE */}
        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-6">
          {!selectedCandidate ? (
            <CandidateSearchResults
              show={showResults}
              loading={loading}
              candidates={candidates}
              onSelect={setSelectedCandidate}
            />
          ) : (
            <CandidateProfile
              candidate={selectedCandidate}
              onBack={() => setSelectedCandidate(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Resdex;
