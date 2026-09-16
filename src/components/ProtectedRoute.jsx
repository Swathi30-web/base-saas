import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Guards a route (or a whole nested <Route element={...}> subtree).
 * - Not logged in            -> redirect to /login
 * - Logged in, wrong role    -> redirect to /403
 * - Logged in, allowed role  -> render children
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>            // any logged-in user
 *   <Route element={<ProtectedRoute roles={['admin']} />} />  // admin only
 */
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children ?? null;
}
