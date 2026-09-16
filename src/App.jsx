import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import InvoiceList from './pages/InvoiceList';
import CreateInvoice from './pages/CreateInvoice';
import CustomerList from './pages/CustomerList';
import ScheduleList from './pages/ScheduleList';
import CalendarPage from './pages/CalendarPage';
import Chat from './pages/Chat';
import Tasks from './pages/Tasks';
import Notifications from './pages/Notifications';
import SettingsPage from './pages/SettingsPage';
import UserManagement from './pages/UserManagement';
import Forbidden from './pages/Forbidden';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Recover from './pages/Recover';
import Confirm from './pages/Confirm';

// Role-based access control:
//  - admin    -> everything, including Invoices and User Management
//  - hr       -> everything except Invoices and User Management
//  - employee -> everyday pages only (no Analytics, Invoices, Customers, or User Management)
export default function App() {
  return (
    <Routes>
      {/* Authentication (public) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/recover" element={<Recover />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/403" element={<Forbidden />} />

      {/* App (requires login) */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<ProtectedRoute roles={['admin', 'hr']}><Analytics /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute roles={['admin']}><InvoiceList /></ProtectedRoute>} />
        <Route path="/invoices/new" element={<ProtectedRoute roles={['admin']}><CreateInvoice /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute roles={['admin', 'hr']}><CustomerList /></ProtectedRoute>} />
        <Route path="/schedule" element={<ScheduleList />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/messages" element={<Chat />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/users" element={<ProtectedRoute roles={['admin']}><UserManagement /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
