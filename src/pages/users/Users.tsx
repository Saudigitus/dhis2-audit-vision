import { useState } from 'react';
import { User } from '../../types/users/users';
import UsersList from '../../components/users/UsersList';
import CardContainer from '../../components/card/CardContainer';
import GlobalAuditFilter from '../../components/GlobalAuditFilter';
import UserDetailPanel from '../../components/users/UserDetailPanel';
import { useGetSuperUsers } from '../../hooks/users/useGetSuperUsers';
import UserChangesChart from '../../components/users/UserChangesChart';
import { useGetTotalUsersCount } from '../../hooks/users/useGetTotalUsersCount';
import { useGetActiveUsersToday } from '../../hooks/users/useGetActiveUsersToday';
import { useGetTotalChangesYear } from '../../hooks/users/useGetTotalChangesYear';
import { useGetTop5UsersChanges } from '../../hooks/users/useGetTop5UsersChanges';
import { useGetUsersAuditSummary } from '../../hooks/users/useGetUsersAuditSummary';
import { Users as UsersIcon, Activity, ShieldCheck, AlertTriangle, Shield } from 'lucide-react';

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
    <div className="space-y-5">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">User Audit</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <GlobalAuditFilter />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardContainer
          loading={activeUsersLoading}
          variant="dashboard-card"
          label="USERS ACCESSED TODAY"
          value={activeUsersLoading ? '...' : activeUsersCount?.toString()}
          indicator={""}
          indicatorColor="text-[#22c55e]"
          icon={<UsersIcon size={20} className="text-[#3b82f6]" />}
          iconBgColor="bg-[#eff6ff]"
        />
        <CardContainer
          loading={totalUsersLoading}
          variant="dashboard-card"
          label="TOTAL USERS"
          value={totalUsersLoading ? '...' : totalUsersCount?.toString()}
          indicator={""}
          indicatorColor="text-[#22c55e]"
          icon={<Activity size={20} className="text-[#3b82f6]" />}
          iconBgColor="bg-[#eff6ff]"
        />
        <CardContainer
          loading={superUsersLoading}
          variant="dashboard-card"
          label="TOTAL SUPER ADMINS"
          value={superUsersLoading ? '...' : superUsers.length?.toString()}
          indicator={""}
          indicatorColor="text-[#f59e0b]"
          icon={<ShieldCheck size={20} className="text-[#f59e0b]" />}
          iconBgColor="bg-[#fffbeb]"
        />
        <CardContainer
          loading={changesYearLoading}
          variant="dashboard-card"
          label="TOTAL CHANGES"
          value={changesYearLoading ? '...' : changesYear?.toString()}
          indicator={""}
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
