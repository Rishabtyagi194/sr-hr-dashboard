import React, { useState } from "react";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

export default function EducationDetailsResdex({ filters, setFilters }) {
  const [open, setOpen] = useState(true);

  const ugOptions = [
    "Any UG qualification",
    "Specific UG qualification",
    "No UG qualification",
  ];

  const pgOptions = [
    "Any PG qualification",
    "Specific PG qualification",
    "No PG qualification",
  ];

  const Pill = ({ active, label, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm ${
        active
          ? "bg-blue-50 border-blue-500 text-blue-700"
          : "border-gray-300 text-gray-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Education Details
        </h2>
        {open ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
      </div>

      {open && (
        <div className="space-y-8">
          {/* ================= UG ================= */}
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">UG Qualification</p>
            <div className="flex flex-wrap gap-2">
              {ugOptions.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  active={filters.ug.mode === item}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      ug: { ...filters.ug, mode: item },
                    })
                  }
                />
              ))}
            </div>
          </div>

          {filters.ug.mode === "Specific UG qualification" && (
            <div className="space-y-4 border-t pt-4">
              <Input
                label="Choose Course"
                value={filters.ug.course}
                onChange={(v) =>
                  setFilters({
                    ...filters,
                    ug: { ...filters.ug, course: v },
                  })
                }
              />

              <Input
                label="Institute"
                value={filters.ug.institute}
                onChange={(v) =>
                  setFilters({
                    ...filters,
                    ug: { ...filters.ug, institute: v },
                  })
                }
              />

              <EducationType
                value={filters.ug.educationType}
                onChange={(v) =>
                  setFilters({
                    ...filters,
                    ug: { ...filters.ug, educationType: v },
                  })
                }
              />

              <YearRange
                fromYear={filters.ug.fromYear}
                toYear={filters.ug.toYear}
                onChange={(from, to) =>
                  setFilters({
                    ...filters,
                    ug: { ...filters.ug, fromYear: from, toYear: to },
                  })
                }
              />
            </div>
          )}

          {/* ================= PG ================= */}
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">PG Qualification</p>
            <div className="flex flex-wrap gap-2">
              {pgOptions.map((item) => (
                <Pill
                  key={item}
                  label={item}
                  active={filters.pg.mode === item}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      pg: { ...filters.pg, mode: item },
                    })
                  }
                />
              ))}
            </div>
          </div>

          {filters.pg.mode === "Specific PG qualification" && (
            <div className="space-y-4 border-t pt-4">
              <Input
                label="Choose PG Course"
                value={filters.pg.course}
                onChange={(v) =>
                  setFilters({
                    ...filters,
                    pg: { ...filters.pg, course: v },
                  })
                }
              />

              <Input
                label="Institute"
                value={filters.pg.institute}
                onChange={(v) =>
                  setFilters({
                    ...filters,
                    pg: { ...filters.pg, institute: v },
                  })
                }
              />

              <EducationType
                value={filters.pg.educationType}
                onChange={(v) =>
                  setFilters({
                    ...filters,
                    pg: { ...filters.pg, educationType: v },
                  })
                }
              />

              <YearRange
                fromYear={filters.pg.fromYear}
                toYear={filters.pg.toYear}
                onChange={(from, to) =>
                  setFilters({
                    ...filters,
                    pg: { ...filters.pg, fromYear: from, toYear: to },
                  })
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Reusable ---------- */

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
    />
  </div>
);

const EducationType = ({ value, onChange }) => (
  <div>
    <p className="text-sm font-medium text-gray-700">Education Type</p>
    <div className="flex gap-2 mt-2">
      {["Full Time", "Part Time", "Correspondence"].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 rounded-full border text-sm ${
            value === type
              ? "bg-blue-50 border-blue-500 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
);

const YearRange = ({ fromYear, toYear, onChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <select
      value={fromYear}
      onChange={(e) => onChange(e.target.value, toYear)}
      className="border rounded-lg px-3 py-2 text-sm"
    >
      <option value="">From</option>
      <option>2019</option>
      <option>2020</option>
      <option>2021</option>
      <option>2022</option>
    </select>

    <select
      value={toYear}
      onChange={(e) => onChange(fromYear, e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm"
    >
      <option value="">To</option>
      <option>2023</option>
      <option>2024</option>
      <option>2025</option>
    </select>
  </div>
);
