import CardContainer from '../components/card/CardContainer';
import { TrendingUp, AlertTriangle, Eye, ShieldCheck, Activity } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar, Rectangle,
} from 'recharts';

const userActivityData = [
  { name: 'Alice', CREATE: 30, UPDATE: 50, DELETE: 20 },
  { name: 'Bob', CREATE: 40, UPDATE: 30, DELETE: 30 },
  { name: 'Charlie', CREATE: 25, UPDATE: 45, DELETE: 30 },
  { name: 'David', CREATE: 50, UPDATE: 20, DELETE: 30 },
  { name: 'Eve', CREATE: 35, UPDATE: 40, DELETE: 25 },
  { name: 'Frank', CREATE: 20, UPDATE: 60, DELETE: 20 },
  { name: 'Grace', CREATE: 45, UPDATE: 25, DELETE: 30 },
  { name: 'Heidi', CREATE: 30, UPDATE: 30, DELETE: 40 },
  { name: 'Ivan', CREATE: 55, UPDATE: 30, DELETE: 15 },
  { name: 'Judy', CREATE: 25, UPDATE: 55, DELETE: 20 },
];

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
  { label: 'TOTAL CHANGES TODAY', value: '15', change: '+5% vs yesterday', changeColor: 'text-[#22c55e]', icon: <TrendingUp size={20} className="text-[#3b82f6]" />, iconBg: 'bg-[#eff6ff]' },
  { label: 'TOTAL CHANGES', value: '50', change: '+12% vs last week', changeColor: 'text-[#22c55e]', icon: <Activity size={20} className="text-[#3b82f6]" />, iconBg: 'bg-[#eff6ff]' },
  { label: 'TOTAL UPDATES', value: '25', change: '+8% vs last week', changeColor: 'text-[#f59e0b]', icon: <ShieldCheck size={20} className="text-[#f59e0b]" />, iconBg: 'bg-[#fffbeb]' },
  { label: 'TOTAL RISK CHANGES', value: '21', change: 'Requires review', changeColor: 'text-[#ef4444]', icon: <AlertTriangle size={20} className="text-[#ef4444]" />, iconBg: 'bg-[#fef2f2]', cardBg: 'bg-[#fef2f2] border-[#fecaca]' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <>
            <CardContainer
              key={i}
              icon={s.icon}
              variant='dashboard-card'
              indicator={s.change}
              label={s.label}
              value={s.value}
              iconBgColor={s.iconBg}
              indicatorColor={s.changeColor}
            />
            {/* <div
              key={i}
              className={`rounded-xl border p-5 flex items-start justify-between ${s.cardBg || 'bg-white border-[#e2e8f0]'
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
            </div> */}
          </>
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

      {/* Most Active Users Actions */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
        <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Most Active Users Actions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={userActivityData}
            stackOffset="expand"
            barCategoryGap="20%"
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(tick) => `${tick * 100}%`} />
            <YAxis dataKey="name" type="category" />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
            <Legend />
            <Bar dataKey="CREATE" fill="#3b82f6" stackId="a" />
            <Bar dataKey="UPDATE" fill="#f59e0b" stackId="a" />
            <Bar dataKey="DELETE" fill="#ef4444" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
