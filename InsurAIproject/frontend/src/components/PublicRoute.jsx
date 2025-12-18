import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../auth";

export default function PublicRoute({ children }) {
  const user = getCurrentUser();

  if (user) {
    // redirect logged-in users automatically
    if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "AGENT") return <Navigate to="/agent/dashboard" replace />;
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}
