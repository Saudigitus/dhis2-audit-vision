import { useState } from 'react';
import { Users as UsersIcon, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import CardContainer from '../../components/card/CardContainer';
import UserChangesChart from '../../components/users/UserChangesChart';
import UserCard from '../../components/users/UserCard';
import UserDetailPanel from '../../components/users/UserDetailPanel';
import { User } from '../../types/users/users';
import { useGetSuperUsers } from '../../hooks/users/useGetSuperUsers';
import { useGetActiveUsersToday } from '../../hooks/users/useGetActiveUsersToday';
import { useGetTotalUsersCount } from '../../hooks/users/useGetTotalUsersCount';
import { useGetTotalChangesYear } from '../../hooks/users/useGetTotalChangesYear';
import { useGetTop5UsersChanges } from '../../hooks/users/useGetTop5UsersChanges';

const users: User[] = [
  { name: 'admin', initial: 'A', color: 'bg-[#3b82f6]', role: 'Super Admin', roleColor: 'text-[#ef4444] border-[#fca5a5] bg-[#fef2f2]', status: 'Online', lastActive: '2 minutes ago', changes: 127, email: 'admin@dhis2.org' },
  { name: 'jdoe', initial: 'J', color: 'bg-[#3b82f6]', role: 'Data Manager', roleColor: 'text-[#3b82f6] border-[#93c5fd] bg-[#eff6ff]', status: 'Online', lastActive: '15 minutes ago', changes: 19, email: 'jdoe@dhis2.org' },
  { name: 'asmith', initial: 'A', color: 'bg-[#3b82f6]', role: 'Analyst', roleColor: 'text-[#8b5cf6] border-[#c4b5fd] bg-[#f5f3ff]', status: 'Offline', lastActive: '1 hour ago', changes: 96, email: 'asmith@dhis2.org' },
  { name: 'mwilson', initial: 'M', color: 'bg-[#3b82f6]', role: 'Data Entry', roleColor: 'text-[#f59e0b] border-[#fcd34d] bg-[#fffbeb]', status: 'Offline', lastActive: '3 hours ago', changes: 76, email: 'mwilson@dhis2.org' },
  { name: 'kchan', initial: 'K', color: 'bg-[#3b82f6]', role: 'Analyst', roleColor: 'text-[#8b5cf6] border-[#c4b5fd] bg-[#f5f3ff]', status: 'Online', lastActive: '30 minutes ago', changes: 66, email: 'kchan@dhis2.org' },
  { name: 'rbrown', initial: 'R', color: 'bg-[#3b82f6]', role: 'Data Manager', roleColor: 'text-[#3b82f6] border-[#93c5fd] bg-[#eff6ff]', status: 'Offline', lastActive: '2 hours ago', changes: 98, email: 'rbrown@dhis2.org' },
];

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
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardContainer
          variant="dashboard-card"
          label="USERS ACCESSED TODAY"
          value={activeUsersLoading ? '...' : activeUsersCount.toString()}
          indicator="+5% vs yesterday"
          indicatorColor="text-[#22c55e]"
          icon={<UsersIcon size={20} className="text-[#3b82f6]" />}
          iconBgColor="bg-[#eff6ff]"
        />
        <CardContainer
          variant="dashboard-card"
          label="TOTAL USERS"
          value={totalUsersLoading ? '...' : totalUsersCount.toString()}
          indicator="+12% vs last week"
          indicatorColor="text-[#22c55e]"
          icon={<Activity size={20} className="text-[#3b82f6]" />}
          iconBgColor="bg-[#eff6ff]"
        />
        <CardContainer
          variant="dashboard-card"
          label="TOTAL SUPER ADMINS"
          value={superUsersLoading ? '...' : superUsers.length.toString()}
          indicator="+8% vs last week"
          indicatorColor="text-[#f59e0b]"
          icon={<ShieldCheck size={20} className="text-[#f59e0b]" />}
          iconBgColor="bg-[#fffbeb]"
        />
        <CardContainer
          variant="dashboard-card"
          label="TOTAL CHANGES"
          value={changesYearLoading ? '...' : changesYear.toString()}
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

      {/* Existing User Cards (Original) */}
      <div className="pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-5">
          {superUsers.length > 0 ? (
            superUsers.map((u, i) => {
              const mappedUser: User = {
                name: u.name,
                initial: u.name.charAt(0).toUpperCase(),
                color: 'bg-[#3b82f6]',
                role: u.userCredentials?.userRoles?.[0]?.name || 'Super Admin',
                roleColor: 'text-[#ef4444] border-[#fca5a5] bg-[#fef2f2]',
                status: u.userCredentials?.lastLogin ? 'Online' : 'Offline',
                lastActive: u.userCredentials?.lastLogin ? new Date(u.userCredentials.lastLogin).toLocaleDateString() : 'Never',
                changes: 0,
                email: u.email || `${u.userCredentials?.username || 'user'}@dhis2.org`
              };
              return <UserCard key={i} user={mappedUser} onClick={setSelectedUser} />;
            })
          ) : (
            users.map((user, i) => (
              <UserCard key={i} user={user} onClick={setSelectedUser} />
            ))
          )}
        </div>
      </div>

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
