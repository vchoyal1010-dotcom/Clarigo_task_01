
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  
  if (!token) {
    
    if (requiredRole === "admin") {
      return <Navigate to="/login" />;
    }

    return children;
  }

  
  if (requiredRole === "admin" && role !== "admin") {
    return <Navigate to="/" />;
  }

  
  if (!requiredRole && role === "admin") {
    return <Navigate to="/adminDash" />;
  }

  return children;
};

export default ProtectedRoute;