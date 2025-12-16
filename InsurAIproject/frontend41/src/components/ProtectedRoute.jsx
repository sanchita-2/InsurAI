import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../auth.js';
export default function ProtectedRoute({ allowedRoles = [] }){
  const user = getCurrentUser();
  if(!user) return <Navigate to="/login" replace />;
  if(allowedRoles.length && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
