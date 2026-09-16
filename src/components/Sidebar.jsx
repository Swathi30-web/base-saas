import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, BarChart2, FileStack, ClipboardList, Calendar,
  MessageSquare, Bell, Settings, LogOut, X, Users, KanbanSquare, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const icons = { LayoutGrid, BarChart2, FileStack, ClipboardList, Calendar, MessageSquare, Bell, Settings, Users, KanbanSquare, ShieldCheck };

// Every nav item declares which roles may see it. Admin implicitly sees
// everything a lower role can, plus admin-only items like User Management.
const navSections = [
  { to: '/', label: 'Dashboard', icon: 'LayoutGrid', roles: ['admin', 'hr', 'employee'] },
  { to: '/analytics', label: 'Analytics', icon: 'BarChart2', roles: ['admin', 'hr'] },
  { to: '/invoices', label: 'Invoice', icon: 'FileStack', roles: ['admin'] },
  { to: '/customers', label: 'Customers', icon: 'Users', roles: ['admin', 'hr'] },
  { to: '/schedule', label: 'Schedule', icon: 'ClipboardList', roles: ['admin', 'hr', 'employee'] },
  { to: '/calendar', label: 'Calendar', icon: 'Calendar', roles: ['admin', 'hr', 'employee'] },
  { to: '/tasks', label: 'Tasks', icon: 'KanbanSquare', roles: ['admin', 'hr', 'employee'] },
  { to: '/messages', label: 'Messages', icon: 'MessageSquare', roles: ['admin', 'hr', 'employee'] },
  { to: '/notifications', label: 'Notification', icon: 'Bell', roles: ['admin', 'hr', 'employee'] },
  { to: '/users', label: 'User Management', icon: 'ShieldCheck', roles: ['admin'] },
  { to: '/settings', label: 'Settings', icon: 'Settings', roles: ['admin', 'hr', 'employee'] },
];

const roleLabel = { admin: 'Admin', hr: 'HR', employee: 'Employee' };

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const visibleItems = navSections.filter((item) => !user || item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-50 lg:z-0 lg:static top-0 left-0 h-full w-[260px] bg-white border-r border-gray-100
        flex flex-col px-6 py-7 transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 15 L8 10 L12 13 L21 5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="10" r="1.8" fill="white"/>
                <circle cx="12" cy="13" r="1.8" fill="white"/>
                <circle cx="21" cy="5" r="1.8" fill="white"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Base</span>
          </div>
          <button className="lg:hidden text-gray-400" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {visibleItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors group ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'} />
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-xs font-semibold text-rose-500 bg-rose-50 rounded-full px-2 py-0.5">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-6">
          <div className="relative bg-primary-50 rounded-2xl p-4 pt-10 text-center overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-90" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}} />
            <p className="text-xs text-gray-500 mb-3 mt-2">Upgrade to PRO to get access to all features!</p>
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl py-2.5 transition">
              Upgrade Now
            </button>
          </div>

          {user && (
            <div className="flex items-center gap-3 mt-5 px-1">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-400">{roleLabel[user.role] || user.role} &middot; {user.plan}</p>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-primary-500" title="Log out">
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
