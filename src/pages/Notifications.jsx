import { useEffect, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { PageHeader, Card } from '../components/UI';
import { api } from '../api/client';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/notifications')
      .then(setNotifications)
      .catch(() => setError('Could not reach JSON Server. Run "npm run server" on port 4000.'))
      .finally(() => setLoading(false));
  }, []);

  const markAllRead = async () => {
    const previous = notifications;
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
    try {
      await Promise.all(previous.map((n) => api.patch(`/notifications/${n.id}`, { read: true })));
    } catch {
      setNotifications(previous);
    }
  };

  return (
    <div>
      <PageHeader title="Notification">
        <button onClick={markAllRead} className="btn-secondary">
          <CheckCheck size={16} /> Mark all as read
        </button>
      </PageHeader>

      <Card className="p-4 sm:p-6">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Loading notifications…</p>}
        {error && <p className="text-sm text-rose-500 py-10 text-center">{error}</p>}

        {!loading && !error && (
          <div className="divide-y divide-gray-50">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-center gap-4 py-4">
                <div className="relative shrink-0">
                  <img src={n.img} className="w-11 h-11 rounded-full object-cover" alt="" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Bell size={10} className="text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">{n.name}</span> {n.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
