import { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

interface Alert {
  id: number;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  type: string;
  message: string;
  time: string;
}

const initialAlerts: Alert[] = [
  { id: 1, severity: 'HIGH', type: 'organisationUnit', message: 'Bulk DELETE operation detected: 12 organisationUnits removed', time: '2026-04-09 07:43' },
  { id: 2, severity: 'HIGH', type: 'indicator', message: 'Unauthorized user attempted to modify system indicators', time: '2026-04-09 05:43' },
  { id: 3, severity: 'MEDIUM', type: 'dataSet', message: 'dataSet "Monthly Report" schema changed significantly', time: '2026-04-09 03:43' },
  { id: 4, severity: 'MEDIUM', type: 'categoryCombo', message: 'New categoryCombo created with unusual configuration', time: '2026-04-09 00:43' },
  { id: 5, severity: 'MEDIUM', type: 'program', message: 'Program rules modified in bulk operation', time: '2026-04-08 22:43' },
  { id: 6, severity: 'HIGH', type: 'organisationUnit', message: 'Organisation unit hierarchy restructured', time: '2026-04-08 20:43' },
  { id: 7, severity: 'LOW', type: 'dataElement', message: 'Minor naming convention change detected', time: '2026-04-08 18:43' },
  { id: 8, severity: 'LOW', type: 'indicator', message: 'Indicator description updated', time: '2026-04-08 16:43' },
];

const severityConfig = {
  HIGH: {
    icon: <AlertTriangle size={20} className="text-[#ef4444]" />,
    badge: 'bg-[#fee2e2] text-[#ef4444]',
    cardBorder: 'border-l-4 border-l-[#ef4444]',
    statBg: 'bg-[#fef2f2] border-[#fecaca]',
    statIcon: <AlertTriangle size={22} className="text-[#ef4444]" />,
  },
  MEDIUM: {
    icon: <AlertCircle size={20} className="text-[#f59e0b]" />,
    badge: 'bg-[#fef3c7] text-[#d97706]',
    cardBorder: 'border-l-4 border-l-[#f59e0b]',
    statBg: 'bg-[#fffbeb] border-[#fde68a]',
    statIcon: <AlertCircle size={22} className="text-[#f59e0b]" />,
  },
  LOW: {
    icon: <Info size={20} className="text-[#22c55e]" />,
    badge: 'bg-[#dcfce7] text-[#16a34a]',
    cardBorder: 'border-l-4 border-l-[#22c55e]',
    statBg: 'bg-[#f0fdf4] border-[#bbf7d0]',
    statIcon: <Info size={22} className="text-[#22c55e]" />,
  },
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState('All Severities');

  const highCount = alerts.filter(a => a.severity === 'HIGH').length;
  const medCount = alerts.filter(a => a.severity === 'MEDIUM').length;
  const lowCount = alerts.filter(a => a.severity === 'LOW').length;

  const filtered = filter === 'All Severities'
    ? alerts
    : alerts.filter(a => a.severity === filter);

  return (
    <div className="space-y-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: 'High Severity', count: highCount, config: severityConfig.HIGH },
          { label: 'Medium Severity', count: medCount, config: severityConfig.MEDIUM },
          { label: 'Low Severity', count: lowCount, config: severityConfig.LOW },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl border p-5 flex items-start gap-3 ${s.config.statBg}`}>
            <div className="mt-1">{s.config.statIcon}</div>
            <div>
              <div className="text-3xl font-bold text-[#0f172a]">{s.count}</div>
              <div className="text-sm text-[#64748b]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          <option>All Severities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filtered.map((alert) => {
          const config = severityConfig[alert.severity];
          return (
            <div key={alert.id} className={`bg-white rounded-xl border border-[#e2e8f0] ${config.cardBorder} p-5`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{config.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.badge}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">
                        {alert.type}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-[#0f172a]">{alert.message}</div>
                    <div className="text-xs text-[#94a3b8] mt-1">{alert.time}</div>
                  </div>
                </div>
                <button
                  onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
                  className="text-[#94a3b8] hover:text-[#64748b] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
