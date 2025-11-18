import React, { useState } from "react";
import AddQuestionModal from "../JobPostingComponents/HotJob/AddQuestionModal";

const InternshipJobPostForm = () => {
  const [employmentType, setEmploymentType] = useState("Full Time, Permanent");
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState("draft");

  const [companyIndustry, setCompanyIndustry] = useState("Automobile - Other");
  const [roleCategory, setRoleCategory] = useState("Other");

  // Walk-in states
  const [includeWalkin, setIncludeWalkin] = useState(false);
  const [walkinDate, setWalkinDate] = useState("");
  const [walkinDuration, setWalkinDuration] = useState(1);
  const [walkinTime, setWalkinTime] = useState("9.30 AM - 5.30 PM");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [venue, setVenue] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [questions, setQuestions] = useState([]);

  const formatTime = (time) => {
    if (!time) return "";
    let [hour, minute] = time.split(":");
    hour = parseInt(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  // New fields
  const [workMode, setWorkMode] = useState("In office");
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [relocate, setRelocate] = useState(false);
  const [locality, setLocality] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [expFrom, setExpFrom] = useState(1);
  const [expTo, setExpTo] = useState(6);

  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [hideSalary, setHideSalary] = useState(false);

  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState("");

  // Handlers
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (e.target.value && !skills.includes(e.target.value)) {
      setSkills([...skills, e.target.value]);
      e.target.value = "";
    }
  };

  const handleRemoveSkill = (skill) =>
    setSkills(skills.filter((s) => s !== skill));

  const handleAddLocation = () => {
    if (newLocation && locations.length < 3) {
      setLocations([...locations, newLocation]);
      setNewLocation("");
    }
  };

  const handleRemoveLocation = (loc) =>
    setLocations(locations.filter((l) => l !== loc));

  const handleAddEducation = () => {
    if (newEducation && !education.includes(newEducation)) {
      setEducation([...education, newEducation]);
      setNewEducation("");
    }
  };

  const handleRemoveEducation = (edu) =>
    setEducation(education.filter((e) => e !== edu));

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleChangeQuestion = (value, index) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddQuestionModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]); // add question to list
    setIsModalOpen(false); // close modal
  };

  const handleSubmit = async (status, e) => {
    if (e) e.preventDefault();

    const payload = {
      employmentType,
      workMode,
      jobLocation: locations,
      locality,
      experinceFrom: expFrom,
      experinceTo: expTo,
      salaryRangeFrom: salaryFrom.replace(/\D/g, ""),
      salaryRangeTo: salaryTo.replace(/\D/g, ""),
      qualification: education,
      jobDescription,
      questions,
      status: status, // ✅ added status
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://147.93.72.227:5000/api/jobs/create",
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
      console.log("API response:", data);

      if (response.ok) {
        alert(
          status === "active"
            ? "Job posted successfully!"
            : "Saved as draft successfully!"
        );
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to submit. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-6">Post a Job - Internship</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Key skills <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {education.map((edu, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {edu}
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(edu)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skills that are crucial for the job"
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddEducation}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Company industry <span className="text-red-500">*</span>
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option>Others</option>
              <option>IT</option>
              <option>Software</option>
              <option>BPO</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Work mode <span className="text-red-500">*</span>
            </label>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option>In office</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Job Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Internship location (maximum 3){" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {locations.map((loc, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {loc}
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add more locations"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddLocation}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={relocate}
                onChange={(e) => setRelocate(e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                Include candidates willing to relocate
              </span>
            </label>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-sm font-medium mb-2">Locality</label>
            <input
              type="text"
              placeholder="Search and add localities"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Work Experience */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Work experience (years) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={expFrom}
                onChange={(e) => setExpFrom(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                min="0"
                value={expTo}
                onChange={(e) => setExpTo(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Annual salary range <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              >
                <option>3 lacs</option>
                <option>4 lacs</option>
                <option>5 lacs</option>
              </select>
              <select
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              >
                <option>4 lacs</option>
                <option>5 lacs</option>
                <option>6 lacs</option>
              </select>
            </div>
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={hideSalary}
                onChange={(e) => setHideSalary(e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                Hide salary details from candidates
              </span>
            </label>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Educational qualification <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {education.map((edu, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {edu}
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(edu)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add more education"
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddEducation}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter detailed job description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none overflow-hidden"
              rows={4}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              About Company<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter detailed company details"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none overflow-hidden"
              rows={4}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
          </div>

          {/* Walk-in Section */}
          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={includeWalkin}
                onChange={(e) => setIncludeWalkin(e.target.checked)}
              />
              <span className="text-sm text-gray-600 font-medium">
                Include walk-in details
              </span>
            </label>

            {includeWalkin && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Walk-in Date */}
                <div>
                  <label className="block text-sm mb-1">
                    Walk-in start date *
                  </label>
                  <input
                    type="date"
                    value={walkinDate}
                    onChange={(e) => setWalkinDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm mb-1">Duration (days)</label>
                  <input
                    type="number"
                    min="1"
                    value={walkinDuration}
                    onChange={(e) => setWalkinDuration(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                {/* Timing */}
                {/* Walk-in Timing */}
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Walk-in timing</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={walkinTime.start}
                      onChange={(e) =>
                        setWalkinTime({ ...walkinTime, start: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <span className="text-gray-600">to</span>
                    <input
                      type="time"
                      value={walkinTime.end}
                      onChange={(e) =>
                        setWalkinTime({ ...walkinTime, end: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Selected:{" "}
                    {walkinTime.start && walkinTime.end
                      ? `${formatTime(walkinTime.start)} - ${formatTime(
                          walkinTime.end
                        )}`
                      : "Select time range"}
                  </p>
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm mb-1">Contact person</label>
                  <input
                    type="text"
                    placeholder="Recruiter name (if available)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm mb-1">Contact number</label>
                  <input
                    type="tel"
                    placeholder="Add mobile number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <p className="text-xs text-gray-500">
                    This will be visible to candidates
                  </p>
                </div>

                {/* Venue */}
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Venue *</label>
                  <textarea
                    placeholder="Type address here"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                {/* Google Maps URL */}
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Google Maps URL</label>
                  <input
                    type="url"
                    placeholder="Google Maps URL of venue"
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Questions */}
          <div className="col-span-2">
            <label className="block text-sm mb-2">
              Questions for candidates
            </label>
            {questions.map((q, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Question ${idx + 1}`}
                value={q}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 bg-gray-50"
              />
            ))}
            <button
              type="button"
              onClick={handleAddQuestionModal}
              className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-50"
            >
              + Add a question
            </button>
          </div>
          <div className="text-center pt-4 flex gap-4 justify-center">
            <button
              type="button"
              onClick={(e) => handleSubmit("draft", e)}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Save as Preview
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit("active", e)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <AddQuestionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default InternshipJobPostForm;
