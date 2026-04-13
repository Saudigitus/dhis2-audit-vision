import { TrendingUp, AlertTriangle, Eye, ShieldCheck, Activity } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const lineData = [
  { name: 'Mar 27', value: 42 },
  { name: 'Mar 28', value: 24 },
  { name: 'Mar 29', value: 28 },
  { name: 'Mar 30', value: 25 },
  { name: 'Mar 31', value: 45 },
  { name: 'Apr 01', value: 46 },
  { name: 'Apr 02', value: 38 },
  { name: 'Apr 03', value: 25 },
  { name: 'Apr 04', value: 45 },
  { name: 'Apr 05', value: 40 },
  { name: 'Apr 06', value: 38 },
  { name: 'Apr 07', value: 35 },
  { name: 'Apr 08', value: 28 },
  { name: 'Apr 09', value: 34 },
];

const pieData = [
  { name: 'CREATE', value: 27, color: '#3b82f6' },
  { name: 'UPDATE', value: 63, color: '#f59e0b' },
  { name: 'DELETE', value: 10, color: '#ef4444' },
];

const recentActivity = [
  { time: '2026-04-09 08:38', user: 'admin', type: 'dataSet', action: 'CREATE' },
  { time: '2026-04-09 08:22', user: 'kchan', type: 'categoryCombo', action: 'UPDATE' },
  { time: '2026-04-09 08:12', user: 'rbrown', type: 'indicator', action: 'UPDATE' },
  { time: '2026-04-09 07:50', user: 'asmith', type: 'dataSet', action: 'CREATE' },
  { time: '2026-04-09 07:35', user: 'mwilson', type: 'dataElement', action: 'DELETE' },
  { time: '2026-04-09 07:27', user: 'admin', type: 'dataElement', action: 'CREATE' },
  { time: '2026-04-09 07:07', user: 'mwilson', type: 'categoryCombo', action: 'DELETE' },
  { time: '2026-04-09 06:54', user: 'admin', type: 'program', action: 'DELETE' },
];

const actionColors: Record<string, string> = {
  CREATE: 'bg-[#3b82f6] text-white',
  UPDATE: 'bg-[#fef3c7] text-[#d97706] border border-[#fcd34d]',
  DELETE: 'bg-[#fee2e2] text-[#ef4444] border border-[#fca5a5]',
};

const stats = [
  { label: 'TOTAL CHANGES', value: '50', change: '+12% vs last week', changeColor: 'text-[#22c55e]', icon: <TrendingUp size={20} className="text-[#3b82f6]" />, iconBg: 'bg-[#eff6ff]' },
  { label: 'SYSTEM HEALTH', value: '92%', change: 'Healthy', changeColor: 'text-[#22c55e]', icon: <Activity size={20} className="text-[#3b82f6]" />, iconBg: 'bg-[#eff6ff]' },
  { label: 'SECURITY SCORE', value: '88/100', change: '8 high risk issues', changeColor: 'text-[#ef4444]', icon: <ShieldCheck size={20} className="text-[#3b82f6]" />, iconBg: 'bg-[#eff6ff]' },
  { label: 'HIGH RISK CHANGES', value: '21', change: 'Requires review', changeColor: 'text-[#ef4444]', icon: <AlertTriangle size={20} className="text-[#ef4444]" />, iconBg: 'bg-[#fef2f2]', cardBg: 'bg-[#fef2f2] border-[#fecaca]' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-xl border p-5 flex items-start justify-between ${
              s.cardBg || 'bg-white border-[#e2e8f0]'
            }`}
          >
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">{s.label}</div>
              <div className="text-3xl font-bold text-[#0f172a] mt-1">{s.value}</div>
              {s.change && <div className={`text-xs mt-1 ${s.changeColor}`}>{s.change}</div>}
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.iconBg}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-5">
        {/* Line Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Changes Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} domain={[0, 60]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-2">Changes by Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                formatter={(value: string) => <span className="text-sm text-[#64748b]">{value}</span>}
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-[#e2e8f0]">
        <div className="px-6 py-4 border-b border-[#e2e8f0]">
          <h3 className="font-bold text-[15px] text-[#0f172a]">Recent Activity</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Time</th>
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">User</th>
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Metadata Type</th>
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Action</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, i) => (
              <tr key={i} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]">
                <td className="px-6 py-3.5 text-sm text-[#64748b]">{row.time}</td>
                <td className="px-6 py-3.5 text-sm font-semibold text-[#0f172a]">{row.user}</td>
                <td className="px-6 py-3.5">
                  <span className="text-sm font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">{row.type}</span>
                </td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs font-bold px-3 py-1 rounded ${actionColors[row.action]}`}>
                    {row.action}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <Eye size={16} className="text-[#94a3b8] cursor-pointer hover:text-[#64748b]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
