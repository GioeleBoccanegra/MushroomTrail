
import { Navigate } from 'react-router-dom';

export function PublicRoutes({ isAuthenticated, children }) {


  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return children;
}