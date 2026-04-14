import { ShieldCheck, Key, AlertCircle, FileText, Lock } from 'lucide-react';
import SharingAuditTable from '../components/SharingAuditTable';

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
      <SharingAuditTable
        title="Metadata Sharing Audit"
        data={sharingAudit}
        onExportReport={() => console.log('Export Report clicked')}
        onScanPermissions={() => console.log('Scan Permissions clicked')}
        showExportButton
        showScanButton
      />

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
