import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  /* -------------------- FORM STATES -------------------- */
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [keyskills, setkeyskills] = useState([]);
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [locations, setLocations] = useState([]);
  const [locality, setLocality] = useState("");
  const [expFrom, setExpFrom] = useState("");
  const [expTo, setExpTo] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [education, setEducation] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [aboutcompany, setaboutcompany] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isConsultantJobActive, setIsConsultantJobActive] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  /* -------------------- FETCH JOB -------------------- */
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://qa.api.rozgardwar.cloud/api/jobs/employer-job/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        const job = data?.job || data;

        /* 🔁 MAP API → STATE */
        setJobTitle(job.jobTitle || "");
        setEmploymentType(job.employmentType || "");
        setkeyskills(job.skills || []);
        setCompanyIndustry(job.CompanyIndustry || "");
        setWorkMode(job.workMode || "");
        setLocations(job.jobLocation?.city ? [job.jobLocation.city] : []);
        setLocality(job.locality || "");
        setExpFrom(job.experinceFrom || "");
        setExpTo(job.experinceTo || "");
        setSalaryFrom(job.salaryRangeFrom || "");
        setSalaryTo(job.salaryRangeTo || "");
        setEducation(job.qualification || []);
        setJobDescription(job.jobDescription || "");
        setaboutcompany(job.AboutCompany || "");
        setQuestions(job.questions || []);
        setIsConsultantJobActive(job.is_consultant_Job_Active || false);
      } catch (err) {
        console.error("Failed to fetch job", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  /* -------------------- VALIDATION -------------------- */
  const isFormValid = () =>
    jobTitle &&
    keyskills.length &&
    companyIndustry &&
    workMode &&
    locations.length &&
    expFrom &&
    expTo &&
    salaryFrom &&
    salaryTo &&
    education.length &&
    jobDescription &&
    aboutcompany;

  /* -------------------- UPDATE JOB -------------------- */
  const handleUpdate = async (status) => {
    const payload = {
      jobTitle,
      employmentType,
      skills: keyskills,
      CompanyIndustry: companyIndustry,
      workMode,
      jobLocation: { city: locations[0] },
      locality,
      experinceFrom: expFrom.toString(),
      experinceTo: expTo.toString(),
      salaryRangeFrom: salaryFrom.toString(),
      salaryRangeTo: salaryTo.toString(),
      qualification: education,
      jobDescription,
      AboutCompany: aboutcompany,
      questions,
      Status: status,
      is_consultant_Job_Active: isConsultantJobActive,
    };

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/api/jobs/update-job/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate("/jobposting");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update job");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading job details...</p>;

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-6">
          Edit Job – #{id}
        </h2>

        {/* 👉 Reuse same UI fields from JobPostForm here */}
        {/* You can literally copy-paste JobPostForm JSX inputs */}
        {/* All state handlers already match */}

        <form onSubmit={handleUpdate} className="space-y-6">
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

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isConsultantJobActive}
              onChange={(e) => setIsConsultantJobActive(e.target.checked)}
            />
            <span className="text-sm text-gray-600">
              Vacancy should be visible to consultancy?
            </span>
          </label>

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
                value={q.question}
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
                onClick={() => handleSubmit("draft")}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Save as Draft
              </button>
              <button
                type="button"
                disabled={!isFormValid()}
                onClick={() => {
                  setPendingStatus("active"); // store what we want to do
                  setConfirmModalOpen(true); // open confirmation modal
                }}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  isFormValid()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                Post Job
              </button>
            </div>
          </div>
        </form>

        <div className="flex gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => handleUpdate("draft")}
          >
            Save as Draft
          </Button>

          <Button
            disabled={!isFormValid()}
            onClick={() => {
              setPendingStatus("active");
              setConfirmModalOpen(true);
            }}
          >
            Update Job
          </Button>
        </div>
      </div>

      {/* Confirm Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update this job?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleUpdate(pendingStatus)}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditJobPage;
