import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/admin/Home';
import Sidebar from './components/admin/global/Sidebar';
import Login from './pages/admin/Login';
import { JobPosting } from './pages/admin/JobPosting';
import { CreateUser } from './pages/admin/CreateUser';
import { AllUser } from './pages/admin/AllUser';
import { SubNavbar } from './components/admin/global/SubNavbar';
import { Navbar } from './components/admin/global/Navbar';
import EditJobPage from './components/admin/JobPostingComponents/EditJobModal';
import EmployerRegistration from './pages/admin/EmployeeRegistration';
import { Hotvacancy } from './components/admin/JobPostingComponents/HotJob/Hotvacancy';
import { InternshipJob } from './components/admin/JobPostingComponents/Internship/InternshipJob';

function Layout() {
  const location = useLocation();

  // Hide sidebar on login and employer registration pages
  const hideSidebar =
    location.pathname === "/" || location.pathname === "/employeeresgistration";

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}

      <div className={`flex-1 ${!hideSidebar ? "ml-64" : ""} bg-gray-100 min-h-screen`}>
        {!hideSidebar && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employeeresgistration" element={<EmployerRegistration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/jobposting/jobs/:id" element={<EditJobPage />} />
          <Route path="/resdex" element={<SubNavbar />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/users" element={<AllUser />} />
          <Route path='/jobposting/hotvacancy' element={<Hotvacancy />} />
          <Route path='/jobposting/internship' element={<InternshipJob />} />

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
