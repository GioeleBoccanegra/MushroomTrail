import { Navigate, useLocation } from "react-router-dom";


export function ProtectedRoutes({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, sessionExpired: true }} replace />;
  }

  return children;

}