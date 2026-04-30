import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { User, UserActivity } from '../../types/users/users';

interface UserDetailPanelProps {
  user: User;
  onClose: () => void;
  activities: UserActivity[];
  actionColors: Record<string, string>;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ user, onClose, activities, actionColors }) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[560px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-bold`}>
              {user.initial}
            </div>
            <div>
              <div className="text-lg font-bold text-[#0f172a]">{user.name}</div>
              <div className="text-xs text-[#64748b]">{user.role}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#f1f5f9] rounded-lg cursor-pointer">
            <X size={20} className="text-[#64748b]" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Summary badges */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span className="text-xs font-bold px-3 py-1 rounded border border-[#3b82f6] text-[#3b82f6]">CREATE  2</span>
            <span className="text-xs font-bold px-3 py-1 rounded border border-[#d97706] text-[#d97706]">UPDATE  2</span>
            <span className="text-xs font-bold px-3 py-1 rounded border border-[#ef4444] text-[#ef4444]">DELETE  3</span>
            <span className="text-xs font-medium px-3 py-1 rounded border border-[#e2e8f0] text-[#0f172a]">Total  7</span>
          </div>

          {/* Activity section */}
          <div className="mb-3">
            <div className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider mb-1">
              All Activity — Click row to expand
            </div>
          </div>

          {/* Activity Table */}
          <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Date</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Type</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Object</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">Action</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {activities.map((row, i) => (
                  <tr key={i} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] cursor-pointer">
                    <td className="px-4 py-3 text-xs text-[#64748b]">{row.date}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono bg-[#f1f5f9] px-1.5 py-0.5 rounded text-[#475569]">{row.type}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#0f172a]">{row.object}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${actionColors[row.action]}`}>
                        {row.action}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <ChevronRight size={14} className="text-[#94a3b8]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPanel;
