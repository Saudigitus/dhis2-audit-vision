import { Shield } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';

const changesPerDay = [
  { name: 'Mar 11', value: 28 },
  { name: 'Mar 12', value: 32 },
  { name: 'Mar 13', value: 25 },
  { name: 'Mar 14', value: 30 },
  { name: 'Mar 15', value: 35 },
  { name: 'Mar 16', value: 28 },
  { name: 'Mar 17', value: 22 },
  { name: 'Mar 18', value: 25 },
  { name: 'Mar 19', value: 45 },
  { name: 'Mar 20', value: 48 },
  { name: 'Mar 21', value: 42 },
  { name: 'Mar 22', value: 46 },
  { name: 'Mar 23', value: 40 },
  { name: 'Mar 24', value: 38 },
  { name: 'Mar 25', value: 42 },
  { name: 'Mar 26', value: 45 },
  { name: 'Mar 27', value: 38 },
  { name: 'Mar 28', value: 35 },
  { name: 'Mar 29', value: 40 },
  { name: 'Mar 30', value: 38 },
  { name: 'Mar 31', value: 42 },
  { name: 'Apr 01', value: 35 },
  { name: 'Apr 02', value: 30 },
  { name: 'Apr 03', value: 38 },
  { name: 'Apr 04', value: 25 },
  { name: 'Apr 05', value: 15 },
  { name: 'Apr 06', value: 28 },
  { name: 'Apr 07', value: 20 },
  { name: 'Apr 08', value: 8 },
];

const metadataTypes = [
  { name: 'organisationUnit', value: 85 },
  { name: 'dataElement', value: 78 },
  { name: 'program', value: 72 },
  { name: 'categoryCombo', value: 65 },
  { name: 'trackedEntityType', value: 55 },
  { name: 'indicator', value: 48 },
  { name: 'dataSet', value: 35 },
];

const activeUsers = [
  { rank: 1, name: 'rbrown', initial: 'R', color: 'bg-[#7c3aed]', changes: 98 },
  { rank: 2, name: 'asmith', initial: 'A', color: 'bg-[#3b82f6]', changes: 96 },
  { rank: 3, name: 'admin', initial: 'A', color: 'bg-[#3b82f6]', changes: 71 },
  { rank: 4, name: 'kchan', initial: 'K', color: 'bg-[#3b82f6]', changes: 66 },
  { rank: 5, name: 'mwilson', initial: 'M', color: 'bg-[#3b82f6]', changes: 29 },
];

export default function Trends() {
  const maxChanges = Math.max(...activeUsers.map(u => u.changes));

  return (
    <div className="space-y-5">
      {/* Top Row - Line Chart + Stability Score */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Changes per Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={changesPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                domain={[0, 60]}
              />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stability Score */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#eff6ff] flex items-center justify-center mb-4">
            <Shield size={26} className="text-[#3b82f6]" />
          </div>
          <div className="text-[11px] font-semibold tracking-widest text-[#94a3b8] uppercase mb-2">
            System Stability Score
          </div>
          <div className="text-5xl font-bold text-[#22c55e] mb-1">87</div>
          <div className="text-sm font-semibold text-[#22c55e]">Healthy</div>
        </div>
      </div>

      {/* Bottom Row - Bar Chart + Most Active Users */}
      <div className="grid grid-cols-5 gap-5">
        {/* Most Modified Metadata Types */}
        <div className="col-span-3 bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Most Modified Metadata Types</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={metadataTypes} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                width={120}
              />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {metadataTypes.map((_, index) => (
                  <Cell key={index} fill="#3b82f6" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Most Active Users */}
        <div className="col-span-2 bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Most Active Users</h3>
          <div className="space-y-4">
            {activeUsers.map((user) => (
              <div key={user.rank} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#94a3b8] w-6">#{user.rank}</span>
                <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {user.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#0f172a]">{user.name}</span>
                    <span className="text-xs text-[#64748b]">{user.changes} changes</span>
                  </div>
                  <div className="h-1.5 bg-[#e2e8f0] rounded-full">
                    <div
                      className="h-full bg-[#1d4ed8] rounded-full"
                      style={{ width: `${(user.changes / maxChanges) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
