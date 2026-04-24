import {
  LayoutDashboard, Search, Bell, TrendingUp, Users, Settings, Shield, MessageSquare, UserCircle, Activity, Lock, BookOpen, Layers,
} from 'lucide-react';

const navItems: { id: string; label: string; icon: React.ReactNode; path: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { id: 'change-explorer', label: 'Change Explorer', icon: <Search size={20} />, path: '/change-explorer' },
  // { id: 'monitoring-groups', label: 'Monitoring Groups', icon: <Layers size={20} />, path: '/monitoring-groups' },
  // { id: 'system-health', label: 'System Health', icon: <Activity size={20} />, path: '/system-health' },
  // { id: 'security-audit', label: 'Security Audit', icon: <Lock size={20} />, path: '/security-audit' },
  { id: 'documentation', label: 'Documentation', icon: <BookOpen size={20} />, path: '/documentation' },
  // { id: 'alerts', label: 'Alerts', icon: <Bell size={20} />, path: '/alerts' },
  // { id: 'trends', label: 'Trends', icon: <TrendingUp size={20} />, path: '/trends' },
  // { id: 'users', label: 'Users', icon: <Users size={20} />, path: '/users' },
  { id: 'users', label: 'User Audit', icon: <Shield size={20} />, path: '/users' },
  { id: 'notifications', label: 'Notifications', icon: <MessageSquare size={20} />, path: '/notifications' },
  // { id: 'profile', label: 'Profile', icon: <UserCircle size={20} />, path: '/profile' },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
]

const sidebarData = () => {
  return navItems
}

export { sidebarData }