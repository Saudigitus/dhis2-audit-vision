import { useState, useRef, useEffect } from 'react';
import { Download, Moon, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const notifications = [
  {
    title: 'Bulk DELETE detected',
    desc: '12 organisationUnits removed — 1h ago',
  },
  {
    title: 'Unauthorized access attempt',
    desc: 'System indicators — 3h ago',
  },
  {
    title: 'Schema change warning',
    desc: 'dataSet "Monthly Report" — 5h ago',
  },
];

export default function Header({ title }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-[#0f172a]">{title}</h1>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f0fdf4] border border-[#bcf0da] rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
          <span className="text-[10px] font-bold text-[#16a34a] uppercase tracking-wider">Live Demo</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Export */}
        <button className="flex items-center gap-2 px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer">
          <Download size={16} />
          Export
        </button>

        {/* Dark mode */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9] transition-colors cursor-pointer">
          <Moon size={18} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9] transition-colors relative cursor-pointer"
          >
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#ef4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {showNotif && (
            <div className="absolute right-0 top-11 w-[320px] bg-white rounded-lg shadow-lg border border-[#e2e8f0] py-3 z-50">
              <div className="px-4 pb-2 font-semibold text-[15px] text-[#0f172a]">Notifications</div>
              {notifications.map((n, i) => (
                <div key={i} className="px-4 py-2.5 hover:bg-[#f8fafc] cursor-pointer">
                  <div className="font-semibold text-sm text-[#0f172a]">{n.title}</div>
                  <div className="text-xs text-[#64748b] mt-0.5">{n.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            <User size={18} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-11 w-[200px] bg-white rounded-lg shadow-lg border border-[#e2e8f0] py-2 z-50">
              <div className="px-4 py-2 border-b border-[#e2e8f0]">
                <div className="font-semibold text-sm text-[#0f172a]">Admin User</div>
                <div className="text-xs text-[#64748b]">admin@dhis2.org</div>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer">Profile</button>
              <button className="w-full text-left px-4 py-2 text-sm text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
