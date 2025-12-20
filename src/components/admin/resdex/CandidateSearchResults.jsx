import React from "react";
import { useNavigate } from "react-router-dom";

const CandidateSearchResults = ({ show }) => {
  const navigate = useNavigate();

  if (!show) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Search results will appear here
      </div>
      
    );
  }

  const candidates = [
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },

    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", exp: "3 Years" },
    { id: 2, name: "Amit Verma", role: "React Developer", exp: "4 Years" },
    
  ];

  return (
    <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-6">Candidate Profile</h1>
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          onClick={() =>
            navigate(`/resdex/resume-search/${candidate.id}`)
          }
          className="border rounded-lg p-4 hover:shadow transition cursor-pointer"
        >
          <h3 className="font-semibold text-lg">{candidate.name}</h3>
          <p className="text-sm text-gray-600">
            {candidate.role} · {candidate.exp}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CandidateSearchResults;
