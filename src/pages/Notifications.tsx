import { useState } from 'react';
import { Bell, AlertTriangle, AlertCircle, Info, X, Check, CheckCheck } from 'lucide-react';

interface Notification {
  id: number;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    severity: 'high',
    title: 'Bulk DELETE detected',
    description: '12 organisationUnits removed — this may indicate a mass cleanup or accidental deletion',
    time: '2026-04-09 07:43',
    read: false,
  },
  {
    id: 2,
    severity: 'high',
    title: 'Unauthorized access attempt',
    description: 'User attempted to modify system indicators without proper permissions',
    time: '2026-04-09 05:43',
    read: false,
  },
  {
    id: 3,
    severity: 'medium',
    title: 'Schema change warning',
    description: 'dataSet "Monthly Report" schema changed significantly — 8 fields modified',
    time: '2026-04-09 03:43',
    read: false,
  },
  {
    id: 4,
    severity: 'medium',
    title: 'New categoryCombo created',
    description: 'categoryCombo created with unusual configuration — review recommended',
    time: '2026-04-09 00:43',
    read: true,
  },
  {
    id: 5,
    severity: 'low',
    title: 'Data element name updated',
    description: 'dataElement "ANC 1st Visit" renamed to "ANC 1st Visit (Updated)"',
    time: '2026-04-08 22:10',
    read: true,
  },
  {
    id: 6,
    severity: 'low',
    title: 'User login from new location',
    description: 'User rbrown logged in from a new IP address',
    time: '2026-04-08 18:30',
    read: true,
  },
];

const severityConfig = {
  high: {
    icon: <AlertTriangle size={20} />,
    color: 'text-[#ef4444]',
    bg: 'bg-[#fef2f2]',
    border: 'border-l-[#ef4444]',
    badge: 'bg-[#fee2e2] text-[#ef4444]',
  },
  medium: {
    icon: <AlertCircle size={20} />,
    color: 'text-[#f59e0b]',
    bg: 'bg-[#fffbeb]',
    border: 'border-l-[#f59e0b]',
    badge: 'bg-[#fef3c7] text-[#d97706]',
  },
  low: {
    icon: <Info size={20} />,
    color: 'text-[#22c55e]',
    bg: 'bg-[#f0fdf4]',
    border: 'border-l-[#22c55e]',
    badge: 'bg-[#dcfce7] text-[#16a34a]',
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const dismiss = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">All Notifications</span>
          </div>
          {unreadCount > 0 && (
            <span className="bg-[#ef4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm text-[#3b82f6] hover:text-[#2563eb] font-medium cursor-pointer"
          >
            <CheckCheck size={16} />
            Mark all read
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-[#f1f5f9] p-1 rounded-lg w-fit">
        {(['all', 'unread', 'read'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors cursor-pointer ${
              filter === f ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.map(n => {
          const cfg = severityConfig[n.severity];
          return (
            <div
              key={n.id}
              className={`bg-white rounded-xl border border-[#e2e8f0] border-l-4 ${cfg.border} p-5 flex items-start gap-4 ${
                !n.read ? '' : 'opacity-70'
              }`}
            >
              <div className={`w-9 h-9 rounded-full ${cfg.bg} flex items-center justify-center shrink-0 ${cfg.color}`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${cfg.badge}`}>
                    {n.severity}
                  </span>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
                  )}
                </div>
                <p className="text-sm font-semibold text-[#0f172a]">{n.title}</p>
                <p className="text-xs text-[#64748b] mt-0.5">{n.description}</p>
                <p className="text-xs text-[#94a3b8] mt-1">{n.time}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!n.read && (
                  <button
                    onClick={() => markRead(n.id)}
                    className="p-1.5 text-[#94a3b8] hover:text-[#3b82f6] hover:bg-[#eff6ff] rounded-lg transition-colors cursor-pointer"
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => dismiss(n.id)}
                  className="p-1.5 text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fef2f2] rounded-lg transition-colors cursor-pointer"
                  title="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#94a3b8] text-sm">
            No notifications to show.
          </div>
        )}
      </div>
    </div>
  );
}
