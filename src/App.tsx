import { useState } from 'react';
import Sidebar, { type Page } from './components/Sidebar';
import Header from './components/Header';
import GlobalAuditFilter, { type AuditFilterState } from './components/GlobalAuditFilter';
import Dashboard from './pages/Dashboard';
import ChangeExplorer from './pages/ChangeExplorer';
import Alerts from './pages/Alerts';
import Trends from './pages/Trends';
import UsersPage from './pages/Users';
import UserAuditPage from './pages/UserAudit';
import SystemHealth from './pages/SystemHealth';
import SecurityAudit from './pages/SecurityAudit';
import Documentation from './pages/Documentation';
import NotificationsPage from './pages/Notifications';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';

const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard',
  'change-explorer': 'Change Explorer',
  'monitoring-groups': 'Monitoring Groups',
  'system-health': 'System Health Audit',
  'security-audit': 'Security & Access Audit',
  documentation: 'Help & Documentation',
  alerts: 'Alerts',
  trends: 'Trends & Analytics',
  users: 'Users',
  'user-audit': 'User Audit Trail',
  notifications: 'Notifications',
  profile: 'Profile',
  settings: 'Settings',
};

function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [auditFilter, setAuditFilter] = useState<AuditFilterState>({
    domain: 'metadata',
    objectType: 'All',
    period: '30d',
    customFrom: '',
    customTo: '',
  });

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'change-explorer':
        return <ChangeExplorer />;
      case 'system-health':
        return <SystemHealth />;
      case 'security-audit':
        return <SecurityAudit />;
      case 'documentation':
        return <Documentation />;
      case 'alerts':
        return <Alerts />;
      case 'trends':
        return <Trends />;
      case 'users':
        return <UsersPage />;
      case 'user-audit':
        return <UserAuditPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 ml-[236px] flex flex-col overflow-hidden">
        <Header title={pageTitles[activePage]} />
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6">
          <div className="mb-6 flex justify-end">
            <GlobalAuditFilter value={auditFilter} onChange={setAuditFilter} />
          </div>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
