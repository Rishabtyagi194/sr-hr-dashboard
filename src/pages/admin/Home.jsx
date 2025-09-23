import React from "react";
import { SubNavbar } from "../../components/admin/global/SubNavbar";
import LatestJobDashboard from "../../components/admin/dashboard/LatestJob";

const Home = () => {
  return (
    <div className="">
        <SubNavbar />
        <div className="p-6">
  <LatestJobDashboard />
        </div>


    </div>
  )

};

export default Home;
