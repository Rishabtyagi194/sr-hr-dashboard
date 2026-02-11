import React, { useEffect, useState } from "react";

const LatestJobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Access token missing");
        }

        const res = await fetch(
          "https://qa.api.rozgardwar.cloud/api/jobs/employer-jobs",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setJobs(data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Browser Used & Traffic Reports */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Latest Job Post Reports
            </h2>

            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Browser</th>
                  <th className="pb-2">Sessions</th>
                  <th className="pb-2">Bounce Rate</th>
                  <th className="pb-2">Transactions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {(jobs.length ? jobs : []).map((job, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2">{job.job_title}</td>
                    <td>{job.company_name}</td>
                    <td>{job.location}</td>
                    <td>{job.experience_required}</td>
                  </tr>
                ))}

                {!loading && jobs.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-4 text-center text-gray-500"
                    >
                      No jobs found
                    </td>
                  </tr>
                )}

                {error && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Channel Reports */}
          {/* <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Browser Used & Traffic Reports
            </h2>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Channel</th>
                  <th className="pb-2">Sessions</th>
                  <th className="pb-2">Prev.Period</th>
                  <th className="pb-2">% Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    channel: "Organic search",
                    sessions: "10853 (52%)",
                    prev: "566 (92%)",
                    change: "+52.80%",
                  },
                  {
                    channel: "Direct",
                    sessions: "2545 (47%)",
                    prev: "498 (81%)",
                    change: "-17.20%",
                  },
                  {
                    channel: "Referral",
                    sessions: "1836 (38%)",
                    prev: "455 (74%)",
                    change: "+41.12%",
                  },
                  {
                    channel: "Email",
                    sessions: "1958 (31%)",
                    prev: "361 (61%)",
                    change: "-8.24%",
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 text-blue-600">{row.channel}</td>
                    <td>{row.sessions}</td>
                    <td>{row.prev}</td>
                    <td
                      className={
                        row.change.includes("-")
                          ? "text-red-500"
                          : "text-green-600"
                      }
                    >
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Sessions Device */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sessions Device</h2>
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-[12px] border-blue-400 border-t-blue-600 border-l-blue-300"></div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              01 January 2020 to 31 December 2020
            </p>
          </div>

          {/* Traffic Sources */}
          {/* <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Traffic Sources</h2>
            <p className="text-gray-600 text-sm">
              It is a long established fact that a reader will be of a page when
              looking at its layout.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-3xl font-bold">80</span>
              <button className="text-blue-600 text-sm font-medium">
                Read More →
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LatestJobDashboard;
