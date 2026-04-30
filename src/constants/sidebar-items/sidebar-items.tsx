import {
  LayoutDashboard, Search, Bell, TrendingUp, Users, Settings, Shield, MessageSquare, UserCircle, Activity, Lock, BookOpen, Layers,
  Group, AlertTriangle,
} from 'lucide-react';

const navItems: { id: string; label: string; icon: any; path: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'change-explorer', label: 'Change Explorer', icon: Search, path: '/change-explorer' },
  { id: 'metadata-grouping', label: 'Metadata Grouping', icon: Group, path: '/metadata-grouping' },
  { id: 'users', label: 'User Audit', icon: Shield, path: '/users' },
  // { id: 'monitoring-groups', label: 'Monitoring Groups', icon: Layers,path: '/monitoring-groups' },
  // { id: 'system-health', label: 'System Health', icon: Activity,path: '/system-health' },
  // { id: 'security-audit', label: 'Security Audit', icon: Lock,path: '/security-audit' },
  // { id: 'documentation', label: 'Documentation', icon: BookOpen, path: '/documentation' },
  // { id: 'alerts', label: 'Alerts', icon: Bell,path: '/alerts' },
  // { id: 'trends', label: 'Trends', icon: TrendingUp,path: '/trends' },
  // { id: 'users', label: 'Users', icon: Users,path: '/users' },
  { id: 'severity-rules', label: 'Severity Rules', icon: AlertTriangle, path: '/severity-rules' },
  // { id: 'notifications', label: 'Notifications', icon: MessageSquare, path: '/notifications' },
  // { id: 'profile', label: 'Profile', icon: UserCircle,path: '/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
]

const sidebarData = (hasURL: boolean) => {
  return hasURL ? navItems : navItems?.filter(x => x.id == 'settings')
}

export { sidebarData }