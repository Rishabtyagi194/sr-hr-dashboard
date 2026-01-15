import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/admin/Home";
import Sidebar from "./components/admin/global/Sidebar";
import Login from "./pages/admin/Login";
import { JobPosting } from "./pages/admin/JobPosting";
import { CreateUser } from "./pages/admin/CreateUser";
import { AllUser } from "./pages/admin/AllUser";
import { SubNavbar } from "./components/admin/global/JobSubNavbar";
import { Navbar } from "./components/admin/global/Navbar";
import EditJobPage from "./components/admin/JobPostingComponents/JobBoard/EditJobModal";
import EmployerRegistration from "./pages/admin/EmployeeRegistration";
import { Hotvacancy } from "./components/admin/JobPostingComponents/HotJob/Hotvacancy";
import { MyArchive } from "./components/admin/myArchive/MyArchive";
import ProtectedRoute from "./components/admin/global/ProtectedRoute";
import InternshipJob from "./components/admin/JobPostingComponents/Internship/InternshipJob";
import AllUploads from "./components/admin/uploads/AllUploads";
import Resdex from "./components/admin/resdex/Resdex";
import CandidateProfilePage from "./components/admin/resdex/CandidateProfile";
import ResdexNavbar from "./components/admin/global/ResdexNavbar";
import JobDetails from "./components/admin/JobPostingComponents/JobBoard/JobDetailsById";

function Layout() {
  const location = useLocation();

  const isResdexRoute = location.pathname.startsWith("/resdex");

  // ✅ Hide sidebar only for resume search pages
  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/employeeresgistration" ||
    location.pathname === "/resdex/resume-search" ||
    location.pathname.startsWith("/resdex/resume-search/");

  return (
    <div className="flex">
      {/* Sidebar */}
      {!hideSidebar && <Sidebar />}

      {/* Main Content */}
      <div
        className={`flex-1 ${
          !hideSidebar ? "ml-64" : ""
        } bg-gray-100 min-h-screen`}
      >
        {/* ✅ NAVBAR SWITCH */}
        {isResdexRoute ? <ResdexNavbar /> : <Navbar />}

        <Routes>
          {/* ---------------- PUBLIC ROUTES ---------------- */}
          <Route path="/" element={<Login />} />
          <Route
            path="/employeeresgistration"
            element={<EmployerRegistration />}
          />

          {/* ---------------- PROTECTED ROUTES ---------------- */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobposting"
            element={
              <ProtectedRoute>
                <JobPosting />
              </ProtectedRoute>
            }
          />

          <Route path="/jobposting/:id" element={<JobDetails />} />

          <Route
            path="/jobposting/editjob/:id"
            element={
              <ProtectedRoute>
                <EditJobPage />
              </ProtectedRoute>
            }
          />

          {/* Resdex root */}
          <Route
            path="/resdex"
            element={
              <ProtectedRoute>
                <Resdex />
              </ProtectedRoute>
            }
          />

          {/* Resume Search */}
          <Route
            path="/resdex/resume-search"
            element={
              <ProtectedRoute>
                <Resdex />
              </ProtectedRoute>
            }
          />

          {/* Candidate Profile */}
          <Route
            path="/resdex/resume-search/:id"
            element={
              <ProtectedRoute>
                <CandidateProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createuser"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <AllUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobposting/hotvacancy"
            element={
              <ProtectedRoute>
                <Hotvacancy />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobposting/internship"
            element={
              <ProtectedRoute>
                <InternshipJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-uploads"
            element={
              <ProtectedRoute>
                <AllUploads />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-archive"
            element={
              <ProtectedRoute>
                <MyArchive />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
