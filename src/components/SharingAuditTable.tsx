import { AlertCircle } from 'lucide-react';

export interface SharingAuditRow {
  name: string;
  type: string;
  publicAccess: string;
  users: number;
  groups: number;
}

export interface SharingAuditTableProps {
  title: string;
  data: SharingAuditRow[];
  onExportReport?: () => void;
  onScanPermissions?: () => void;
  showExportButton?: boolean;
  showScanButton?: boolean;
}

export default function SharingAuditTable({
  title,
  data,
  onExportReport,
  onScanPermissions,
  showExportButton = true,
  showScanButton = true,
}: SharingAuditTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0]">
      <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
        <h3 className="font-bold text-[15px] text-[#0f172a]">{title}</h3>
        <div className="flex gap-2">
          {showExportButton && (
            <button
              onClick={onExportReport}
              className="px-3 py-1.5 text-xs font-bold bg-[#f1f5f9] text-[#475569] rounded-lg hover:bg-[#e2e8f0] cursor-pointer"
            >
              Export Report
            </button>
          )}
          {showScanButton && (
            <button
              onClick={onScanPermissions}
              className="px-3 py-1.5 text-xs font-bold bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] cursor-pointer"
            >
              Scan Permissions
            </button>
          )}
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#e2e8f0]">
            <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">
              Object Name
            </th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">
              Type
            </th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">
              Public Access
            </th>
            <th className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">
              Users / Groups
            </th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]">
              <td className="px-6 py-3.5 text-sm font-semibold text-[#0f172a]">{row.name}</td>
              <td className="px-6 py-3.5 text-sm text-[#64748b]">{row.type}</td>
              <td className="px-6 py-3.5">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    row.publicAccess === 'None'
                      ? 'bg-[#f1f5f9] text-[#64748b]'
                      : 'bg-[#fff7ed] text-[#ea580c] border border-[#fdba74]'
                  }`}
                >
                  {row.publicAccess}
                </span>
              </td>
              <td className="px-6 py-3.5 text-sm text-[#64748b]">
                <span className="font-bold text-[#0f172a]">{row.users}</span> users,{' '}
                <span className="font-bold text-[#0f172a]">{row.groups}</span> groups
              </td>
              <td className="px-4 py-3.5 text-[#94a3b8] cursor-pointer hover:text-[#64748b]">
                <AlertCircle size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
