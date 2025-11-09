import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

 const InternshipDetails = ({ setDetails }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("Full Time, Permanent");
  const [internshipDuration, setInternshipDuration] = useState("");
  const [internshipDate, setInternshipDate] = useState("");
  const [offeredStipend, setOfferedStipend] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [workMode, setWorkMode] = useState("In office");
  const [location, setLocation] = useState("");
  const [relocate, setRelocate] = useState(true);
  const [industry, setIndustry] = useState("Miscellaneous");
  const [perks, setPerks] = useState([]);
  const [customPerk, setCustomPerk] = useState("");
  const [vacancies, setVacancies] = useState(1);


  useEffect(() => {
    setDetails({
      jobTitle,
      employmentType,
      internshipDuration,
      internshipDate,
      offeredStipend,
      currency,
      workMode,
      location,
      relocate,
      industry,
      perks,
      vacancies,
    });
  }, [jobTitle, employmentType, internshipDuration, internshipDate, offeredStipend, currency, workMode, location, relocate, industry, perks, vacancies]);
  

  const suggestedPerks = [
    "Certificate",
    "Flexible hours",
    "Letter of recommendation",
    "Job offer",
    "Report to founder",
    "College credits",
  ];

  const handleAddPerk = (perk) => {
    if (!perks.includes(perk)) {
      setPerks([...perks, perk]);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // your form logic here
    navigate("/job/internship"); // go to next page after submit
  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-6">Post a Job - Internship</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Internship Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Internship title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Internship Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Internship Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Internship type <span className="text-red-500">*</span>
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option>Full Time, Permanent</option>
              <option>Part Time</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Internship Duration <span className="text-red-500">*</span>
            </label>
            <select
              value={internshipDuration}
              onChange={(e) => setInternshipDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select Duration</option>
              <option>1 month</option>
              <option>2 months</option>
              <option>3 months</option>
              <option>4 months</option>
              <option>5 months</option>
              <option>6 months</option>
              <option>No Fixed Duration</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              When would the internship start?
            </label>
            <input
              type="date"
              value={internshipDate}
              onChange={(e) => setInternshipDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Stipend */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Are you offering a stipend with the internship?
            </label>
            <div className="flex gap-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-1/5 border border-gray-300 rounded-lg px-3 py-2"
              >
                <option>₹</option>
                <option>$</option>
              </select>
              <input
                type="text"
                placeholder="Enter the offered amount per month"
                value={offeredStipend}
                onChange={(e) => setOfferedStipend(e.target.value)}
                className="w-4/5 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-sm font-medium mb-2">Work mode</label>
            <div className="flex gap-4">
              {["In office", "Hybrid", "Remote"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setWorkMode(mode)}
                  className={`px-4 py-2 rounded-full border ${
                    workMode === mode
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Internship Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Internship location
            </label>
            <input
              type="text"
              placeholder="Search and add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={relocate}
                onChange={() => setRelocate(!relocate)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                Include candidates willing to relocate to above location(s)
              </span>
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Your industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option>Miscellaneous</option>
              <option>IT / Software</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Design</option>
              <option>Engineering</option>
            </select>
          </div>

          {/* Perks */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Perks and benefits (Optional)
            </label>
            <input
              type="text"
              placeholder="Mention the benefits the company offers to the interns"
              value={customPerk}
              onChange={(e) => setCustomPerk(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customPerk.trim() !== "") {
                  e.preventDefault();
                  handleAddPerk(customPerk.trim());
                  setCustomPerk("");
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
            />
            <div className="flex flex-wrap gap-2">
              {suggestedPerks.map((perk) => (
                <button
                  key={perk}
                  type="button"
                  onClick={() => handleAddPerk(perk)}
                  className="px-3 py-1 border rounded-full text-sm hover:bg-gray-100"
                >
                  + {perk}
                </button>
              ))}
            </div>
            {perks.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {perks.map((p) => (
                  <span
                    key={p}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Vacancies */}
          <div>
            <label className="block text-sm font-medium mb-2">
              No. of vacancies for this internship
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setVacancies((v) => Math.max(1, v - 1))}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <span>{vacancies}</span>
              <button
                type="button"
                onClick={() => setVacancies((v) => v + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipDetails;