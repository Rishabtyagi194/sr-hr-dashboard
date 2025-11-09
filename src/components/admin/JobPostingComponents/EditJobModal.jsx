import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Mock jobs (you can fetch from API instead)
// const jobs = [
//   { id: 1, title: "Urgent Hiring II Technical Retail Associate", location: "Bengaluru", tag: "Hot Vacancy", postedBy: "Me", date: "26 Aug 2025" },
//   { id: 2, title: "Urgent Hiring- Telesales Associates II Bengaluru", location: "Bengaluru", tag: "Invite", postedBy: "Me", date: "26 Aug 2025" },
// ];

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Normally you fetch job by ID here
    const foundJob = jobs.find((j) => j.id === parseInt(id));
    setJob(foundJob || null);
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Job:", job);
    navigate("/");
  };

  if (!job) return <p className="p-6">Job not found.</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white shadow rounded p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Post a Job #{id}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Job title / Designation</label>
            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={job.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Tag</label>
            <input
              type="text"
              name="tag"
              value={job.tag}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Posted By</label>
            <input
              type="text"
              name="postedBy"
              value={job.postedBy}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Date</label>
            <input
              type="text"
              name="date"
              value={job.date}
              onChange={handleChange}
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;
