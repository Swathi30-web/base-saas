import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Forbidden() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#F6F6FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-card w-full max-w-md p-10 sm:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={32} className="text-rose-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h1>
        <p className="text-sm text-gray-500 mb-8">
          {user
            ? `Your role ("${user.role}") doesn't have permission to view this page.`
            : "You don't have permission to view this page."}
        </p>
        <Link to="/" className="btn-primary inline-flex">Back to Dashboard</Link>
      </div>
    </div>
  );
}
