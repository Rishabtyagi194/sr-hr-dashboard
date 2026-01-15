import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://147.93.72.227:5000/api/jobs/employer-job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setJob(data?.job || data || null);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500">Loading job details...</p>;
  if (!job) return <p className="text-center text-red-500">Job not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* ================= HEADER CARD ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {job.jobTitle}
            </h1>
            <p className="text-gray-600 mt-1">
              {job.companyName || "Company Name"}
            </p>

            <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaBriefcase />
                <span>
                  {job.experinceFrom} - {job.experinceTo} years
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaRupeeSign />
                {job?.salaryRangeFrom && job?.salaryRangeTo ? (
                  <span>
                    {job.salaryRangeFrom} - {job.salaryRangeTo} LPA
                  </span>
                ) : job?.offerStipend ? (
                  <span>{job.offerStipend}</span>
                ) : (
                  <span className="text-gray-400">Not Disclosed</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>
                  {job.jobLocation?.city}, {job.jobLocation?.state}
                </span>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="w-14 h-14 rounded-lg border flex items-center justify-center text-xl font-bold">
            {job.companyName?.[0] || "C"}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500">
            Posted {new Date(job.created_at).toLocaleDateString("en-GB")}
          </p>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <p className="text-sm text-gray-500">
              Posted {new Date(job.created_at).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>

      {/* ================= JOB HIGHLIGHTS ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Job highlights</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {job.jobHighlights?.length > 0 ? (
            job.jobHighlights.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <>
              <li>
                Fresher with strong knowledge of manual testing and automation
                basics
              </li>
              <li>Work on web and mobile application testing</li>
              <li>Competitive salary and performance-based bonuses</li>
            </>
          )}
        </ul>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Job match score</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <FaStar /> Early Applicant
            </span>
            <span className="text-gray-400">Keyskills</span>
            <span className="text-gray-400">Location</span>
            <span className="text-gray-400">Work Experience</span>
          </div>
        </div>
      </div>

      {/* ================= JOB DESCRIPTION ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Job description</h2>
        <p className="text-gray-700 leading-relaxed">{job.jobDescription}</p>
      </div>

      {/* ================= SKILLS ================= */}
      {job.skills?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Key skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ================= COMPANY ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">About company</h2>
        <p className="text-gray-700">{job.AboutCompany}</p>
      </div>
    </div>
  );
};

export default JobDetails;
