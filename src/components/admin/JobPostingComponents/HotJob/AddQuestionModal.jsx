"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function AddQuestionModal({ onClose, onSave }) {
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      text: "",
      type: "Single choice",
      mandatory: false,
      options: ["Option 1", "Option 2"],
    },
  ]);

  const handleChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleOptionChange = (id, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? value : opt
              ),
            }
          : q
      )
    );
  };

  const addOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
          : q
      )
    );
  };

  const removeOption = (id, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

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

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmit = () => {
    const formatted = questions.map((q) => ({
      question: q.text,
      type:
        q.type === "Single choice"
          ? "single_choice"
          : q.type === "Multiple choice"
          ? "multiple_choice"
          : "short_answer",
      mandatory: q.mandatory,
      options: q.type === "Short answer" ? [] : q.options,
    }));

    onSave(formatted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl h-[85vh] bg-white border rounded-lg shadow-md flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold">Add questions</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              className="border rounded-lg p-4 mb-6 bg-gray-50 relative"
            >
              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                  <IoMdClose />
                </button>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Question {qIndex + 1}
                </label>
                <input
                  type="text"
                  placeholder="Enter your question here"
                  value={q.text}
                  onChange={(e) =>
                    handleChange(q.id, "text", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 border-gray-300"
                />

                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={q.mandatory}
                    onChange={(e) =>
                      handleChange(q.id, "mandatory", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Mandatory</span>
                </div>
              </div>

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

          <button
            onClick={addQuestion}
            className="text-blue-600 text-sm mb-6 block"
          >
            + Add a question
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-5 border-t bg-white">
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
