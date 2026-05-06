import { useEffect, useState } from 'react';
import { CircularLoader } from '@dhis2/ui';
import { useParams } from '../hooks/common/useQueryParams';
import CardContainer from '../components/card/CardContainer';
import GlobalAuditFilter from '../components/GlobalAuditFilter';
import { useGetDashboardData } from '../hooks/dashboard/useGetDashboardData';
import { TrendingUp, AlertTriangle, ShieldCheck, Activity, LayoutDashboard } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from 'recharts';
import { mapChangesByType } from '../utils/formater/dashboardDataFormater';


const stats = ({ changesToday, totalChanges, riskChanges, totalUpdates }: { changesToday: any, totalChanges: any, riskChanges: any, totalUpdates: any }) => ([
  { label: 'TOTAL CHANGES TODAY', value: changesToday, change: '+5% vs yesterday', changeColor: 'text-[#22c55e]', icon: <TrendingUp size={20} className="text-[#3b82f6]" />, iconBg: 'bg-[#eff6ff]' },
  { label: 'TOTAL CHANGES', value: totalChanges, change: '+12% vs last week', changeColor: 'text-[#22c55e]', icon: <Activity size={20} className="text-[#3b82f6]" />, iconBg: 'bg-[#eff6ff]' },
  { label: 'TOTAL UPDATES', value: totalUpdates, change: '+8% vs last week', changeColor: 'text-[#f59e0b]', icon: <ShieldCheck size={20} className="text-[#f59e0b]" />, iconBg: 'bg-[#fffbeb]' },
  { label: 'TOTAL RISK CHANGES', value: riskChanges, change: 'Requires review', changeColor: 'text-[#ef4444]', icon: <AlertTriangle size={20} className="text-[#ef4444]" />, iconBg: 'bg-[#fef2f2]', cardBg: 'bg-[#fef2f2] border-[#fecaca]' },
]);

export type DashboardData = {
  riskChanges: number;
  todayChanges: number;
  totalUpdates: number;
  totalChanges: number;

  changesByType: {
    value: number;
    name: string;
    color: string;
  }[];

  changesOverTime: {
    name: string;
    value: number;
  }[];

  mostActiveUsers: {
    name: string;
    CREATE: number;
    UPDATE: number;
    DELETE: number;
  }[];
};


export default function Dashboard() {
  const { startDate, endDate } = useParams()
  const { getDashboardData, loading, data } = useGetDashboardData()

  useEffect(() => {
    if (!startDate || !endDate)
      return;
    getDashboardData({ startDate: startDate!, endDate: endDate! })
  }, [startDate, endDate])

  return (
    <div className="space-y-5">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <GlobalAuditFilter />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats({
          changesToday: data?.todayChanges,
          totalChanges: data?.totalChanges,
          riskChanges: data?.riskChanges,
          totalUpdates: data?.totalUpdates,
        }).map((s, i) => (
          <>
            <CardContainer
              key={s?.value}
              icon={s.icon}
              indicator={''}
              label={s.label}
              value={s.value}
              loading={loading}
              variant='dashboard-card'
              iconBgColor={s.iconBg}
              indicatorColor={s.changeColor}
            />
          </>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Line Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Changes Over Time</h3>
          <ResponsiveContainer width="100%" height={280} className={loading ? 'flex justify-center items-center' : ''}>
            {
              loading ?
                <CircularLoader small />
                :
                <LineChart data={data?.changesOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} domain={[0, 60]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 1, fill: '#3b82f6' }} activeDot={{ r: 1 }} />
                </LineChart>
            }
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-2">Changes by Type</h3>
          <ResponsiveContainer width="100%" height={280} className={loading ? 'flex justify-center items-center' : ''}>
            {
              loading ?
                <CircularLoader small />
                :
                <PieChart>
                  <Pie
                    data={data?.changesByType}
                    cx="50%"
                    cy="45%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={2}
                    dataKey="value"
                    style={{ fontSize: 10 }}
                    label={({ name, value }) => `${name} ${value}`}
                  >
                    {data?.changesByType?.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    formatter={(value: string) => <span className="text-xs text-[#64748b]">{value}</span>}
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
            }
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Active Users Actions */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
        <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Most Active Users Actions</h3>
        <ResponsiveContainer width="100%" height={300} className={loading ? 'flex justify-center items-center' : ''}>
          {
            loading ?
              <CircularLoader small />
              :
              <BarChart
                layout="vertical"
                data={data?.mostActiveUsers as any}
                stackOffset="expand"
                barCategoryGap="20%"
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}

              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(tick) => `${tick * 100}%`} />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value,) => typeof value === 'number' ? `${value.toFixed(1)}` : ''} />
                <Legend />
                <Bar dataKey="CREATE" fill="#3b82f6" stackId="a" />
                <Bar dataKey="UPDATE" fill="#f59e0b" stackId="a" />
                <Bar dataKey="DELETE" fill="#ef4444" stackId="a" />
              </BarChart>
          }
        </ResponsiveContainer>
      </div>
    </div>
  );
}
