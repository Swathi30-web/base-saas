import { useEffect, useState } from 'react';
import { ShieldCheck, Users as UsersIcon, Trash2 } from 'lucide-react';
import { PageHeader, Card } from '../components/UI';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const roleStyles = {
  admin: 'bg-primary-50 text-primary-600',
  hr: 'bg-amber-50 text-amber-600',
  employee: 'bg-cyan-50 text-cyan-600',
};

export default function UserManagement() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api
      .get('/users')
      .then(setUsers)
      .catch(() => setError('Could not reach JSON Server. Is it running on port 4000?'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const changeRole = async (id, role) => {
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, role } : u)));
    try {
      await api.patch(`/users/${id}`, { role });
    } catch {
      load(); // revert on failure
    }
  };

  const removeUser = async (id) => {
    if (id === me.id) return;
    if (!confirm('Remove this user?')) return;
    setUsers((list) => list.filter((u) => u.id !== id));
    try {
      await api.delete(`/users/${id}`);
    } catch {
      load();
    }
  };

  return (
    <div>
      <PageHeader title="User Management">
        <span className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-card">
          <ShieldCheck size={16} className="text-primary-500" /> Admin only
        </span>
      </PageHeader>

      <Card className="p-4 sm:p-6 overflow-x-auto">
        {loading && <p className="text-sm text-gray-400 py-6 text-center">Loading users…</p>}
        {error && <p className="text-sm text-rose-500 py-6 text-center">{error}</p>}

        {!loading && !error && (
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-gray-400 text-xs">
                <th className="font-medium pb-4">Name</th>
                <th className="font-medium pb-4">Email</th>
                <th className="font-medium pb-4">Role</th>
                <th className="font-medium pb-4 text-right pr-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-gray-50">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <img src={u.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                      <span className="text-gray-700 font-medium whitespace-nowrap">
                        {u.name} {u.id === me.id && <span className="text-xs text-gray-400">(you)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-500 whitespace-nowrap">{u.email}</td>
                  <td className="py-3.5">
                    <select
                      value={u.role}
                      disabled={u.id === me.id}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-3 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-60 ${roleStyles[u.role] || 'bg-gray-100 text-gray-600'}`}
                    >
                      <option value="admin">Admin</option>
                      <option value="hr">HR</option>
                      <option value="employee">Employee</option>
                    </select>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    {u.id !== me.id && (
                      <button
                        onClick={() => removeUser(u.id)}
                        className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 inline-flex items-center justify-center"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-10">
                    <UsersIcon className="mx-auto mb-2" size={22} /> No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
