import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  Users,
  Settings,
  ChevronLeft,
  Shield,
  MessageSquare,
  UserCircle,
  Activity,
  Lock,
  BookOpen,
  Layers,
} from 'lucide-react';

export type Page = 'dashboard' | 'change-explorer' | 'monitoring-groups' | 'alerts' | 'trends' | 'users' | 'user-audit' | 'system-health' | 'security-audit' | 'documentation' | 'notifications' | 'profile' | 'settings';

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'change-explorer', label: 'Change Explorer', icon: <Search size={20} /> },
    { id: 'monitoring-groups', label: 'Monitoring Groups', icon: <Layers size={20} /> },
    { id: 'system-health', label: 'System Health', icon: <Activity size={20} /> },
    { id: 'security-audit', label: 'Security Audit', icon: <Lock size={20} /> },
    { id: 'documentation', label: 'Documentation', icon: <BookOpen size={20} /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell size={20} /> },
    { id: 'trends', label: 'Trends', icon: <TrendingUp size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'user-audit', label: 'User Audit', icon: <Shield size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <MessageSquare size={20} /> },
    { id: 'profile', label: 'Profile', icon: <UserCircle size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 w-[236px] bg-[#0f172a] flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        {/* <div className="w-9 h-9 rounded-lg bg-[#3b82f6] flex items-center justify-center">
          <Shield size={20} className="text-white" />
        </div> */}
        <div>
          <div className="text-white font-semibold text-[15px] leading-tight">DHIS2 Audit Vision</div>
          {/* <div className="text-[#64748b] text-[11px] tracking-wider uppercase">DHIS2 Monitor</div> */}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Connect Button */}
      <div className="px-3 py-4 border-t border-[#1e293b]">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3b82f6] text-white rounded-xl text-sm font-bold hover:bg-[#2563eb] transition-all cursor-pointer shadow-lg shadow-[#3b82f6]/20">
          <Activity size={16} />
          Connect Instance
        </button>
      </div>

      {/* Collapse button */}
      <div className="px-3 py-4">
        <button className="w-full flex items-center justify-center py-2 text-[#64748b] hover:text-white transition-colors cursor-pointer">
          <ChevronLeft size={18} />
        </button>
      </div>
    </aside>
  );
}
