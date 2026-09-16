import { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronRight, Pencil, Trash2, MoreHorizontal, MessageCircle, Heart, CheckCircle2, Circle } from 'lucide-react';
import { PageHeader, StatusBadge, Card, AvatarStack } from '../components/UI';
import { taskGroups, boardColumns, avatar } from '../data/mockData';

const teamAvatars = [avatar(101), avatar(102), avatar(103)];

function ListView() {
  return (
    <div className="space-y-6">
      {taskGroups.map((group) => (
        <Card key={group.key} className="p-4 sm:p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">{group.title}</h3>
            <a className="text-sm text-primary-500 font-medium">See More</a>
          </div>
          <table className="w-full text-sm min-w-[680px]">
            <thead>
              <tr className="text-left text-gray-400 text-xs">
                <th className="pb-3 w-8"><input type="checkbox" className="rounded" /></th>
                <th className="font-medium pb-3">Task Name <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-3">Start Date <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-3">End Date <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-3">Member <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-3">Status <ChevronDown size={12} className="inline" /></th>
                <th className="font-medium pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {group.tasks.map((t, i) => (
                <tr key={i} className="border-t border-gray-50">
                  <td className="py-3.5"><input type="checkbox" defaultChecked={t.done} className="rounded accent-primary-500" /></td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-2 text-primary-500 font-medium">
                      <span>{t.icon}</span>{t.name}
                    </span>
                  </td>
                  <td className="py-3.5 text-gray-500 whitespace-nowrap">{t.start}</td>
                  <td className="py-3.5 text-rose-400 whitespace-nowrap">{t.end}</td>
                  <td className="py-3.5 text-gray-500 whitespace-nowrap">{t.member}</td>
                  <td className="py-3.5"><StatusBadge status={t.status} /></td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center"><Pencil size={14} /></button>
                      <button className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ))}
    </div>
  );
}

function BoardView() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {boardColumns.map((col) => (
        <div key={col.key}>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-semibold text-gray-800 text-sm">{col.title}</h3>
            <span className="text-xs text-gray-400">{col.cards.length}</span>
          </div>
          <div className="space-y-4">
            {col.cards.map((c, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2">
                    {c.done ? <CheckCircle2 size={16} className="text-primary-500 fill-primary-100" /> : <Circle size={16} className="text-gray-300" />}
                    <span className="text-sm font-semibold text-gray-800">{c.title}</span>
                  </span>
                  <MoreHorizontal size={16} className="text-gray-300" />
                </div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {c.tags.map((tag, ti) => (
                    <span key={ti} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${tag.color}`}>{tag.label}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">{c.desc}</p>
                <div className="flex items-center justify-between">
                  <AvatarStack images={teamAvatars} extra={2} size={24} />
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MessageCircle size={13} />{c.comments}</span>
                    <span className="flex items-center gap-1"><Heart size={13} />{c.likes}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const DAY_LABELS = ['29', '30', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];
const ACTIVE_DAY_INDEX = 3; // "02" — matches the reference screenshot
const HOUR_LABELS = ['09.00 AM', '10.00 AM', '11.00 AM', '12.00 PM', '01.00 PM', '02.00 PM', '03.00 PM', '04.00 PM', '05.00 PM'];
const ROW_HEIGHT = 72;

const timelineBars = [
  { name: 'Grapich Design', dayStart: 3, daySpan: 2.1, top: 0, height: 60, tag: 'Low', tagColor: 'bg-rose-100 text-rose-600', done: false },
  { name: 'Dashboard Design', dayStart: 4, daySpan: 3.2, top: ROW_HEIGHT * 2 + 18, height: 100, tag: 'High', tagColor: 'bg-cyan-100 text-cyan-600', done: true },
  { name: 'Logo Design', dayStart: 3.3, daySpan: 2.2, top: ROW_HEIGHT * 4 + 14, height: 60, tag: 'High', tagColor: 'bg-cyan-100 text-cyan-600', done: true },
  { name: 'Web Design', dayStart: 6.3, daySpan: 2.3, top: ROW_HEIGHT * 6 + 24, height: 60, tag: 'High', tagColor: 'bg-cyan-100 text-cyan-600', done: true },
];

function TimelineFilterPanel() {
  const groups = ['To Do', 'Doing', 'Done'];
  const [active, setActive] = useState('To Do');
  return (
    <div className="space-y-3 w-full lg:w-64 shrink-0">
      {groups.map((g) => (
        <button
          key={g}
          onClick={() => setActive(g)}
          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-semibold transition ${
            active === g ? 'bg-primary-500 text-white shadow-card' : 'bg-white border border-gray-100 text-gray-700 shadow-card'
          }`}
        >
          {g}
          <ChevronRight size={16} className={active === g ? 'text-white' : 'text-gray-300'} />
        </button>
      ))}
    </div>
  );
}

function TimelineView() {
  const totalHeight = ROW_HEIGHT * (HOUR_LABELS.length - 1) + 40;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <TimelineFilterPanel />

      <Card className="flex-1 w-full p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Day scrubber */}
          <div className="grid mb-4" style={{ gridTemplateColumns: `repeat(${DAY_LABELS.length}, minmax(0, 1fr))` }}>
            {DAY_LABELS.map((d, i) => (
              <div key={i} className="flex justify-center">
                <span
                  className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold ${
                    i === ACTIVE_DAY_INDEX ? 'bg-primary-500 text-white' : 'text-gray-400'
                  }`}
                >
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Hour grid + bars */}
          <div className="relative" style={{ height: totalHeight }}>
            {/* hour rows */}
            {HOUR_LABELS.map((h, i) => (
              <div
                key={h}
                className="absolute left-0 right-0 flex items-start"
                style={{ top: i * ROW_HEIGHT }}
              >
                <span className="text-xs text-gray-400 w-20 shrink-0 -translate-y-2">{h}</span>
                <div className="flex-1 border-t border-gray-100" />
              </div>
            ))}

            {/* task bars */}
            {timelineBars.map((bar, i) => (
              <div
                key={i}
                className="absolute bg-white border border-gray-100 shadow-card rounded-2xl px-4 flex items-center gap-3 whitespace-nowrap overflow-hidden"
                style={{
                  top: bar.top,
                  height: bar.height,
                  left: `calc(80px + ${(bar.dayStart / DAY_LABELS.length) * 100}%)`,
                  width: `calc(${(bar.daySpan / DAY_LABELS.length) * 100}% - 8px)`,
                }}
              >
                {bar.done ? (
                  <CheckCircle2 size={18} className="text-primary-500 fill-primary-100 shrink-0" />
                ) : (
                  <Circle size={18} className="text-gray-300 shrink-0" />
                )}
                <span className="text-sm font-semibold text-gray-800 truncate">{bar.name}</span>
                <AvatarStack images={teamAvatars} extra={1} size={22} />
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${bar.tagColor}`}>{bar.tag}</span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 shrink-0">On Track</span>
                <MoreHorizontal size={16} className="text-gray-300 shrink-0 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Tasks() {
  const [tab, setTab] = useState('List');
  const [query, setQuery] = useState('');

  return (
    <div>
      <PageHeader title="Task Preview">
        <button className="btn-primary"><Plus size={16} /> Add Task</button>
      </PageHeader>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex bg-white rounded-xl p-1 border border-gray-100 shadow-card">
          {['List', 'Board', 'Timeline'].map((t) => (
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
        {tab !== 'Timeline' && (
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        )}
        {tab === 'Timeline' && (
          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 shadow-card">
            December 2021 <ChevronDown size={14} className="text-gray-400" />
          </button>
        )}
      </div>

      {tab === 'List' && <ListView />}
      {tab === 'Board' && <BoardView />}
      {tab === 'Timeline' && <TimelineView />}
    </div>
  );
}