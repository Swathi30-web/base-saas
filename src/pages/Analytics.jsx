import { useState } from 'react';
import { ChevronDown, ChevronLeft, Plus, Camera } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PageHeader, Card } from '../components/UI';
import {
  productStats, productAddByMonth, topSellingProductsTable, productSalesAnalytics,
} from '../data/mockData';

function AddProductPanel({ onClose }) {
  const [negotiable, setNegotiable] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white h-full shadow-xl p-6 sm:p-8 overflow-y-auto animate-slideIn">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Add a New Product</h2>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <Camera size={26} />
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Product Name</label>
            <input className="input-field" placeholder='Macbook Pro 2021 14"' />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Brand</label>
            <select className="input-field"><option>Apple</option><option>Samsung</option><option>Sony</option></select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Price</label>
            <div className="flex items-center gap-3">
              <input className="input-field flex-1" placeholder="$1200" />
              <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="rounded accent-primary-500" />
                Negotiable
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Descriptions</label>
            <textarea rows={4} className="input-field resize-none" placeholder="This is the new creation of..." />
          </div>
        </div>

        <button className="btn-primary w-full mt-8" onClick={onClose}>Save Product</button>
      </div>
    </div>
  );
}

function MiniStat({ s }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center ${s.bg} ${s.fg}`}>
          {s.icon === 'Gift' ? '🎁' : '🛒'}
        </div>
        <div>
          <p className="text-sm text-gray-500">{s.label}</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-gray-900">{s.value}</p>
            <span className="text-xs text-emerald-500 font-medium">{s.delta}</span>
          </div>
        </div>
      </div>
      <div className="h-14">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={[{ v: 10 }, { v: 35 }, { v: 18 }, { v: 40 }, { v: 25 }, { v: 45 }]}>
            <defs>
              <linearGradient id={`g-${s.label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.fg.includes('blue') ? '#4C8CFF' : '#FFC24B'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={s.fg.includes('blue') ? '#4C8CFF' : '#FFC24B'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={s.fg.includes('blue') ? '#4C8CFF' : '#FFC24B'} strokeWidth={2} fill={`url(#g-${s.label})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default function Analytics() {
  const [tab, setTab] = useState('Product');
  const [panelOpen, setPanelOpen] = useState(false);
  const max = Math.max(...productAddByMonth.map((m) => m.value));

  return (
    <div>
      <PageHeader title="Product Analytics">
        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 shadow-card">
          10-06-2021 <ChevronDown size={16} className="text-gray-400" />
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 shadow-card">
          10-10-2021 <ChevronDown size={16} className="text-gray-400" />
        </button>
      </PageHeader>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex bg-white rounded-xl p-1 border border-gray-100 shadow-card">
          {['Product', 'Customer'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                tab === t ? 'bg-primary-500 text-white' : 'text-gray-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setPanelOpen(true)}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {productStats.map((s) => <MiniStat key={s.label} s={s} />)}
        </div>

        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-5">Product Add by Month</h3>
          <div className="space-y-3.5">
            {productAddByMonth.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-8">{m.month}</span>
                <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(m.value / max) * 100}%`, backgroundColor: m.color }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-14 text-right">{m.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Top Selling Products</h3>
            <a className="text-sm text-primary-500 font-medium">See More</a>
          </div>
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="text-left text-gray-400 text-xs">
                <th className="font-medium pb-3">SN</th>
                <th className="font-medium pb-3">Name</th>
                <th className="font-medium pb-3">Price</th>
                <th className="font-medium pb-3">Total Order</th>
                <th className="font-medium pb-3">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {topSellingProductsTable.map((p, i) => (
                <tr key={i} className="border-t border-gray-50">
                  <td className="py-3">{p.medal ? '🏅' : p.rank}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <img src={p.img} className="w-7 h-7 rounded-lg object-cover" alt="" />
                      <span className="text-primary-500 font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500">{p.price}</td>
                  <td className="py-3 text-gray-500">{p.orders}</td>
                  <td className="py-3 text-emerald-500 font-medium">{p.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Product Sales Analytics</h3>
          <div className="relative h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={productSalesAnalytics} dataKey="value" innerRadius={65} outerRadius={90} paddingAngle={4}>
                  {productSalesAnalytics.map((e) => <Cell key={e.name} fill={e.color} stroke="none" />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center text-primary-400">
              📈
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
            {productSalesAnalytics.map((a) => (
              <div key={a.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                {a.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {panelOpen && <AddProductPanel onClose={() => setPanelOpen(false)} />}
    </div>
  );
}
