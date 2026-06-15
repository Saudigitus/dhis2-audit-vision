import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/users/users';
import { Center, CircularLoader } from '@dhis2/ui';
import { useGetAudit } from '../../hooks/audit/useGetAudit';
import { rowsFormatter } from '../../utils/table/rowFormatter';
import Pagination from '../table/components/Pagination';

interface UserDetailPanelProps {
  user: User;
  onClose: () => void;
  actionColors: Record<string, string>;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ user, onClose, actionColors }) => {
  const { getAudit, data, loading } = useGetAudit();
  const [pager, setPager] = useState({ page: 1, pageSize: 50, })


  useEffect(() => {
    getAudit({
      page: pager.page,
      pageSize: pager.pageSize,
      filterQuery: new URLSearchParams({ ['createdBy']: user.username as string })?.toString()
    });
  }, [user.username, pager.page, pager.pageSize])

  const header = [
    { id: 'date', displayName: 'Date', },
    { id: 'type', displayName: 'Type', },
    { id: 'object', displayName: 'Object Name', },
    { id: 'action', displayName: 'Action', },
  ];

  const onPageChange = (page: number) => {
    setPager({ ...pager, page });
  }

  const onPageSizeChange = (pageSize: number) => {
    setPager({ ...pager, pageSize });
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[60vw] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
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
          {/* <div className="flex items-center gap-2 flex-wrap mb-5">
            <span className="text-xs font-bold px-3 py-1 rounded border border-[#3b82f6] text-[#3b82f6]">CREATE  2</span>
            <span className="text-xs font-bold px-3 py-1 rounded border border-[#d97706] text-[#d97706]">UPDATE  2</span>
            <span className="text-xs font-bold px-3 py-1 rounded border border-[#ef4444] text-[#ef4444]">DELETE  3</span>
            <span className="text-xs font-medium px-3 py-1 rounded border border-[#e2e8f0] text-[#0f172a]">Total  7</span>
          </div> */}

          {/* Activity section */}
          <div className="mb-3">
            <div className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider mb-1">
              All Activity
            </div>
          </div>

          {/* Activity Table */}
          <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                  {header.map((item, i) => (
                    <th key={i} className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">{item.displayName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  loading ?
                    <tr className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] cursor-pointer">
                      <td colSpan={header?.length} className="px-4 py-3 text-xs text-[#64748b]">
                        <Center><CircularLoader small /></Center>
                      </td>
                    </tr> :
                    rowsFormatter(data?.audits || [] as any)?.map((row, i) => (
                      <tr key={i} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] cursor-pointer">
                        <td className="px-4 py-3 text-xs text-[#64748b]">{row.time}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono bg-[#f1f5f9] px-1.5 py-0.5 rounded text-[#475569]">{row.type}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#0f172a]">{row.object}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${actionColors[row.action]}`}>
                            {row.action}
                          </span>
                        </td>
                      </tr>
                    ))
                }

                {
                  !loading && !data?.audits?.length ?
                    <tr className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] cursor-pointer">
                      <td colSpan={header?.length} className="px-4 py-3 text-xs text-[#64748b]">
                        No activity found.
                      </td>
                    </tr>
                    : null
                }
              </tbody>
            </table>

            {
              !loading && data?.audits?.length ?
                <div className="flex justify-end px-4 py-3">
                  <Pagination
                    pagination={{
                      page: pager.page,
                      setPage: onPageChange,
                      pageSize: pager.pageSize,
                      total: user?.changes || 0,
                      setPageSize: onPageSizeChange,
                      pageCount: Math.ceil(user?.changes || 0 / pager.pageSize),
                    }}
                  />
                </div>
                : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPanel;
