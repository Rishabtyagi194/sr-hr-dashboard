import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const InternshipDescription = ({ setDescription }) => {
  const [description, setdescription] = useState("");


  useEffect(() => {
    setDescription(description);
  }, [description]);
  

  // Handle JD File Upload (reads .txt or .docx)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setdescription(event.target.result); // populate editor with text
    };

    // For .txt files
    if (file.type === "text/plain") {
      reader.readAsText(file);
    }

    // For .docx files
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      reader.readAsArrayBuffer(file);
      reader.onload = (event) => {
        import("mammoth").then((mammoth) => {
          mammoth
            .extractRawText({ arrayBuffer: event.target.result })
            .then((result) => setdescription(result.value));
        });
      };
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <label className="block text-gray-800 font-semibold mb-3 text-lg">
        Internship Description
      </label>

      {/* Hidden JD upload input */}
      <input
        type="file"
        id="uploadJDInput"
        accept=".txt,.docx"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex justify-end bg-gray-50 border-b px-3 py-2">
          <button
            onClick={() => document.getElementById("uploadJDInput").click()}
            className="text-blue-600 font-medium flex items-center gap-1"
          >
            📤 Upload JD
          </button>
        </div>

        <CKEditor
          editor={ClassicEditor}
          data={description}
          onChange={(event, editor) => {
            const data = editor.getData();
            setdescription(data);
          }}
        />
      </div>

      <div className="mt-6">
        <button
          onClick={() => console.log(description)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Save Description
        </button>
      </div>
    </div>
  );
};
