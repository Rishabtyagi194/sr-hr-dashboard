import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const ResumeUpload = () => {
  const [data, setData] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(" ");
        fullText += text + "\n";
      }

      // Extract simple info (name, email, phone)
      const nameMatch = fullText.match(/Name[:\-]?\s*([A-Za-z\s]+)/i);
      const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}/i);
      const phoneMatch = fullText.match(/(\+?\d{10,12})/);

      setData({
        name: nameMatch ? nameMatch[1].trim() : "Not found",
        email: emailMatch ? emailMatch[0] : "Not found",
        phone: phoneMatch ? phoneMatch[0] : "Not found",
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload Your Resume (PDF)</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        style={styles.input}
      />

      {data && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Extracted Resume Info</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  card: {
    marginTop: "30px",
    display: "inline-block",
    textAlign: "left",
    padding: "20px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "300px",
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
};
