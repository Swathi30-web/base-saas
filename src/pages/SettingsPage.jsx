import { useState } from 'react';
import { Camera } from 'lucide-react';
import { PageHeader, Card } from '../components/UI';
import { useAuth } from '../context/AuthContext';

const tabs = ['Profile', 'Account', 'Notifications', 'Security'];
const roleLabel = { admin: 'Admin', hr: 'HR', employee: 'Employee' };

export default function SettingsPage() {
  const [tab, setTab] = useState('Profile');
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile(form);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Settings" />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <Card className="p-3 h-fit">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition mb-1 last:mb-0 ${
                tab === t ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </Card>

        <Card className="p-6 sm:p-8">
          {tab === 'Profile' && user && (
            <form onSubmit={saveProfile}>
              <h3 className="font-bold text-gray-900 mb-6">Profile Information</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <img src={user.avatar} className="w-20 h-20 rounded-full object-cover" alt="" />
                  <button type="button" className="absolute bottom-0 right-0 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Camera size={12} className="text-white" />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.plan} &middot; {roleLabel[user.role] || user.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Full Name</label>
                  <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email</label>
                  <input className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Phone Number</label>
                  <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Location</label>
                  <input className="input-field" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
              </div>
              {saved && <p className="text-sm text-emerald-500 mt-4">Profile saved.</p>}
              <button type="submit" disabled={saving} className="btn-primary mt-8 disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          )}

          {tab === 'Account' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-5 max-w-md">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Username</label>
                  <input className="input-field" defaultValue={user?.username || ''} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Language</label>
                  <select className="input-field"><option>English</option><option>Bangla</option></select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Time Zone</label>
                  <select className="input-field"><option>GMT+6 Dhaka</option><option>GMT+0 London</option></select>
                </div>
              </div>
              <button className="btn-primary mt-8">Save Changes</button>
            </div>
          )}

          {tab === 'Notifications' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-4 max-w-md">
                {['Email notifications', 'Push notifications', 'SMS alerts', 'Weekly summary'].map((label) => (
                  <div key={label} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-700">{label}</span>
                    <button className="w-11 h-6 rounded-full bg-primary-500 relative">
                      <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'Security' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-6">Security</h3>
              <div className="space-y-5 max-w-md">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Current Password</label>
                  <input type="password" className="input-field" defaultValue="********" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">New Password</label>
                  <input type="password" className="input-field" placeholder="Enter new password" />
                </div>
              </div>
              <button className="btn-primary mt-8">Update Password</button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
