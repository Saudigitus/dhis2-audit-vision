import { useState } from 'react';
import { Users as UsersIcon, X, ChevronRight } from 'lucide-react';

const users = [
  { name: 'admin', initial: 'A', color: 'bg-[#3b82f6]', role: 'Super Admin', roleColor: 'text-[#ef4444] border-[#fca5a5] bg-[#fef2f2]', status: 'Online', lastActive: '2 minutes ago', changes: 127, email: 'admin@dhis2.org' },
  { name: 'jdoe', initial: 'J', color: 'bg-[#3b82f6]', role: 'Data Manager', roleColor: 'text-[#3b82f6] border-[#93c5fd] bg-[#eff6ff]', status: 'Online', lastActive: '15 minutes ago', changes: 19, email: 'jdoe@dhis2.org' },
  { name: 'asmith', initial: 'A', color: 'bg-[#3b82f6]', role: 'Analyst', roleColor: 'text-[#8b5cf6] border-[#c4b5fd] bg-[#f5f3ff]', status: 'Offline', lastActive: '1 hour ago', changes: 96, email: 'asmith@dhis2.org' },
  { name: 'mwilson', initial: 'M', color: 'bg-[#3b82f6]', role: 'Data Entry', roleColor: 'text-[#f59e0b] border-[#fcd34d] bg-[#fffbeb]', status: 'Offline', lastActive: '3 hours ago', changes: 76, email: 'mwilson@dhis2.org' },
  { name: 'kchan', initial: 'K', color: 'bg-[#3b82f6]', role: 'Analyst', roleColor: 'text-[#8b5cf6] border-[#c4b5fd] bg-[#f5f3ff]', status: 'Online', lastActive: '30 minutes ago', changes: 66, email: 'kchan@dhis2.org' },
  { name: 'rbrown', initial: 'R', color: 'bg-[#3b82f6]', role: 'Data Manager', roleColor: 'text-[#3b82f6] border-[#93c5fd] bg-[#eff6ff]', status: 'Offline', lastActive: '2 hours ago', changes: 98, email: 'rbrown@dhis2.org' },
];

const totalUsers = users.length;
const onlineNow = users.filter(u => u.status === 'Online').length;

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
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);

  return (
    <div className="space-y-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Total Users</div>
            <div className="text-3xl font-bold text-[#0f172a] mt-1">{totalUsers}</div>
            <div className="text-xs text-[#64748b] mt-0.5">{onlineNow} currently online</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center">
            <UsersIcon size={20} className="text-[#3b82f6]" />
          </div>
        </div>
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Online Now</div>
            <div className="text-3xl font-bold text-[#22c55e] mt-1">{onlineNow}</div>
            <div className="flex items-center gap-1 text-xs text-[#64748b] mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
              Active sessions
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center">
            <UsersIcon size={20} className="text-[#22c55e]" />
          </div>
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-2 gap-5">
        {users.map((user, i) => (
          <div
            key={i}
            onClick={() => setSelectedUser(user)}
            className="bg-white rounded-xl border border-[#e2e8f0] p-5 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full ${user.color} flex items-center justify-center text-white text-lg font-bold`}>
                  {user.initial}
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${user.status === 'Online' ? 'bg-[#22c55e]' : 'bg-[#94a3b8]'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#0f172a]">{user.name}</div>
                <div className="text-xs text-[#64748b]">{user.email}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] font-semibold border rounded px-2 py-0.5 ${user.roleColor}`}>
                    {user.role}
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">· {user.lastActive}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
              <span className="text-xs text-[#64748b]">Changes</span>
              <span className="text-lg font-bold text-[#0f172a]">{user.changes}</span>
            </div>
          </div>
        ))}
      </div>

      {/* User Detail Slide-out Panel */}
      {selectedUser && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelectedUser(null)} />
          {/* Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[560px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${selectedUser.color} flex items-center justify-center text-white font-bold`}>
                  {selectedUser.initial}
                </div>
                <div>
                  <div className="text-lg font-bold text-[#0f172a]">{selectedUser.name}</div>
                  <div className="text-xs text-[#64748b]">{selectedUser.role}</div>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-1.5 hover:bg-[#f1f5f9] rounded-lg cursor-pointer">
                <X size={20} className="text-[#64748b]" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Summary badges */}
              <div className="flex items-center gap-2 flex-wrap mb-5">
                <span className="text-xs font-bold px-3 py-1 rounded border border-[#3b82f6] text-[#3b82f6]">CREATE  2</span>
                <span className="text-xs font-bold px-3 py-1 rounded border border-[#d97706] text-[#d97706]">UPDATE  2</span>
                <span className="text-xs font-bold px-3 py-1 rounded border border-[#ef4444] text-[#ef4444]">DELETE  3</span>
                <span className="text-xs font-medium px-3 py-1 rounded border border-[#e2e8f0] text-[#0f172a]">Total  7</span>
              </div>

              {/* Activity section */}
              <div className="mb-3">
                <div className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider mb-1">
                  All Activity — Click row to expand
                </div>
              </div>

              {/* Activity Table */}
              <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Date</th>
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Type</th>
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Object</th>
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Action</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userActivity.map((row, i) => (
                      <tr key={i} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] cursor-pointer">
                        <td className="px-4 py-3 text-xs text-[#64748b]">{row.date}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono bg-[#f1f5f9] px-1.5 py-0.5 rounded text-[#475569]">{row.type}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#0f172a]">{row.object}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${actionColors[row.action]}`}>
                            {row.action}
                          </span>
                        </td>
                        <td className="px-2 py-3">
                          <ChevronRight size={14} className="text-[#94a3b8]" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
