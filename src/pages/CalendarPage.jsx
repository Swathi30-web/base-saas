import { useEffect, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Search, X, Clock, Users, MapPin } from 'lucide-react';
import { PageHeader, Card } from '../components/UI';
import { calendarEvents } from '../data/mockData';
import { api } from '../api/client';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthGrid = [
  [29, 30, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 1, 2],
];
const miniGrid = monthGrid;
const miniDays = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'];

function CreateEventModal({ onClose, people }) {
  const [tab, setTab] = useState('Event');
  const organizer = people[0];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 sm:p-7 shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Create an Event</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center"><X size={18} /></button>
        </div>

        <div className="flex bg-gray-50 rounded-xl p-1 mb-5">
          {['Event', 'Reminder', 'Task'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                tab === t ? 'bg-orange-400 text-white' : 'text-gray-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <input placeholder="Add title" className="w-full border-b border-gray-200 pb-3 mb-5 text-sm focus:outline-none focus:border-primary-400" />

        <div className="flex items-start gap-3 mb-5">
          <Clock size={18} className="text-gray-400 mt-0.5" />
          <div className="text-sm">
            <p className="text-gray-700">Thursday, December 5 &nbsp; 12:00pm&nbsp;–&nbsp;1:00pm</p>
            <p className="text-xs text-gray-400">Time zone · Does not repeat</p>
            <a className="text-xs text-orange-500 font-medium">Find a time</a>
          </div>
        </div>

        <div className="flex gap-3 mb-5 flex-wrap">
          <button className="flex items-center gap-2 bg-primary-500 text-white text-sm font-medium rounded-xl px-4 py-2.5">
            <Users size={15} /> Add People
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-xl px-4 py-2.5">
            <MapPin size={15} /> Add location
          </button>
        </div>

        {organizer && (
          <div className="flex items-center gap-3 mb-6">
            <img src={organizer.img} className="w-9 h-9 rounded-full object-cover" alt="" />
            <div className="text-sm">
              <p className="text-gray-700 font-medium">{organizer.name}</p>
              <p className="text-xs text-gray-400">Busy · Default visibility · notify 30 minutes before</p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">Close</button>
          <button onClick={onClose} className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [view, setView] = useState('Month');
  const [showModal, setShowModal] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    api.get('/people').then(setPeople).catch(() => setPeople([]));
  }, []);

  return (
    <div>
      <PageHeader title="Calendar">
        <div className="flex bg-white rounded-xl p-1 border border-gray-100 shadow-card">
          {['Day', 'Week', 'Month', 'Year'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                view === v ? 'bg-primary-500 text-white' : 'text-gray-500'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6 order-2 lg:order-1">
          <button onClick={() => setShowModal(true)} className="btn-primary w-full">
            <Plus size={16} /> Create Schedule
          </button>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-800 text-sm">December 2, 2021</p>
              <div className="flex items-center gap-2 text-gray-400">
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
              {miniDays.map((d, i) => <span key={i} className="text-gray-400 font-medium">{d}</span>)}
              {miniGrid.flat().map((d, i) => (
                <span
                  key={i}
                  className={`w-7 h-7 mx-auto flex items-center justify-center rounded-full ${
                    i === 4 ? 'bg-primary-500 text-white font-semibold' : (i < 4 || i >= 32) ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {d}
                </span>
              ))}
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

        <Card className="p-4 sm:p-6 order-1 lg:order-2 overflow-x-auto">
          <div className="flex items-center justify-between mb-5">
            <p className="font-semibold text-gray-800">December 2, 2021</p>
            <div className="flex items-center gap-2 text-gray-400">
              <ChevronLeft size={18} className="cursor-pointer hover:text-gray-600" />
              <ChevronRight size={18} className="cursor-pointer hover:text-gray-600" />
            </div>
          </div>

          {view === 'Month' && (
            <div className="min-w-[640px]">
              <div className="grid grid-cols-7 border-b border-gray-100 pb-3 mb-2">
                {weekDays.map((d) => (
                  <span key={d} className="text-xs font-semibold text-gray-500 text-center">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthGrid.flat().map((d, i) => {
                  const muted = i < 4 || i >= 32;
                  const dayNum = i - 3;
                  const isFocused = dayNum === 2;
                  const events = calendarEvents[dayNum] || [];
                  return (
                    <div key={i} className={`min-h-[92px] rounded-lg p-2 ${isFocused ? 'border border-orange-300' : ''}`}>
                      <span className={`text-sm ${isFocused ? 'text-orange-500 font-bold' : muted ? 'text-gray-300' : 'text-gray-600'}`}>
                        {String(d).padStart(2, '0')}
                      </span>
                      <div className="mt-1 space-y-1">
                        {events.slice(0, 2).map((ev, idx) => (
                          <div key={idx} className={`${ev.color} text-white text-[10px] rounded px-1.5 py-0.5 truncate`}>{ev.label}</div>
                        ))}
                        {events.length > 0 && (
                          <p className="text-[10px] text-gray-400">More</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === 'Day' && (
            <div className="min-w-[400px] divide-y divide-gray-50">
              {hours.map((h) => (
                <div key={h} className="flex gap-4 py-4">
                  <span className="text-xs text-gray-400 w-14 shrink-0">{h}</span>
                  <div className="flex-1 border-l border-gray-100 pl-4">
                    {h === '10 AM' && <div className="bg-primary-500 text-white text-xs rounded-lg px-3 py-2 inline-block">Team standup</div>}
                    {h === '1 PM' && <div className="bg-orange-400 text-white text-xs rounded-lg px-3 py-2 inline-block">Lunch with client</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === 'Week' && (
            <div className="min-w-[640px]">
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((d, i) => (
                  <div key={d} className="text-center">
                    <p className="text-xs font-semibold text-gray-500 mb-2">{d}</p>
                    <div className={`h-40 rounded-lg border ${i === 3 ? 'border-orange-300 bg-orange-50/40' : 'border-gray-100'} p-2 space-y-1`}>
                      {i === 3 && <div className="bg-cyan-400 text-white text-[10px] rounded px-1.5 py-1">Free day</div>}
                      {i === 5 && <div className="bg-fuchsia-500 text-white text-[10px] rounded px-1.5 py-1">Party time</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'Year' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 min-w-[560px]">
              {months.map((m) => (
                <div key={m} className="border border-gray-100 rounded-xl p-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{m}</p>
                  <div className="grid grid-cols-7 gap-y-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span key={i} className="text-[9px] text-gray-400 text-center">{(i % 28) + 1}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {showModal && <CreateEventModal onClose={() => setShowModal(false)} people={people} />}
    </div>
  );
}
