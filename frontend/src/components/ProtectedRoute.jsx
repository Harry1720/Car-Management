import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const role = localStorage.getItem('role');
  
  if (!isAuthenticated) {
    return <Navigate to={requireAdmin ? "/admin/login" : "/login"} replace />;
  }

  if (requireAdmin && (role !== 'admin' && role !== 'employee')) {
    // Authenticated but not an admin/employee
    return <Navigate to="/" replace />;
  }

  if (!requireAdmin && role !== 'user') {
    // Authenticated as admin/employee but trying to access user page
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
