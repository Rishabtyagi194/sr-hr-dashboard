import React, { useState } from "react";

const JobPostForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("Full Time, Permanent");
  const [skills, setSkills] = useState([]);
  const [companyIndustry, setCompanyIndustry] = useState("Automobile - Other");
  const [roleCategory, setRoleCategory] = useState("Other");

  // New fields
  const [workMode, setWorkMode] = useState("In office");
  const [locations, setLocations] = useState(["Bengaluru"]);
  const [newLocation, setNewLocation] = useState("");
  const [relocate, setRelocate] = useState(false);
  const [locality, setLocality] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [expFrom, setExpFrom] = useState(1);
  const [expTo, setExpTo] = useState(6);

  const [salaryFrom, setSalaryFrom] = useState("3 lacs");
  const [salaryTo, setSalaryTo] = useState("4 lacs");
  const [hideSalary, setHideSalary] = useState(false);

  const [education, setEducation] = useState([
    "B.Tech/B.E. - Automobile",
    "B.Tech/B.E. - Mechanical",
    "Diploma - Mechanical",
    "PG Diploma - Mechanical",
  ]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      jobTitle,
      employmentType,
      skills,
      companyIndustry,
      roleCategory,
      workMode,
      locations,
      relocate,
      locality,
      expFrom,
      expTo,
      salaryFrom,
      salaryTo,
      hideSalary,
      education,
    });
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

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;
