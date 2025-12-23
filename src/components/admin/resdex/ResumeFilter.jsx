import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ExperienceFilter({ filters, setFilters }) {
  const [showITSkills, setShowITSkills] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const onlyNumbers = (value) => value.replace(/[^0-9]/g, "");

  /* ---------------- ADD SKILL ---------------- */
  const addSkill = () => {
    if (!skillInput.trim()) return;

    setFilters({
      ...filters,
      skills: [...filters.skills, skillInput.trim()],
    });
    setSkillInput("");
  };

  /* ---------------- REMOVE LOCATION ---------------- */
  const removeLocation = (loc) => {
    setFilters({
      ...filters,
      locations: filters.locations.filter((l) => l !== loc),
    });
  };

  return (
    <div className="w-full space-y-6 pb-6 px-6">

      {/* -------- ADD IT SKILLS -------- */}
      <p
        className="text-blue-600 font-medium cursor-pointer"
        onClick={() => setShowITSkills(true)}
      >
        + Add IT Skills
      </p>

      {showITSkills && (
        <div className="space-y-3 border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
          <p className="text-gray-800 font-semibold">IT Skills</p>

          <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100 flex gap-2">
            <span>ℹ️</span>
            <p>
              Candidates often miss filling IT skills. Results may be limited.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Add IT skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              className="border border-gray-300 rounded-lg px-3 py-2 w-48 text-sm"
            />

            <input
              type="text"
              placeholder="Experience (Years)"
              value={filters.minExperience}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minExperience: onlyNumbers(e.target.value),
                })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-48 text-sm"
            />

            <button
              onClick={() => setShowITSkills(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2">
            {filters.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <IoClose
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      skills: filters.skills.filter((_, idx) => idx !== i),
                    })
                  }
                />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* -------- LOCATION -------- */}
      <div className="space-y-3">
        <p className="text-gray-700 font-semibold">Current location of candidate</p>

        <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg px-3 py-2">
          {filters.locations.map((loc, i) => (
            <span
              key={i}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {loc}
              <IoClose
                size={14}
                className="cursor-pointer"
                onClick={() => removeLocation(loc)}
              />
            </span>
          ))}

          <input
            type="text"
            placeholder="Add location"
            className="outline-none text-sm flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                setFilters({
                  ...filters,
                  locations: [...filters.locations, e.target.value],
                });
                e.target.value = "";
              }
            }}
          />
        </div>

        {/* Checkboxes */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.includeRelocation}
            onChange={(e) =>
              setFilters({ ...filters, includeRelocation: e.target.checked })
            }
          />
          Include candidates willing to relocate
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.excludeAnywhere}
            onChange={(e) =>
              setFilters({ ...filters, excludeAnywhere: e.target.checked })
            }
          />
          Exclude candidates who mentioned “Anywhere”
        </label>
      </div>

      {/* -------- SALARY -------- */}
      <div className="space-y-3">
        <p className="text-gray-700 font-semibold">Annual Salary</p>

        <div className="flex items-center gap-3">
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>INR</option>
          </select>

          <input
            type="text"
            placeholder="Min"
            value={filters.minSalary}
            onChange={(e) =>
              setFilters({
                ...filters,
                minSalary: onlyNumbers(e.target.value),
              })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-32"
          />

          <input
            type="text"
            placeholder="Max"
            value={filters.maxSalary}
            onChange={(e) =>
              setFilters({
                ...filters,
                maxSalary: onlyNumbers(e.target.value),
              })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-32"
          />

          <span className="text-gray-600">Lacs</span>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.includeNoSalary}
            onChange={(e) =>
              setFilters({
                ...filters,
                includeNoSalary: e.target.checked,
              })
            }
          />
          Include candidates with no salary info
        </label>
      </div>
    </div>
  );
}
