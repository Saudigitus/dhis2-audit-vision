import { ShieldCheck, Key, AlertCircle, FileText, Lock } from 'lucide-react';

const accessLogs = [
  { time: '2026-04-11 11:20', user: 'admin', object: 'Organisation Unit Level 1', action: 'Update Sharing', risk: 'high' },
  { time: '2026-04-11 10:45', user: 'jdoe', object: 'Data Set ANC', action: 'Public Access', risk: 'medium' },
  { time: '2026-04-11 09:30', user: 'kchan', object: 'User Group Health Officers', action: 'Delete Group', risk: 'low' },
  { time: '2026-04-11 08:15', user: 'rbrown', object: 'Password Policy', action: 'Change Setting', risk: 'high' },
];

const sharingAudit = [
  { name: 'Organisation Unit Level 1', type: 'Org Unit', publicAccess: 'Read-only', users: 12, groups: 5 },
  { name: 'Data Set ANC', type: 'Data Set', publicAccess: 'None', users: 8, groups: 2 },
  { name: 'Indicator Mortality Rate', type: 'Indicator', publicAccess: 'Read-only', users: 24, groups: 10 },
  { name: 'Program HIV Services', type: 'Program', publicAccess: 'None', users: 5, groups: 3 },
];

const riskStyles = {
  high: 'bg-[#fee2e2] text-[#ef4444] border-[#fca5a5]',
  medium: 'bg-[#fff7ed] text-[#ea580c] border-[#fdba74]',
  low: 'bg-[#f0fdf4] text-[#16a34a] border-[#bcf0da]',
};

export default function SecurityAudit() {
  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#fef2f2] flex items-center justify-center text-[#ef4444] mb-3">
            <Lock size={24} />
          </div>
          <h4 className="text-2xl font-bold text-[#0f172a]">12</h4>
          <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">High Risk Actions</span>
          <p className="text-[10px] text-[#ef4444] mt-2 font-bold">+2 since yesterday</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] mb-3">
            <Key size={24} />
          </div>
          <h4 className="text-2xl font-bold text-[#0f172a]">85%</h4>
          <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">MFA Adoption</span>
          <p className="text-[10px] text-[#22c55e] mt-2 font-bold">+5% since last month</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#22c55e] mb-3">
            <ShieldCheck size={24} />
          </div>
          <h4 className="text-2xl font-bold text-[#0f172a]">Active</h4>
          <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">System Firewall</span>
          <p className="text-[10px] text-[#64748b] mt-2">Running version 2.1.0</p>
        </div>
      </div>

      {/* Sharing Settings Audit */}
      <div className="bg-white rounded-xl border border-[#e2e8f0]">
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
          <h3 className="font-bold text-[15px] text-[#0f172a]">Metadata Sharing Audit</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold bg-[#f1f5f9] text-[#475569] rounded-lg hover:bg-[#e2e8f0] cursor-pointer">Export Report</button>
            <button className="px-3 py-1.5 text-xs font-bold bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] cursor-pointer">Scan Permissions</button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Object Name</th>
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Type</th>
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Public Access</th>
              <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Users / Groups</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {sharingAudit.map((row, i) => (
              <tr key={i} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]">
                <td className="px-6 py-3.5 text-sm font-semibold text-[#0f172a]">{row.name}</td>
                <td className="px-6 py-3.5 text-sm text-[#64748b]">{row.type}</td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${row.publicAccess === 'None' ? 'bg-[#f1f5f9] text-[#64748b]' : 'bg-[#fff7ed] text-[#ea580c] border border-[#fdba74]'}`}>
                    {row.publicAccess}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-sm text-[#64748b]">
                  <span className="font-bold text-[#0f172a]">{row.users}</span> users, <span className="font-bold text-[#0f172a]">{row.groups}</span> groups
                </td>
                <td className="px-4 py-3.5 text-[#94a3b8] cursor-pointer hover:text-[#64748b]">
                  <AlertCircle size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Access Logs Audit */}
      <div className="bg-white rounded-xl border border-[#e2e8f0]">
        <div className="px-6 py-4 border-b border-[#e2e8f0]">
          <h3 className="font-bold text-[15px] text-[#0f172a]">Security & Access Logs</h3>
        </div>
        <div className="divide-y divide-[#f1f5f9]">
          {accessLogs.map((log, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#f8fafc]">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${riskStyles[log.risk as keyof typeof riskStyles]}`}>
                  {log.risk === 'high' ? <AlertCircle size={16} /> : <FileText size={16} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0f172a]">{log.user}</span>
                    <span className="text-xs text-[#64748b] font-medium">{log.action}</span>
                    <span className="text-xs text-[#94a3b8]">on</span>
                    <span className="text-sm font-mono bg-[#f1f5f9] px-1.5 py-0.5 rounded text-[#475569]">{log.object}</span>
                  </div>
                  <p className="text-xs text-[#94a3b8] mt-0.5">{log.time}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${riskStyles[log.risk as keyof typeof riskStyles]}`}>
                {log.risk} risk
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
