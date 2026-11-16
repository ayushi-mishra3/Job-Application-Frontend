import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar"
import Home from "./components/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Applicants from "./components/admin/Applicants";
import EditJob from "./components/admin/EditJob";



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },

  //admin ke liye
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />
  },

  //jobs ke liye

  {
    path: '/admin/jobs',
    element: <AdminJobs />
  },
  {
    path: '/admin/jobs/create',
    element: <PostJob />
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoute><EditJob /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <Applicants />
  },
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;