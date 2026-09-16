import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Calendar, MapPin, Plus, Trash2, Download, Printer, ArrowLeft, LoaderCircle } from 'lucide-react';
import { Card } from '../components/UI';
import { api } from '../api/client';

const initialItems = [
  { name: 'ipod 2021', rate: 1000, qty: 10 },
  { name: 'Apple Macbook', rate: 1500, qty: 10 },
  { name: 'i phone 12', rate: 885, qty: 10 },
];

export default function CreateInvoice() {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState({
    invoiceId: '#876370',
    date: '01/12/2021',
    name: 'Alison G.',
    email: '',
    address: '',
  });

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const navigate = useNavigate();

  const removeItem = (i) => setItems((list) => list.filter((_, idx) => idx !== i));
  const addItem = () => setItems((list) => [...list, { name: 'New product', rate: 0, qty: 1 }]);

  const subtotal = items.reduce((s, it) => s + it.rate * it.qty, 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  const createInvoice = async () => {
    setSaveError('');
    setSaving(true);
    try {
      await api.post('/invoices', {
        invoiceNo: form.invoiceId,
        name: form.name,
        email: form.email || 'example@gmail.com',
        date: form.date,
        status: 'Pending',
        starred: false,
        img: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 60) + 1}.jpg`,
      });
      navigate('/invoices');
    } catch {
      setSaveError('Could not save the invoice. Is JSON Server running on port 4000?');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link to="/invoices" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-6">
        <ArrowLeft size={16} /> Back to Invoice List
      </Link>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Invoice</h2>

          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 transition">
              <Camera size={26} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Invoice Id</label>
              <input className="input-field" value={form.invoiceId} onChange={(e) => setForm({ ...form, invoiceId: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Date</label>
              <div className="relative">
                <input className="input-field pr-10" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email</label>
              <input className="input-field" placeholder="Example@gmail.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1.5 block">Address</label>
              <div className="relative">
                <input className="input-field pr-10" placeholder="Street" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <MapPin size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Product Description</h3>
            <button onClick={addItem} className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600">
              <Plus size={16} />
            </button>
          </div>

          <div className="hidden sm:grid grid-cols-4 gap-2 text-xs text-gray-400 mb-2 px-1">
            <span>Product Name</span>
            <span>Rate</span>
            <span>QTY</span>
            <span>Amount</span>
          </div>

          <div className="space-y-3 mb-6">
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center text-sm">
                <span className="text-primary-500 font-medium truncate">{it.name}</span>
                <span className="text-gray-600">${it.rate}</span>
                <span className="text-gray-600">{it.qty} Pcs</span>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-500 font-medium">${(it.rate * it.qty).toLocaleString()}</span>
                  <button onClick={() => removeItem(i)} className="text-rose-400 hover:text-rose-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {saveError && (
            <div className="mb-3 bg-rose-50 text-rose-600 text-sm rounded-xl px-4 py-3">{saveError}</div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-secondary flex-1">Send Invoice</button>
            <button onClick={createInvoice} disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
              {saving ? <LoaderCircle size={18} className="animate-spin mx-auto" /> : 'Create Invoice'}
            </button>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Preview</h2>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center"><Download size={16} /></button>
              <button className="w-9 h-9 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center"><Printer size={16} /></button>
            </div>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-500 text-white flex items-center justify-center font-bold">J</div>
              <div className="text-right text-xs text-gray-400 space-y-0.5">
                <p>✉ your.mail@gmail.com</p>
                <p>📞 +386 989 271 3115</p>
              </div>
            </div>

            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-1">RECIPIENT</p>
                <p className="font-semibold text-gray-800">{form.name || 'JOHN SMITH'}</p>
                <p className="text-xs text-gray-400">4304 Liberty Avenue</p>
                <p className="text-xs text-gray-400">92680 Tustin, CA</p>
                <p className="text-xs text-gray-400">VAT no.: 12345678</p>
                <p className="text-xs text-gray-400 mt-1">✉ company.mail@gmail.com</p>
                <p className="text-xs text-gray-400">📞 +386 714 505 8385</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900 mb-2">Invoice</p>
                <p className="text-xs font-semibold text-gray-400">INVOICE NO.</p>
                <p className="text-xs text-gray-600 mb-2">{form.invoiceId.replace('#', '')}/2021</p>
                <p className="text-xs font-semibold text-gray-400">INVOICE DATE</p>
                <p className="text-xs text-gray-600">January 1, 2021</p>
              </div>
            </div>

            <table className="w-full text-xs mb-4">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="font-semibold pb-2">TASK DESCRIPTION</th>
                  <th className="font-semibold pb-2">HOURS</th>
                  <th className="font-semibold pb-2">RATE</th>
                  <th className="font-semibold pb-2 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-gray-700">Website redesign</td>
                  <td className="py-2 text-gray-500">60</td>
                  <td className="py-2 text-gray-500">15 USD</td>
                  <td className="py-2 text-gray-700 text-right">900,00 USD</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-700">Newsletter template design</td>
                  <td className="py-2 text-gray-500">20</td>
                  <td className="py-2 text-gray-500">12 USD</td>
                  <td className="py-2 text-gray-700 text-right">240,00 USD</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mb-4">
              <div className="w-48 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400"><span>SUBTOTAL</span><span>{subtotal.toFixed(2)} USD</span></div>
                <div className="flex justify-between text-gray-400"><span>DISCOUNT 5%</span><span>{discount.toFixed(2)} USD</span></div>
                <div className="flex justify-between font-semibold text-gray-800 pt-1 border-t border-gray-100"><span>TOTAL</span><span className="text-primary-500">{total.toFixed(2)} USD</span></div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mb-3">
              Transfer the amount to the business account below. Please include invoice number on your check.
            </p>
            <p className="text-[11px] text-gray-500 mb-4">BANK: FTSBUS33 &nbsp;•&nbsp; IBAN: GB82-1111-2222-3333</p>

            <p className="text-xs font-semibold text-gray-400 mb-1">NOTES</p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              All amounts are in dollars. Please make the payment within 15 days from the issue date of this invoice.
              Thank you for your confidence in my work.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
