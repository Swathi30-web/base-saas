import { useEffect, useState } from 'react';
import { ChevronDown, MoreHorizontal, X, Camera } from 'lucide-react';
import { PageHeader, Card } from '../components/UI';
import { api } from '../api/client';

function AddCustomerPanel({ onClose, onAdd }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', gender: 'Male' });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName) return;
    setSaving(true);
    try {
      await onAdd({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email || 'example@gmail.com',
        phone: form.phone || '—',
        gender: form.gender,
        img: `https://randomuser.me/api/portraits/${form.gender === 'Female' ? 'women' : 'men'}/${Math.floor(Math.random() * 60) + 1}.jpg`,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white h-full shadow-xl p-6 sm:p-8 overflow-y-auto animate-slideIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Customer</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <Camera size={26} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">First Name</label>
              <input className="input-field" placeholder="John" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Last Name</label>
              <input className="input-field" placeholder="Deo" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email</label>
              <input className="input-field" placeholder="Example@gmail.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Phone Number</label>
              <input className="input-field" placeholder="33757005467" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Gender</label>
              <select className="input-field" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-primary w-full mt-8 disabled:opacity-60">
            {saving ? 'Saving…' : 'Add Customer'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    api
      .get('/customers')
      .then(setCustomers)
      .catch(() => setError('Could not reach JSON Server. Run "npm run server" on port 4000.'))
      .finally(() => setLoading(false));
  }, []);

  const addCustomer = async (customer) => {
    const created = await api.post('/customers', customer);
    setCustomers((list) => [created, ...list]);
  };

  return (
    <div>
      <PageHeader title="Customer List">
        <button onClick={() => setPanelOpen(true)} className="btn-primary">
          + Add Customer
        </button>
      </PageHeader>

      <Card className="p-4 sm:p-6 overflow-x-auto">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Loading customers…</p>}
        {error && <p className="text-sm text-rose-500 py-10 text-center">{error}</p>}

        {!loading && !error && (
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-gray-400 text-xs">
                <th className="font-medium pb-4">Name <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4">Email <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4">Phone number <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4">Gender <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t border-gray-50">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <img src={c.img} className="w-8 h-8 rounded-full object-cover" alt="" />
                      <span className="text-gray-700 font-medium whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-500 whitespace-nowrap">{c.email}</td>
                  <td className="py-3.5 text-gray-500 whitespace-nowrap">{c.phone}</td>
                  <td className="py-3.5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.gender === 'Male' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}>
                      {c.gender}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2"><MoreHorizontal size={16} className="text-gray-400" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {panelOpen && (
        <AddCustomerPanel
          onClose={() => setPanelOpen(false)}
          onAdd={addCustomer}
        />
      )}
    </div>
  );
}
