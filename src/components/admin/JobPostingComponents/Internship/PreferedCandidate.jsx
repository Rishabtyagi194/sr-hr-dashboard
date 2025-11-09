import React, { useEffect, useState } from "react";

const PereferedCandidate = ({ setCandidate }) => {
  const [skills, setSkills] = useState([
    "Human Resource Management",
    "Attendance Management",
    "Performance Management",
    "Attrition Analysis",
    "Retention Strategies",
    "Change Management",
  ]);
  const [inputSkill, setInputSkill] = useState("");
  const [education, setEducation] = useState([
    "MCA",
    "BCA",
  ]);
  const [videoProfile, setVideoProfile] = useState("No");

  useEffect(() => {
    setCandidate({ skills, education, videoProfile });
  }, [skills, education, videoProfile]);
  

  const suggestions = [
    "Succession Planning",
    "HR Analytics",
    "Employee Relations",
    "Payroll Management",
  ];

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInputSkill("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addEducation = (value) => {
    if (value && !education.includes(value)) {
      setEducation([...education, value]);
    }
  };

  const removeEducation = (value) => {
    setEducation(education.filter((e) => e !== value));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Add Skills */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Add skills</h2>
        <div className="flex flex-wrap gap-2 border p-3 rounded-lg">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-blue-50 border border-blue-400 text-blue-600 px-3 py-1 rounded-full"
            >
              ⭐ {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill(inputSkill)}
            placeholder="Type skill"
            className="outline-none text-gray-600 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => addSkill(s)}
              className="border border-dashed border-gray-300 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Educational qualification</h2>
        <div className="flex flex-wrap gap-2 border p-3 rounded-lg">
          {education.map((e, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-blue-50 border border-blue-400 text-blue-600 px-3 py-1 rounded-full"
            >
              {e}
              <button
                onClick={() => removeEducation(e)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Add more education"
            onKeyDown={(e) => e.key === "Enter" && addEducation(e.target.value)}
            className="outline-none text-gray-600 placeholder-gray-400 flex-1"
          />
        </div>
      </div>

      {/* Video Profile */}
      <div>
        <h2 className="font-semibold text-lg mb-2">
          Video profile needed from candidates
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setVideoProfile("Yes")}
            className={`px-5 py-2 rounded-full border ${
              videoProfile === "Yes"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => setVideoProfile("No")}
            className={`px-5 py-2 rounded-full border ${
              videoProfile === "No"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PereferedCandidate;
