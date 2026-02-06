"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserResponse } from "./UserResponse";

const UserResponseContainer = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllResponses = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/jobs/applications/consultant/all/submitted-resume",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Submitted resumes API response:", data);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch responses");
      }

      setCandidates(data?.data || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load responses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResponses();
  }, []);

  return (
    <UserResponse
      candidates={candidates}
      loading={loading}
    />
  );
};

export default UserResponseContainer;
