import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export const SearchResume = () => {
  const [isBooleanOn, setIsBooleanOn] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef(null);
  const token = localStorage.getItem("token");

  const toggleBoolean = () => setIsBooleanOn(!isBooleanOn);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 200);
  };

  const fetchSuggestions = async (value) => {
    try {
      const res = await axios.get(
        `http://147.93.72.227:5000/api/search/suggestions?keyword=${value}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword(inputValue);
    }
  };

  const addKeyword = async (value) => {
    const trimmed = value.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setInputValue("");
      setSuggestions([]);

      await axios.post(
        "http://147.93.72.227:5000/api/search/saveKeyword",
        { keyword: trimmed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const selectSuggestion = async (suggestion) => {
    addKeyword(suggestion);

    await axios.post(
      "http://147.93.72.227:5000/api/search/saveKeyword",
      { keyword: suggestion },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  // ---------------- FILTER BUTTON LOGIC ----------------
  const filterResumes = async () => {
    if (keywords.length === 0) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `http://147.93.72.227:5000/api/search/resume?keyword=${keywords.join(",")}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res?.data?.resumes);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Search Resume</h1>

      <div className="relative w-full sm:w-[500px]">
        <div className="flex items-center gap-4 flex-wrap border border-gray-300 rounded-lg p-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              {keyword}
              <button
                onClick={() => removeKeyword(keyword)}
                className="text-blue-600 hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          ))}

          <input
            type="text"
            placeholder="Type keyword..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[150px] outline-none border-none bg-transparent"
          />
        </div>

        {suggestions.length > 0 && (
          <div className="absolute z-20 w-full bg-white border rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((s, index) => (
              <div
                key={index}
                onClick={() => selectSuggestion(s)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Button */}
      {/* <button
        onClick={filterResumes}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
      >
        Search Candidate
      </button> */}

      {/* Boolean Toggle */}
      <div className="flex items-center gap-4 mt-6">
        {/* <div
          onClick={toggleBoolean}
          className={`relative w-14 h-7 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
            isBooleanOn ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isBooleanOn ? "translate-x-7" : "translate-x-1"
            }`}
          ></div>
        </div> */}
        {/* <span className="text-sm font-medium text-gray-700">
          Boolean {isBooleanOn ? "On" : "Off"}
        </span> */}
      </div>

      {/* Results */}
      {/* <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Results</h2>
        {loading && <p>Searching...</p>}

        {results.map((r) => (
          <div key={r.user_id} className="border rounded-md p-4 mb-3 shadow-sm">
            <h3 className="font-bold">{r.full_name}</h3>
            <p>{r.profile_title}</p>
            <p className="text-sm text-gray-600">{r.about_me}</p>
            <p className="text-xs mt-2 text-blue-600">{r.skills}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};