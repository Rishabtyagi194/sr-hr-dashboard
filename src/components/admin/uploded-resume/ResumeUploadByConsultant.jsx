"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import JobDetails from "../JobPostingComponents/JobBoard/JobDetailsById";

const ResumeUploadedByConsultant = () => {
  const { id } = useParams(); // job id

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedResumes, setUploadedResumes] = useState([]);
  const [fetching, setFetching] = useState(false);

  /* =========================
     FETCH UPLOADED RESUMES
  ========================== */
  const fetchUploadedResumes = async () => {
    try {
      setFetching(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/jobs/applications/consultant/uploaded-resume/on-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const currentJob = data.jobs.find(
        (job) => String(job.job_id) === String(id)
      );

      if (!currentJob) {
        setUploadedResumes([]);
        return;
      }

      const parsedResumes = currentJob.resumes.map((r) => JSON.parse(r));
      setUploadedResumes(parsedResumes);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resumes");
    } finally {
      setFetching(false);
    }
  };

  /* =========================
     UPLOAD RESUME
  ========================== */
  const handleUpload = async () => {
    if (!resume) {
      toast.error("Please select a CV first");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("resumes", resume);

    try {
      setLoading(true);

      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/api/jobs/applications/HotVacancy/${id}/consultant/submit-resume`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Resume uploaded successfully");

      // ✅ HARD REFRESH to clear everything
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOAD ON MOUNT
  ========================== */
  useEffect(() => {
    fetchUploadedResumes();
  }, []);

  if (!id) return <p className="text-gray-500">Invalid job</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="flex-1">
          <JobDetails jobId={id} />
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Upload */}
          <div className="bg-white shadow rounded-xl p-6 space-y-4 s top-24">
            <h3 className="text-lg font-semibold">
              Submit resume to Recruiter
            </h3>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="block w-full border rounded-md p-2"
            />

            <button
              onClick={handleUpload}
              disabled={loading || !resume}
              className={`w-full px-4 py-2 rounded-md text-white
                ${
                  loading || !resume
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

            {!resume && (
              <p className="text-xs text-gray-500 text-center">
                Please select a resume to enable upload
              </p>
            )}
          </div>

          {/* Uploaded Resumes */}
          <div className="bg-white shadow rounded-xl p-6 ">
            <h3 className="text-lg font-semibold mb-4">
              Already Uploaded Resumes
            </h3>

            {fetching && (
              <p className="text-sm text-gray-500">Loading resumes...</p>
            )}

            {!fetching && uploadedResumes.length === 0 && (
              <p className="text-sm text-gray-500">
                No resumes uploaded yet
              </p>
            )}

            <ul className="space-y-3">
              {uploadedResumes.map((resume, index) => (
                <li
                  key={resume.resume_id || index}
                  className="flex justify-between items-center border rounded-lg p-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      Resume {index + 1}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(resume.uploaded_at).toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 capitalize">
                      {resume.status}
                    </p>
                  </div>

                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadedByConsultant;
