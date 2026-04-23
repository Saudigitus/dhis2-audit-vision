import ActivityTable from '../components/activityTable/ActivityTable';
import AuditTable from '../components/AuditTable';
import { Activity, Server, Database, Globe } from 'lucide-react';

const systemStatus = [
  { label: 'DHIS2 Version', value: '2.40.1', status: 'success', icon: <Server size={18} /> },
  { label: 'Database Type', value: 'PostgreSQL 15.3', status: 'success', icon: <Database size={18} /> },
  { label: 'Web Server', value: 'Tomcat 9.0.75', status: 'success', icon: <Globe size={18} /> },
  { label: 'Uptime', value: '14 days, 6 hours', status: 'success', icon: <Activity size={18} /> },
];

const auditChecks = [
  { id: 1, category: 'System', check: 'Default credentials check', status: 'success', description: 'No default credentials found for system users.' },
  { id: 2, category: 'Security', check: 'SSL/TLS configuration', status: 'success', description: 'Instance is using modern TLS 1.3 with valid certificates.' },
  { id: 3, category: 'Data', check: 'Incomplete data sets', status: 'warning', description: '3 data sets have completeness below 80% for the last period.' },
  { id: 4, category: 'Performance', check: 'Slow queries audit', status: 'failed', description: '5 queries exceeded the 2s threshold in the last 24h.' },
  { id: 5, category: 'Modules', check: 'Legacy modules check', status: 'warning', description: '2 legacy modules are still enabled but unused.' },
];

const datasetCompleteness = [
  { datasetName: 'ANC Monthly Report', period: 'March 2026', expected: 450, actual: 412, completeness: 91.5 },
  { datasetName: 'Immunization Daily Log', period: 'April 2026', expected: 1200, actual: 850, completeness: 70.8 },
];

const getProgressColor = (completeness: number) => {
  if (completeness >= 90) return 'bg-[#3b82f6] text-[#3b82f6]';
  if (completeness >= 75) return 'bg-[#f59e0b] text-[#f59e0b]';
  return 'bg-[#ef4444] text-[#ef4444]';
};

export default function SystemHealth() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-5">
        {systemStatus.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#f1f5f9] flex items-center justify-center text-[#64748b]">
                {s.icon}
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">{s.label}</span>
            </div>
            <div className="text-xl font-bold text-[#0f172a]">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Audit Checklist */}
      <ActivityTable auditChecks={auditChecks} />

      {/* Dataset Completeness Audit */}
      <AuditTable
        title="Dataset Completeness Audit"
        data={datasetCompleteness}
        columns={[
          {
            header: 'Dataset Name',
            render: (row) => <span className="font-medium text-[#0f172a]">{row.datasetName}</span>,
            cellClassName: 'px-6 py-4',
          },
          {
            header: 'Period',
            render: (row) => <span className="text-[#64748b]">{row.period}</span>,
            cellClassName: 'px-6 py-4',
          },
          {
            header: 'Expected',
            render: (row) => <span className="text-[#64748b]">{row.expected}</span>,
            cellClassName: 'px-6 py-4',
          },
          {
            header: 'Actual',
            render: (row) => <span className="text-[#64748b]">{row.actual}</span>,
            cellClassName: 'px-6 py-4',
          },
          {
            header: 'Completeness',
            render: (row) => {
              const progressColor = getProgressColor(row.completeness);
              return (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full max-w-[100px]">
                    <div className={`h-full rounded-full ${progressColor}`} style={{ width: `${row.completeness}%` }} />
                  </div>
                  <span className={`font-bold ${progressColor}`}>{row.completeness}%</span>
                </div>
              );
            },
            cellClassName: 'px-6 py-4',
          },
        ]}
      />

      {/* Security Score */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1 bg-white rounded-xl border border-[#e2e8f0] p-6 flex flex-col items-center justify-center text-center">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-4 w-full text-left">Security Score</h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
              <circle cx="64" cy="64" r="58" stroke="#3b82f6" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset="36.4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#0f172a]">90%</span>
              <span className="text-[10px] font-bold text-[#64748b] uppercase">Healthy</span>
            </div>
          </div>
          <p className="text-xs text-[#64748b] mt-4">Your instance is 15% more secure than the global average.</p>
        </div>

        <div className="col-span-2 bg-white rounded-xl border border-[#e2e8f0] p-6">
          <h3 className="font-bold text-[15px] text-[#0f172a] mb-4">Instance Health Trends</h3>
          <div className="h-[180px] w-full bg-[#f8fafc] rounded-lg border border-dashed border-[#e2e8f0] flex items-center justify-center">
            <span className="text-sm text-[#94a3b8]">Health metrics chart will be displayed here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
