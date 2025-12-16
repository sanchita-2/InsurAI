import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageAgents from "./pages/admin/ManageAgents.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageAppointments from "./pages/admin/ManageAppointments.jsx";
import ManagePolicies from "./pages/admin/ManagePolicies.jsx";
import AdminPurchasedPolicies from "./pages/admin/AdminPurchasedPolicies.jsx";

import AgentDashboard from "./pages/agent/AgentDashboard.jsx";
import AgentAppointments from "./pages/agent/AgentAppointments.jsx";
import AgentNotifications from "./pages/agent/AgentNotifications.jsx";

import UserDashboard from "./pages/user/UserDashboard.jsx";
import UserAppointments from "./pages/user/UserAppointments.jsx";
import UserNotifications from "./pages/user/UserNotifications.jsx";
import UserPolicies from "./pages/user/UserPolicies.jsx";
import BuyPolicies from "./pages/user/BuyPolicies.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/agents" element={<ManageAgents />} />
            <Route path="/admin/appointments" element={<ManageAppointments />} />
            <Route path="/admin/policies" element={<ManagePolicies />} />
            <Route
              path="/admin/purchased-policies"
              element={<AdminPurchasedPolicies />}
            />
          </Route>
        </Route>

        {/* USER */}
        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route element={<UserLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/appointments" element={<UserAppointments />} />
            <Route path="/user/notifications" element={<UserNotifications />} />
            <Route path="/user/policies" element={<UserPolicies />} />
            <Route path="/user/buy-policies" element={<BuyPolicies />} />
          </Route>
        </Route>

        {/* AGENT */}
        <Route element={<ProtectedRoute allowedRoles={["AGENT"]} />}>
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/appointments" element={<AgentAppointments />} />
          <Route path="/agent/notifications" element={<AgentNotifications />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
