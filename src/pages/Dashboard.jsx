import { ChevronDown, MoreHorizontal, Calendar, Star } from 'lucide-react';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, PieChart, Pie, Cell,
} from 'recharts';
import { PageHeader, StatCard, Card } from '../components/UI';
import { statCards, reportSeries, analyticsBreakdown, recentOrders, topSellingProducts, avatar } from '../data/mockData';

function DateChip({ label }) {
  return (
    <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 shadow-card">
      {label}
      <ChevronDown size={16} className="text-gray-400" />
    </button>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E1B39] text-white text-xs rounded-lg px-3 py-2 shadow-lg">
        <p className="text-gray-300">Sales</p>
        <p className="font-semibold">{payload[0].value * 40}</p>
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard">
        <DateChip label="10-06-2021" />
        <DateChip label="10-10-2021" />
      </PageHeader>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Reports + Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <Card className="xl:col-span-2 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900">Reports</h3>
            <MoreHorizontal className="text-gray-400" size={20} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reportSeries} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C5CE7" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6C5CE7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#6C5CE7" strokeWidth={2.5} fill="url(#colorValue)" dot={{ r: 3, fill: '#6C5CE7' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Analytics</h3>
            <MoreHorizontal className="text-gray-400" size={20} />
          </div>
          <div className="relative h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsBreakdown}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  startAngle={90}
                  endAngle={-270}
                >
                  {analyticsBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-gray-900">80%</p>
              <p className="text-xs text-gray-400">Transactions</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
            {analyticsBreakdown.map((a) => (
              <div key={a.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                {a.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Orders + Top selling */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <MoreHorizontal className="text-gray-400" size={20} />
          </div>
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="text-left text-gray-400 text-xs">
                <th className="font-medium pb-3">Tracking no</th>
                <th className="font-medium pb-3">Product Name</th>
                <th className="font-medium pb-3">Price</th>
                <th className="font-medium pb-3">Total Order</th>
                <th className="font-medium pb-3">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-gray-50">
                  <td className="py-3 text-gray-500">{o.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <img src={o.img} className="w-7 h-7 rounded-lg object-cover" alt="" />
                      <span className="text-gray-700 font-medium">{o.product}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500">{o.price}</td>
                  <td className="py-3">
                    <span className="bg-cyan-50 text-cyan-600 rounded-lg px-2.5 py-1 text-xs font-semibold">{o.orders}</span>
                  </td>
                  <td className="py-3 text-gray-700 font-medium">{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Top Selling Products</h3>
            <MoreHorizontal className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {topSellingProducts.map((p) => (
              <div key={p.name} className="flex items-center gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <img src={p.img} className="w-14 h-14 rounded-xl object-cover" alt="" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                  <div className="flex items-center gap-0.5 my-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < p.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-gray-900">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
