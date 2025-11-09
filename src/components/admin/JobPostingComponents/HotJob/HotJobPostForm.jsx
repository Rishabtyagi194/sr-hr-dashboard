import React, { useState } from "react";
import AddQuestionModal from "./AddQuestionModal";

const JobPostForm = ({}) => {
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("Full Time, Permanent");
  const [skills, setSkills] = useState([]);
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [roleCategory, setRoleCategory] = useState("Other");

  const [includeWalkin, setIncludeWalkin] = useState(false);
  const [walkinDate, setWalkinDate] = useState("");
  const [walkinDuration, setWalkinDuration] = useState(1);
  const [walkinTime, setWalkinTime] = useState("");
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

  const [workMode, setWorkMode] = useState("In office");
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [relocate, setRelocate] = useState(false);
  const [locality, setLocality] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutcompany, setaboutcompany] = useState("");

  const [expFrom, setExpFrom] = useState(1);
  const [expTo, setExpTo] = useState(6);

  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [hideSalary, setHideSalary] = useState(false);

  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState("");

  const [keyskills, setkeyskills] = useState([]); // initialize as array
  const [newkeyskills, setNewkeyskills] = useState(""); // initialize as string

  // Handler
  const handleAddKeySkills = () => {
    if (newkeyskills && !keyskills.includes(newkeyskills)) {
      setkeyskills([...keyskills, newkeyskills]);
      setNewkeyskills("");
    }
  };

  const handleRemoveKeySkill = (skill) => {
    setkeyskills(keyskills.filter((s) => s !== skill));
  };

  // Handlers
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (e.target.value && !skills.includes(e.target.value)) {
      setSkills([...skills, e.target.value]);
      e.target.value = "";
    }
  };

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

  const handleDeleteJob = async (jobId) => {
  if (!jobId) {
    alert("Job ID not found!");
    return;
  }

  if (!window.confirm("Are you sure you want to delete this job?")) return;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://147.93.72.227:5000/api/jobs/delete/${jobId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const data = await response.json();
    console.log("Delete Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete job");
    }

    alert("Job deleted successfully!");
  } catch (error) {
    console.error("Error deleting job:", error);
    alert("Error deleting job: " + error.message);
  }
};


  const handleSubmit = async (e, status) => {
    e.preventDefault();
  
    const payload = {
      jobTitle,
      employmentType,
      skills: keyskills,
      CompanyIndustry: companyIndustry || "Information Technology",
      workMode,
      jobLocation: {
        city: locations[0] || "Mumbai",
        state: "Maharashtra",
        country: "India",
      },
      willingToRelocate: relocate,
      locality,
      experinceFrom: expFrom.toString(),
      experinceTo: expTo.toString(),
      salaryRangeFrom: salaryFrom.toString(),
      salaryRangeTo: salaryTo.toString(),
      qualification: education,
      jobDescription,
      AboutCompany: aboutcompany,
      include_walk_in_details: includeWalkin,
      walk_in_start_date: includeWalkin ? walkinDate : null,
      walk_in_start_time: includeWalkin ? walkinTime?.start || "2/10/2002" : "",
      walk_in_end_time: includeWalkin ? walkinTime?.end || "" : "",
      contact_person: includeWalkin ? contactPerson : "",
      venue: includeWalkin ? venue : "",
      google_maps_url: includeWalkin ? googleMapsUrl : "",
      duration_days: includeWalkin ? Number(walkinDuration) : 0,
      contact_number: includeWalkin ? contactNumber : "",
      questions: questions.map((q) => ({
        question: q.question || q,
        type: q.type || "short_answer",
        mandatory: q.mandatory || false,
        options: q.options || [],
        validation: q.validation || "",
      })),
      Status: status,
    };
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://147.93.72.227:5000/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to create job");
      }
  
      alert(status === "draft" ? "Job saved as draft!" : "Job posted successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Error creating job: " + error.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-6">Post a Job - Hot Vacancy</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Job title / Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Employment type <span className="text-red-500">*</span>
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option>Full Time, Permanent</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Key skills <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {keyskills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeySkill(skill)}
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
                value={newkeyskills}
                onChange={(e) => setNewkeyskills(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddKeySkills}
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
              value={companyIndustry}
              onChange={(e) => setCompanyIndustry(e.target.value)}
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
              Job location (maximum 3) <span className="text-red-500">*</span>
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
              to
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
              <input
                type="number"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              ></input>
              to
              <input
                type="number"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              ></input>
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
              value={aboutcompany}
              onChange={(e) => setaboutcompany(e.target.value)}
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

          {/* Submit */}
          <div className="flex gap-3 text-center pt-4">
            <div className="flex gap-3 text-center pt-4">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, "draft")}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Save as Draft
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, "active")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Post Job
              </button>
            </div>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <AddQuestionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default JobPostForm;
