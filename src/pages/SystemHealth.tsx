import { CheckCircle2, AlertTriangle, XCircle, Activity, Server, Database, Globe } from 'lucide-react';

const systemStatus = [
  { label: 'DHIS2 Version', value: '2.40.1', status: 'success', icon: <Server size={18} /> },
  { label: 'Database Type', value: 'PostgreSQL 15.3', status: 'success', icon: <Database size={18} /> },
  { label: 'Web Server', value: 'Tomcat 9.0.75', status: 'success', icon: <Globe size={18} /> },
  { label: 'Uptime', value: '14 days, 6 hours', status: 'success', icon: <Activity size={18} /> },
];

const auditChecks = [
  { id: 1, category: 'System', check: 'Default credentials check', status: 'passed', description: 'No default credentials found for system users.' },
  { id: 2, category: 'Security', check: 'SSL/TLS configuration', status: 'passed', description: 'Instance is using modern TLS 1.3 with valid certificates.' },
  { id: 3, category: 'Data', check: 'Incomplete data sets', status: 'warning', description: '3 data sets have completeness below 80% for the last period.' },
  { id: 4, category: 'Performance', check: 'Slow queries audit', status: 'failed', description: '5 queries exceeded the 2s threshold in the last 24h.' },
  { id: 5, category: 'Modules', check: 'Legacy modules check', status: 'warning', description: '2 legacy modules are still enabled but unused.' },
];

const statusStyles = {
  passed: { bg: 'bg-[#f0fdf4]', text: 'text-[#16a34a]', border: 'border-[#bcf0da]', icon: <CheckCircle2 size={16} /> },
  warning: { bg: 'bg-[#fffbeb]', text: 'text-[#d97706]', border: 'border-[#fde68a]', icon: <AlertTriangle size={16} /> },
  failed: { bg: 'bg-[#fef2f2]', text: 'text-[#dc2626]', border: 'border-[#fecaca]', icon: <XCircle size={16} /> },
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
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
          <h3 className="font-bold text-[15px] text-[#0f172a]">System Audit Checklist</h3>
          <button className="text-sm font-semibold text-[#3b82f6] hover:underline cursor-pointer">Run New Audit</button>
        </div>
        <div className="divide-y divide-[#f1f5f9]">
          {auditChecks.map((check) => {
            const style = statusStyles[check.status as keyof typeof statusStyles];
            return (
              <div key={check.id} className="p-6 hover:bg-[#f8fafc] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className={`mt-1 p-1 rounded-full ${style.bg} ${style.text}`}>
                      {style.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">{check.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
                        <h4 className="font-bold text-[#0f172a]">{check.check}</h4>
                      </div>
                      <p className="text-sm text-[#64748b] mt-1">{check.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${style.bg} ${style.text} ${style.border}`}>
                    {check.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dataset Completeness Audit */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e2e8f0]">
          <h3 className="font-bold text-[15px] text-[#0f172a]">Dataset Completeness Audit</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Dataset Name</th>
              <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Period</th>
              <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Expected</th>
              <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Actual</th>
              <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Completeness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            <tr>
              <td className="px-6 py-4 font-medium text-[#0f172a]">ANC Monthly Report</td>
              <td className="px-6 py-4 text-[#64748b]">March 2026</td>
              <td className="px-6 py-4 text-[#64748b]">450</td>
              <td className="px-6 py-4 text-[#64748b]">412</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full max-w-[100px]">
                    <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: '91.5%' }} />
                  </div>
                  <span className="font-bold text-[#3b82f6]">91.5%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#0f172a]">Immunization Daily Log</td>
              <td className="px-6 py-4 text-[#64748b]">April 2026</td>
              <td className="px-6 py-4 text-[#64748b]">1200</td>
              <td className="px-6 py-4 text-[#64748b]">850</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full max-w-[100px]">
                    <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: '70.8%' }} />
                  </div>
                  <span className="font-bold text-[#f59e0b]">70.8%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
