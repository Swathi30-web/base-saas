import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Logo() {
  return (
    <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mx-auto mb-5">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M3 15 L8 10 L12 13 L21 5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="10" r="1.8" fill="white" />
        <circle cx="12" cy="13" r="1.8" fill="white" />
        <circle cx="21" cy="5" r="1.8" fill="white" />
      </svg>
    </div>
  );
}

function SocialButton({ children }) {
  return (
    <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 transition">
      {children}
    </button>
  );
}

export default function SignUp() {
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ fullName: '', email: '', username: '', password: '', role: 'employee' });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!agree) return;
    setFormError('');
    setSubmitting(true);
    try {
      await signup(form);
      navigate('/confirm');
    } catch (err) {
      setFormError(err.message || 'Unable to create account. Is JSON Server running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
      <Logo />
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign Up</h1>

      <div className="flex gap-3 mb-5">
        <SocialButton>
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.6.4-2.4V6.5H1.4C.5 8.2 0 10.1 0 12s.5 3.8 1.4 5.5l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1c.9-2.8 3.5-4.8 6.6-4.8z"/></svg>
          Google
        </SocialButton>
        <SocialButton>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z"/></svg>
          Facebook
        </SocialButton>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="h-px bg-gray-200 flex-1" />
        <span className="text-xs text-gray-400">Or</span>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
          <input
            required
            placeholder="Jiangyu"
            className="input-field"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
          <input
            type="email"
            required
            placeholder="example@gmail.com"
            className="input-field"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Username</label>
          <input
            required
            placeholder="johnkevine4362"
            className="input-field"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              required
              placeholder="••••••••"
              className="input-field pr-11"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Role</label>
          <select
            className="input-field"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">Demo app: pick any role to try that access level. Role changes for existing users are managed by admins in User Management.</p>
        </div>

        {formError && (
          <div className="bg-rose-50 text-rose-600 text-sm rounded-xl px-4 py-3">{formError}</div>
        )}

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="rounded accent-primary-500 mt-0.5" />
          <span>
            By creating an account you agree to the{' '}
            <a className="text-primary-500 underline">terms of use</a> and our{' '}
            <a className="text-primary-500 underline">privacy policy.</a>
          </span>
        </label>

        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? <LoaderCircle size={18} className="animate-spin mx-auto" /> : 'Create account'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary-500 font-medium">Log in</Link>
        </p>
      </form>
    </div>
  );
}
