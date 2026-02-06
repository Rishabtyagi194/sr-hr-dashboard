import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/admin/Home";
import Login from "./pages/admin/Login";
import { JobPosting } from "./pages/admin/JobPosting";
import { CreateUser } from "./pages/admin/CreateUser";
import { AllUser } from "./pages/admin/AllUser";
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
import { AppSidebar } from "./components/admin/global/AppSidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import JobAppliesPage from "./components/admin/JobApplies/JobAppliesPage";
import ForgotPassword from "./pages/admin/ForgotPassword";
import { UplodedResume } from "./components/admin/uploded-resume/UplodedResume";
import VerifyOtp from "./components/admin/global/verify";
import ResumeUploadedByConsultant from "./components/admin/uploded-resume/ResumeUploadByConsultant";

function Layout() {
  const location = useLocation();

  const isResdexRoute = location.pathname.startsWith("/resdex");

  /* ---------- AUTH / PUBLIC PAGES ---------- */
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/verify" ||
    location.pathname === "/employeeresgistration";

  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/verify" ||
    location.pathname === "/employeeresgistration" ||
    location.pathname === "/resdex/resume-search" ||
    location.pathname.startsWith("/resdex/resume-search/");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-100">
        {/* Sidebar */}
        {!hideSidebar && <AppSidebar />}

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full overflow-x-hidden">
          {/* Navbar */}
          {!hideNavbar &&
            (isResdexRoute ? <ResdexNavbar /> : <Navbar />)}

          {/* PAGE CONTENT */}
          <main className="flex-1 w-full overflow-x-hidden px-6 py-4">
            <div className="w-full min-w-0">
              <Routes>
                {/* ---------- PUBLIC ROUTES ---------- */}
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify" element={<VerifyOtp />} />
                <Route
                  path="/employeeresgistration"
                  element={<EmployerRegistration />}
                />

                {/* ---------- PROTECTED ROUTES ---------- */}
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

                <Route
                  path="/jobposting/:id"
                  element={
                    <ProtectedRoute>
                      <JobDetails />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/hiring/:jobId/applies"
                  element={<JobAppliesPage />}
                />

                <Route
                  path="/jobposting/editjob/:id"
                  element={
                    <ProtectedRoute>
                      <EditJobPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/consultant-profile-resume"
                  element={
                    <ProtectedRoute>
                      <UplodedResume />
                    </ProtectedRoute>
                  }
                />

                {/* <Route
                  path="/consultant-uploded-resume"
                  element={
                    <ProtectedRoute>
                      <ResumeUploadedByConsultant />
                    </ProtectedRoute>
                  }
                /> */}

                {/* ---------- RESDEX ---------- */}
                <Route
                  path="/resdex"
                  element={
                    <ProtectedRoute>
                      <Resdex />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/resdex/resume-search"
                  element={
                    <ProtectedRoute>
                      <Resdex />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/resdex/resume-search/:id"
                  element={
                    <ProtectedRoute>
                      <CandidateProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* ---------- USERS ---------- */}
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

                {/* ---------- JOB TYPES ---------- */}
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

                {/* ---------- UPLOADS & ARCHIVE ---------- */}
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
          </main>
        </div>
      </div>
    </SidebarProvider>
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
