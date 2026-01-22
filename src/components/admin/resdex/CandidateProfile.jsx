import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import CandidateSearchResults from "./CandidateSearchResults";

const CandidateProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-80px)] p-6 flex gap-6">
      {/* LEFT: SEARCH RESULTS */}
      <div className="w-[420px] shrink-0 overflow-y-auto bg-gray-50 rounded-lg p-4">
        <CandidateSearchResults show={true} />
      </div>

      {/* RIGHT: CANDIDATE PROFILE */}
      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow p-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 mb-6"
        >
          <FaArrowLeft />
          Back to search
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <FaUserCircle className="text-6xl text-gray-400" />
          <div>
            <h1 className="text-2xl font-semibold">
              Candidate #{id}
            </h1>
            <p className="text-gray-600">
              Frontend Developer · 3+ Years
            </p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-4">
          <section>
            <h3 className="font-semibold">Skills</h3>
            <p className="text-sm text-gray-700">
              React, Next.js, JavaScript, Tailwind CSS
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Experience Summary</h3>
            <p className="text-sm text-gray-700">
              Experienced frontend developer with strong UI skills.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Education</h3>
            <p className="text-sm text-gray-700">
              B.Tech – Computer Science
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
