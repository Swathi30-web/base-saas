import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ChevronDown, Star, MoreHorizontal, Trash2 } from 'lucide-react';
import { PageHeader, StatusBadge, Card } from '../components/UI';
import { api } from '../api/client';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    api
      .get('/invoices')
      .then(setInvoices)
      .catch(() => setError('Could not reach JSON Server. Run "npm run server" on port 4000.'))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  const toggleStar = async (inv) => {
    setInvoices((list) => list.map((i) => (i.id === inv.id ? { ...i, starred: !i.starred } : i)));
    try {
      await api.patch(`/invoices/${inv.id}`, { starred: !inv.starred });
    } catch {
      // best-effort; UI already reflects the toggle
    }
  };

  const removeInvoice = async (id) => {
    setInvoices((list) => list.filter((i) => i.id !== id));
    try {
      await api.delete(`/invoices/${id}`);
    } catch {
      // ignore
    }
  };

  const filtered = invoices.filter(
    (inv) =>
      inv.name.toLowerCase().includes(query.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(query.toLowerCase()) ||
      inv.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Invoice List">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <Link to="/invoices/new" className="btn-primary">
          <Plus size={16} /> Add New
        </Link>
      </PageHeader>

      <Card className="p-4 sm:p-6 overflow-x-auto">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Loading invoices…</p>}
        {error && <p className="text-sm text-rose-500 py-10 text-center">{error}</p>}

        {!loading && !error && (
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-gray-400 text-xs">
                <th className="pb-4 pl-2 w-8"><input type="checkbox" className="rounded" /></th>
                <th className="font-medium pb-4">Invoice Id <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4">Name <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4">Email <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4">Date <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4">Status <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-4 text-right pr-2"><Trash2 size={14} className="inline text-gray-300" /></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-t border-gray-50 hover:bg-gray-50/60 transition">
                  <td className="py-3.5 pl-2">
                    <input type="checkbox" checked={!!checked[inv.id]} onChange={() => toggle(inv.id)} className="rounded accent-primary-500" />
                  </td>
                  <td className="py-3.5 text-gray-500">{inv.invoiceNo}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <img src={inv.img} className="w-8 h-8 rounded-full object-cover" alt="" />
                      <span className="text-gray-700 font-medium whitespace-nowrap">{inv.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-500 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-[9px]">✓</span>
                      {inv.email}
                    </span>
                  </td>
                  <td className="py-3.5 text-gray-500 whitespace-nowrap">📅 {inv.date}</td>
                  <td className="py-3.5"><StatusBadge status={inv.status} /></td>
                  <td className="py-3.5">
                    <div className="flex items-center justify-end gap-3 pr-2">
                      <button onClick={() => toggleStar(inv)}>
                        <Star size={16} className={inv.starred ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                      </button>
                      <button onClick={() => removeInvoice(inv.id)}>
                        <MoreHorizontal size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-10">No invoices match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
