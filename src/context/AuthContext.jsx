import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

// Only the current session (which user id is logged in) is kept in
// localStorage — never the actual app data. That data always lives in,
// and is fetched fresh from, JSON Server. This mirrors how a real app
// would keep a session token client-side while the backend owns the data.
const SESSION_KEY = 'base_saas_session_user_id';

export const ROLES = ['admin', 'hr', 'employee'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const restore = async () => {
      const storedId = localStorage.getItem(SESSION_KEY);
      if (!storedId) {
        setLoading(false);
        return;
      }
      try {
        const found = await api.get(`/users/${storedId}`);
        setUser(found);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = async (email, password) => {
    setError(null);
    const matches = await api.get(
      `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
    if (!matches || matches.length === 0) {
      const err = 'Invalid email or password.';
      setError(err);
      throw new Error(err);
    }
    const found = matches[0];
    setUser(found);
    localStorage.setItem(SESSION_KEY, String(found.id));
    return found;
  };

  const signup = async ({ fullName, email, username, password, role = 'employee' }) => {
    setError(null);
    const existing = await api.get(`/users?email=${encodeURIComponent(email)}`);
    if (existing && existing.length > 0) {
      const err = 'An account with that email already exists.';
      setError(err);
      throw new Error(err);
    }
    const created = await api.post('/users', {
      name: fullName,
      email,
      username,
      password,
      role,
      plan: 'Free Account',
      phone: '',
      location: '',
      avatar: `https://randomuser.me/api/portraits/${role === 'hr' ? 'women' : 'men'}/${
        (Math.floor(Math.random() * 40) + 1)
      }.jpg`,
    });
    return created;
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updated = await api.patch(`/users/${user.id}`, updates);
    setUser(updated);
    return updated;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const hasRole = (...roles) => !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, signup, logout, updateProfile, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
