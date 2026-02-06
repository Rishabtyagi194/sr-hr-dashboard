import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams(); // job_id from URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://qa.api.rozgardwar.cloud/api/jobs/employer-job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("Edit job API response:", data);

        // API already returns single job
        setJob(data?.job || data || null);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/api/jobs/update-job/${id}`, // confirm endpoint with backend
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(job),
        }
      );

      const data = await res.json();
      console.log("Update response:", data);

      alert("Job updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!job) return <p className="p-6">Job not found.</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white shadow rounded-2xl p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Edit Job #{id}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">
              Job title / Designation
            </label>
            <input
              type="text"
              name="jobTitle"
              value={job.jobTitle || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input
              type="text"
              name="locality"
              value={job.locality || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Experience From</label>
            <input
              type="number"
              name="experinceFrom"
              value={job.experinceFrom || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Experience To</label>
            <input
              type="number"
              name="experinceTo"
              value={job.experinceTo || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Salary From (LPA)</label>
            <input
              type="number"
              name="salaryRangeFrom"
              value={job.salaryRangeFrom || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Salary To (LPA)</label>
            <input
              type="number"
              name="salaryRangeTo"
              value={job.salaryRangeTo || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Job Description</label>
            <textarea
              name="jobDescription"
              value={job.jobDescription || ""}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;
