import { useEffect, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, ChevronDown, Search, MapPin, Clock, Calendar as CalIcon, Pencil, Trash2 } from 'lucide-react';
import { PageHeader, Card } from '../components/UI';
import { api } from '../api/client';

const days = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
const grid = [
  [29, 30, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 1, 2],
];

export default function ScheduleList() {
  const [list, setList] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/schedule'), api.get('/people')])
      .then(([schedule, peopleData]) => {
        setList(schedule);
        setPeople(peopleData);
      })
      .catch(() => setError('Could not reach JSON Server. Run "npm run server" on port 4000.'))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id) => {
    setList((l) => l.filter((s) => s.id !== id));
    try {
      await api.delete(`/schedule/${id}`);
    } catch {
      // ignore
    }
  };

  return (
    <div>
      <PageHeader title="Schedule List">
        <button className="btn-primary"><Plus size={16} /> Add New</button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <button className="btn-primary w-full">
            <Plus size={16} /> Create Schedule
          </button>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-800 text-sm">December 2, 2021</p>
              <div className="flex items-center gap-2 text-gray-400">
                <ChevronLeft size={16} className="cursor-pointer hover:text-gray-600" />
                <ChevronRight size={16} className="cursor-pointer hover:text-gray-600" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
              {days.map((d, i) => (
                <span key={i} className="text-gray-400 font-medium">{d}</span>
              ))}
              {grid.flat().map((d, i) => {
                const isToday = i === 4;
                const muted = i < 4 || i >= 32;
                return (
                  <span
                    key={i}
                    className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full ${
                      isToday ? 'bg-primary-500 text-white font-semibold' : muted ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {d}
                  </span>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">People</h3>
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search for People" className="w-full bg-gray-50 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none" />
            </div>
            <div className="space-y-4">
              {people.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img src={p.img} className="w-9 h-9 rounded-full object-cover" alt="" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">{p.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <button className="btn-secondary w-full">My Schedule</button>
        </div>

        <Card className="p-4 sm:p-6 overflow-x-auto h-fit">
          {loading && <p className="text-sm text-gray-400 py-10 text-center">Loading schedule…</p>}
          {error && <p className="text-sm text-rose-500 py-10 text-center">{error}</p>}
          {!loading && !error && (
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-left text-gray-400 text-xs">
                  <th className="pb-4 w-8"><input type="checkbox" className="rounded" /></th>
                  <th className="font-medium pb-4">Date <ChevronDown size={12} className="inline" /></th>
                  <th className="font-medium pb-4">Time <ChevronDown size={12} className="inline" /></th>
                  <th className="font-medium pb-4">Location <ChevronDown size={12} className="inline" /></th>
                  <th className="font-medium pb-4"></th>
                </tr>
              </thead>
              <tbody>
                {list.map((s) => (
                  <tr key={s.id} className="border-t border-gray-50">
                    <td className="py-3.5"><input type="checkbox" className="rounded accent-primary-500" /></td>
                    <td className="py-3.5 text-gray-600 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2"><CalIcon size={14} className="text-primary-400" />{s.date}</span>
                    </td>
                    <td className="py-3.5 text-gray-600 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2"><Clock size={14} className="text-gray-400" />{s.time}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-600 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap">
                        <MapPin size={12} /> {s.location}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center"><Pencil size={14} /></button>
                        <button onClick={() => remove(s.id)} className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}
