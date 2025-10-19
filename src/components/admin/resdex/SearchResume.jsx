import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

export const SearchResume = () => {
  const [isBooleanOn, setIsBooleanOn] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleBoolean = () => setIsBooleanOn(!isBooleanOn);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !keywords.includes(trimmed)) {
        setKeywords([...keywords, trimmed]);
        setInputValue("");
      }
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Search Resume</h1>

      <div className="space-y-6">
        {/* Keywords input and toggle */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Keywords
          </label>

          <div className="flex items-center gap-4 flex-wrap border border-gray-300 rounded-lg p-2 w-full sm:w-[500px] focus-within:ring-2 focus-within:ring-blue-500">
            {/* Tags */}
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✕
                </button>
              </span>
            ))}

            {/* Input */}
            <input
              type="text"
              placeholder="Type keyword and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[150px] border-none outline-none bg-transparent"
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3 mt-4">
            <div
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
            </div>
            <span className="text-sm font-medium text-gray-700">
              Boolean {isBooleanOn ? "On" : "Off"}
            </span>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2">
                  Search Keyword in Entire Resume
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Resume Title</DropdownMenuItem>
                  <DropdownMenuItem>
                    Resume Title and keyskills{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Resume Synopsis</DropdownMenuItem>
                  <DropdownMenuItem>Entire Resume</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
