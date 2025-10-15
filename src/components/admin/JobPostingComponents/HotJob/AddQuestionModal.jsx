"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function AddQuestionModal({ onClose }) {
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      text: "",
      type: "Single choice",
      mandatory: false,
      options: ["Option 1", "Option 2"],
    },
  ]);

  // Handle input change
  const handleChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  // Handle option change
  const handleOptionChange = (id, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
          : q
      )
    );
  };

  // Add option
  const addOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
          : q
      )
    );
  };

  // Remove option
  const removeOption = (id, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  // Add new question
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: "",
        type: "Single choice",
        mandatory: false,
        options: ["Option 1", "Option 2"],
      },
    ]);
  };

  // Remove question
  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Final submit
  const handleSubmit = () => {
    console.log("Questions data:", questions);
    alert("Check console for output");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl mx-auto border rounded-lg shadow-md p-5 bg-white">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add questions</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            className="border rounded-lg p-4 mb-6 bg-gray-50 relative"
          >
            {/* Remove question */}
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(q.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <IoMdClose />
              </button>
            )}

            {/* Question text */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                placeholder="Enter your question here"
                value={q.text}
                onChange={(e) => handleChange(q.id, "text", e.target.value)}
                className={`w-full border rounded px-3 py-2 ${
                  q.text === "" ? "border-red-500" : "border-gray-300"
                }`}
              />
              {q.text === "" && (
                <p className="text-xs text-red-500 mt-1">Field can’t be empty</p>
              )}

              {/* Mandatory */}
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={q.mandatory}
                  onChange={(e) => handleChange(q.id, "mandatory", e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Mandatory</span>
              </div>
            </div>

            {/* Question type */}
            <div className="mb-4">
              <span className="text-sm font-medium block mb-2">
                Question type:
              </span>
              <div className="flex space-x-2">
                {["Single choice", "Multiple choice", "Short answer"].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => handleChange(q.id, "type", type)}
                      className={`px-4 py-1 border rounded-full text-sm ${
                        q.type === type
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Options */}
            {q.type !== "Short answer" && (
              <div className="mb-4">
                {q.options.map((opt, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input type="radio" disabled className="mr-2" />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(q.id, index, e.target.value)
                      }
                      className="border rounded px-3 py-1 flex-1"
                    />
                    <button
                      onClick={() => removeOption(q.id, index)}
                      className="ml-2 text-gray-500 hover:text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(q.id)}
                  className="text-blue-600 text-sm mt-2"
                >
                  + Add another option
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add new question */}
        <button
          onClick={addQuestion}
          className="text-blue-600 text-sm mb-6 block"
        >
          + Add a question
        </button>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button className="px-3 py-1 border rounded text-sm">
            Save as template
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
