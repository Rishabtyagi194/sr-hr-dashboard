import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/admin/Home';
import Sidebar from './components/admin/global/Sidebar';
import Login from './pages/admin/Login';
import { JobPosting } from './pages/admin/JobPosting';
import { CreateUser } from './pages/admin/CreateUser';
import { AllUser } from './pages/admin/AllUser';
import { SubNavbar } from './components/admin/global/SubNavbar';
import { Navbar } from './components/admin/global/Navbar';
import EditJobPage from './components/admin/JobPostingComponents/JobBoard/EditJobModal';
import EmployerRegistration from './pages/admin/EmployeeRegistration';
import { Hotvacancy } from './components/admin/JobPostingComponents/HotJob/Hotvacancy';
import { SearchResume } from './components/admin/resdex/SearchResume';
import { MyArchive } from './components/admin/myArchive/MyArchive';
import ProtectedRoute from './components/admin/global/ProtectedRoute';
import InternshipJob from './components/admin/JobPostingComponents/Internship/InternshipJob';

function Layout() {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/" || location.pathname === "/employeeresgistration";

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}

      <div className={`flex-1 ${!hideSidebar ? "ml-64" : ""} bg-gray-100 min-h-screen`}>
        {!hideSidebar && <Navbar />}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/employeeresgistration" element={<EmployerRegistration />} />

          {/* Protected routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/jobposting" element={<ProtectedRoute><JobPosting /></ProtectedRoute>} />
          <Route path="/jobposting/jobs/:id" element={<ProtectedRoute><EditJobPage /></ProtectedRoute>} />
          <Route path="/resdex" element={<ProtectedRoute><SubNavbar /></ProtectedRoute>} />
          <Route path="/createuser" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><AllUser /></ProtectedRoute>} />
          <Route path="/jobposting/hotvacancy" element={<ProtectedRoute><Hotvacancy /></ProtectedRoute>} />
          <Route path="/jobposting/internship" element={<ProtectedRoute><InternshipJob /></ProtectedRoute>} />
          <Route path="/resdex/resume-search" element={<ProtectedRoute><SearchResume /></ProtectedRoute>} />
          <Route path="/my-archive" element={<ProtectedRoute><MyArchive /></ProtectedRoute>} />
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
