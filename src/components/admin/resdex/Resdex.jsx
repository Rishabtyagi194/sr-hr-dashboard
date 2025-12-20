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
  const navigate = useNavigate();

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
        {/* LEFT SIDE */}
        <div className="w-[720px] shrink-0 border-r flex flex-col">
          {/* 🔹 SCROLLABLE FILTER CONTENT */}
          <div className="flex-1 overflow-y-auto pr-4">
            <SearchResume />
            <ExperienceFilter />
            <EmploymentDetails />

            <div className="pt-6">
              <EducationDetailsResdex />
            </div>

            <div className="pt-6">
              <DiversityAndAdditionalDetails />
            </div>

            <div className="pt-6">
              <WorkAndDisplayDetails />
            </div>
          </div>

          {/* 🔹 FIXED BOTTOM BAR */}
          <div className="sticky bottom-0 bg-white p-4 pb-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-700 cursor-pointer">
              Active in – <span className="font-medium">3 months</span> ▼
            </p>

            <button
              onClick={() => {
                setShowResults(true);
                setSelectedCandidate(null);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Search candidates
            </button>
          </div>
        </div>

        {/* RIGHT SIDE – RESULTS / PROFILE */}
        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-6">
          {!selectedCandidate ? (
            <CandidateSearchResults
              show={showResults}
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
