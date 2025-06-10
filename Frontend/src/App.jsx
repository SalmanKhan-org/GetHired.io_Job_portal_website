import React, { useContext } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import { Toaster } from "sonner"
import Applications from "./Pages/Applications"
import AppliedJobs from "./Pages/AppliedJobs"
import ApplyNow from "./Pages/ApplyNow"
import Layout from "./Pages/Layout"
import Dashboard from "./Pages/Dashboard"
import AddJob from "./Pages/AddJob"
import ManageJobs from "./Pages/ManageJobs"
import ViewApplication from "./Pages/ViewApplication"
import 'quill/dist/quill.snow.css'



const router = createBrowserRouter([
  {
  path: "/",
  element: <Layout />,
  children: [
    { index:true, element: <Home /> },
    { path: "applications", element: <Applications /> },
    { path: "appliedJobs", element: <AppliedJobs /> },
    { path: "apply-job/:id", element: <ApplyNow /> },
  ],
  },
  {
    path: '/dashboard', element: <Dashboard />,
    children: [
      { path: 'add/job', element: <AddJob /> },
      { path: 'manage-jobs', element: <ManageJobs /> },
      { path: 'view-applications', element: <ViewApplication /> }
    ]
  }
])

function App() {
  return (
    <>
      <Toaster/>
      <RouterProvider router={ router} />
    </>
  )
}

export default App
