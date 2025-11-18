import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1️⃣ Read Excel for displaying
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      setData(jsonData);
    };
    reader.readAsBinaryString(file);

    // 2️⃣ Upload file to backend
    const formData = new FormData();
    formData.append("file", file);

    // Get token from localStorage
    const token = localStorage.getItem("token"); // make sure you saved it as "token"

    try {
      setUploading(true);
      const response = await fetch("http://147.93.72.227:5000/api/excel/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Upload result:", result);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" flex flex-col items-center py-20 px-4 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Upload Excel and Display Data
      </h2>

      {/* Upload Button */}
      <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
        {uploading ? "Uploading..." : "Upload Excel"}
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      {/* Display Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10 w-full max-w-6xl">
        {data.map((row, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Candidate {index + 1}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <span className="font-medium text-gray-800">{key}:</span>{" "}
                  {value.toString()}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcelUpload;
