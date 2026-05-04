import { useState, useMemo } from 'react';
import { Users as UsersIcon, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import CardContainer from '../../components/card/CardContainer';
import UserChangesChart from '../../components/users/UserChangesChart';
import UsersList from '../../components/users/UsersList';
import UserDetailPanel from '../../components/users/UserDetailPanel';
import { User } from '../../types/users/users';
import { useGetSuperUsers } from '../../hooks/users/useGetSuperUsers';
import { useGetActiveUsersToday } from '../../hooks/users/useGetActiveUsersToday';
import { useGetTotalUsersCount } from '../../hooks/users/useGetTotalUsersCount';
import { useGetTotalChangesYear } from '../../hooks/users/useGetTotalChangesYear';
import { useGetTop5UsersChanges } from '../../hooks/users/useGetTop5UsersChanges';
import { useGetUsersAuditSummary } from '../../hooks/users/useGetUsersAuditSummary';

const actionColors: Record<string, string> = {
  CREATE: 'bg-[#3b82f6] text-white',
  UPDATE: 'bg-[#fef3c7] text-[#d97706] border border-[#fcd34d]',
  DELETE: 'bg-[#fee2e2] text-[#ef4444] border border-[#fca5a5]',
};

const userActivity = [
  { date: '2026-04-09 08:50', type: 'organisationUnit', object: 'organisationUnit_783', action: 'CREATE' },
  { date: '2026-04-09 07:52', type: 'organisationUnit', object: 'organisationUnit_553', action: 'DELETE' },
  { date: '2026-04-09 07:23', type: 'optionSet', object: 'optionSet_539', action: 'DELETE' },
  { date: '2026-04-09 05:01', type: 'dataElement', object: 'dataElement_945', action: 'UPDATE' },
  { date: '2026-04-09 01:48', type: 'trackedEntityType', object: 'trackedEntityType_276', action: 'CREATE' },
  { date: '2026-04-08 23:15', type: 'organisationUnit', object: 'organisationUnit_291', action: 'UPDATE' },
  { date: '2026-04-08 23:06', type: 'dataSet', object: 'dataSet_649', action: 'DELETE' },
];

export default function UsersPage() {
  const { superUsers, loading: superUsersLoading } = useGetSuperUsers();
  const { activeUsersCount, loading: activeUsersLoading } = useGetActiveUsersToday();
  const { totalUsers: totalUsersCount, loading: totalUsersLoading } = useGetTotalUsersCount();
  const { totalChanges: changesYear, loading: changesYearLoading } = useGetTotalChangesYear();
  const { chartData: topUsersChartData, usernames, loading: chartLoading } = useGetTop5UsersChanges();
  
  // Use the updated audit summary hook with bulk query
  const { auditSummary, loading: summaryLoading, hasMore: hasMoreAudit, loadMore: loadMoreAudit } = useGetUsersAuditSummary(10);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardContainer
          variant="dashboard-card"
          label="USERS ACCESSED TODAY"
          value={activeUsersLoading ? '...' : activeUsersCount?.toString()}
          indicator="+5% vs yesterday"
          indicatorColor="text-[#22c55e]"
          icon={<UsersIcon size={20} className="text-[#3b82f6]" />}
          iconBgColor="bg-[#eff6ff]"
        />
        <CardContainer
          variant="dashboard-card"
          label="TOTAL USERS"
          value={totalUsersLoading ? '...' : totalUsersCount?.toString()}
          indicator="+12% vs last week"
          indicatorColor="text-[#22c55e]"
          icon={<Activity size={20} className="text-[#3b82f6]" />}
          iconBgColor="bg-[#eff6ff]"
        />
        <CardContainer
          variant="dashboard-card"
          label="TOTAL SUPER ADMINS"
          value={superUsersLoading ? '...' : superUsers.length?.toString()}
          indicator="+8% vs last week"
          indicatorColor="text-[#f59e0b]"
          icon={<ShieldCheck size={20} className="text-[#f59e0b]" />}
          iconBgColor="bg-[#fffbeb]"
        />
        <CardContainer
          variant="dashboard-card"
          label="TOTAL CHANGES"
          value={changesYearLoading ? '...' : changesYear?.toString()}
          indicator="Requires review"
          indicatorColor="text-[#ef4444]"
          icon={<AlertTriangle size={20} className="text-[#ef4444]" />}
          iconBgColor="bg-[#fef2f2]"
        />
      </div>

      {/* Line Chart Section */}
      <UserChangesChart 
        data={chartLoading ? [] : topUsersChartData} 
        usernames={chartLoading ? [] : usernames}
      />

      {/* Users List Section */}
      <UsersList
        auditSummary={auditSummary}
        loading={summaryLoading}
        hasMore={hasMoreAudit}
        loadMore={loadMoreAudit}
        onSelectUser={setSelectedUser}
      />

      {/* User Detail Slide-out Panel */}
      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          activities={userActivity}
          actionColors={actionColors}
        />
      )}
    </div>
  );
}
