import React from "react";

const LatestJobDashboard = () => {
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
                {[
                  {
                    browser: "Chrome",
                    sessions: "10853 (52%)",
                    bounce: "52.80%",
                    trans: "566 (92%)",
                  },
                  {
                    browser: "Microsoft Edge",
                    sessions: "2545 (47%)",
                    bounce: "47.54%",
                    trans: "498 (81%)",
                  },
                  {
                    browser: "Internet Explorer",
                    sessions: "1836 (38%)",
                    bounce: "41.12%",
                    trans: "455 (74%)",
                  },
                  {
                    browser: "Opera",
                    sessions: "1958 (31%)",
                    bounce: "36.82%",
                    trans: "361 (61%)",
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2">{row.browser}</td>
                    <td>{row.sessions}</td>
                    <td>{row.bounce}</td>
                    <td>{row.trans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Channel Reports */}
          <div className="bg-white rounded-2xl shadow p-6">
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
                        row.change.includes("-") ? "text-red-500" : "text-green-600"
                      }
                    >
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Sessions Device */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sessions Device</h2>

            {/* Circle Chart Placeholder */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-[12px] border-blue-400 border-t-blue-600 border-l-blue-300"></div>
            </div>

            <p className="text-sm text-gray-500 text-center mt-4">
              01 January 2020 to 31 December 2020
            </p>

            <table className="w-full mt-4 text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Device</th>
                  <th className="pb-2">Sessions</th>
                  <th className="pb-2">Day</th>
                  <th className="pb-2">Week</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { device: "Desktops", sessions: 1843, day: -3, week: -12 },
                  { device: "Tablets", sessions: 2543, day: -5, week: -2 },
                  { device: "Mobiles", sessions: 3654, day: -5, week: -6 },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2">{row.device}</td>
                    <td>{row.sessions}</td>
                    <td>{row.day}</td>
                    <td>{row.week}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-2xl shadow p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestJobDashboard;
