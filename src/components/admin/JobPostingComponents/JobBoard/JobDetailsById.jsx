import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://147.93.72.227:5000/api/jobs/employer-jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const foundJob = data?.jobs?.find(
          (j) => String(j.job_id) === String(job_id)
        );

        setJob(foundJob || null);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center text-red-500">Job not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        {job.jobTitle}
      </h1>
      <p className="text-gray-600 mb-4">
        {job.jobLocation?.city}, {job.jobLocation?.state},{" "}
        {job.jobLocation?.country}
      </p>

      {/* META */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><strong>Status:</strong> {job.Status}</p>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Employment Type:</strong> {job.employmentType}</p>
        <p><strong>Work Mode:</strong> {job.workMode}</p>
        <p><strong>Experience:</strong> {job.experinceFrom} – {job.experinceTo} years</p>
        <p><strong>Salary:</strong> ₹{job.salaryRangeFrom} – ₹{job.salaryRangeTo}</p>
      </div>

      {/* DESCRIPTION */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Job Description</h2>
        <p className="text-gray-700">{job.jobDescription}</p>
      </section>

      {/* SKILLS */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* QUALIFICATION */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Qualification</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {job.qualification?.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </section>

      {/* COMPANY */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">About Company</h2>
        <p><strong>Industry:</strong> {job.CompanyIndustry}</p>
        <p className="mt-2 text-gray-700">{job.AboutCompany}</p>
      </section>

      {/* CONTACT */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Contact Details</h2>
        <p><strong>Contact Person:</strong> {job.contact_person}</p>
        <p><strong>Contact Number:</strong> {job.contact_number}</p>
        <p><strong>Email:</strong> {job.postedBy}</p>
      </section>

      {/* WALK-IN DETAILS */}
      {job.include_walk_in_details === 1 && (
        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Walk-in Details</h2>
          <p><strong>Venue:</strong> {job.venue}</p>
          <p><strong>Start Date:</strong> {new Date(job.walk_in_start_date).toDateString()}</p>
          <p><strong>Time:</strong> {job.walk_in_start_time} – {job.walk_in_end_time}</p>
          <a
            href={job.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            View on Google Maps
          </a>
        </section>
      )}

      {/* QUESTIONS */}
      {job.questions?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Screening Questions</h2>
          <ul className="list-decimal pl-6 text-gray-700">
            {job.questions.map((q, i) => (
              <li key={i}>{q.question}</li>
            ))}
          </ul>
        </section>
      )}

      {/* FOOTER */}
      <p className="text-xs text-gray-400 mt-8">
        Posted on {new Date(job.created_at).toLocaleDateString("en-GB")}
      </p>
    </div>
  );
};

export default JobDetails;
