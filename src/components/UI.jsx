import * as Icons from 'lucide-react';

export function PageHeader({ title, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h1 className="page-title">{title}</h1>
      {children && <div className="flex items-center gap-3 flex-wrap">{children}</div>}
    </div>
  );
}

export function StatCard({ label, value, icon, bg, fg, delta }) {
  const Icon = Icons[icon] || Icons.Circle;
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
        <Icon size={20} className={fg} />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-lg font-bold text-gray-900">{value}</p>
          {delta && <span className="text-xs font-medium text-emerald-500">{delta}</span>}
        </div>
        <p className="text-sm text-gray-400 truncate">{label}</p>
      </div>
    </div>
  );
}

const statusStyles = {
  Complete: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-600',
  Cancel: 'bg-rose-50 text-rose-600',
  Running: 'bg-primary-500 text-white',
  Done: 'bg-emerald-500 text-white',
  'On Track': 'bg-amber-100 text-amber-700',
};

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

export function AvatarStack({ images = [], extra = 0, size = 28 }) {
  return (
    <div className="flex items-center -space-x-2">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          style={{ width: size, height: size }}
          className="rounded-full border-2 border-white object-cover"
        />
      ))}
      {extra > 0 && (
        <span
          style={{ width: size, height: size }}
          className="rounded-full border-2 border-white bg-primary-500 text-white text-[10px] font-semibold flex items-center justify-center"
        >
          +{extra}
        </span>
      )}
    </div>
  );
}

export function IconButton({ children, className = '', ...props }) {
  return (
    <button
      className={`w-9 h-9 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className = '', children }) {
  return <div className={`card ${className}`}>{children}</div>;
}
