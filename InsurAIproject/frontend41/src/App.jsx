import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
// admin
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ManageAgents from './pages/admin/ManageAgents.jsx'
import ManageUsers from './pages/admin/ManageUsers.jsx'
import ManageAppointments from './pages/admin/ManageAppointments.jsx'
// agent
import AgentDashboard from './pages/agent/AgentDashboard.jsx'
import AgentAppointments from './pages/agent/AgentAppointments.jsx'
import AgentNotifications from './pages/agent/AgentNotifications.jsx'
// user
import UserDashboard from './pages/user/UserDashboard.jsx'
import UserAppointments from './pages/user/UserAppointments.jsx'
import UserNotifications from './pages/user/UserNotifications.jsx'
import UserPolicies from './pages/user/UserPolicies.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UserLayout from "./layouts/UserLayout";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/agents" element={<ManageAgents/>} />
          <Route path="/admin/users" element={<ManageUsers/>} />
          <Route path="/admin/appointments" element={<ManageAppointments/>} />
        </Route>
<Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
  <Route element={<UserLayout />}>
    <Route path="/user/dashboard" element={<UserDashboard />} />
    <Route path="/user/appointments" element={<UserAppointments />} />
    <Route path="/user/notifications" element={<UserNotifications />} />
  </Route>
</Route>

        <Route element={<ProtectedRoute allowedRoles={['AGENT']} />}>
          <Route path="/agent/dashboard" element={<AgentDashboard/>} />
          <Route path="/agent/appointments" element={<AgentAppointments/>} />
          <Route path="/agent/notifications" element={<AgentNotifications/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/user/appointments" element={<UserAppointments/>} />
          <Route path="/user/notifications" element={<UserNotifications/>} />
          <Route path="/user/policies" element={<UserPolicies/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
