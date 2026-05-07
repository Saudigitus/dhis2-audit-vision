import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Table from '../../components/table/Table';
import ChangeExplorerDrawer from '../../components/drawer/changeExlorerDrawer';
import { useGetAudit } from '../../hooks/audit/useGetAudit';
import { filterValuesFormatter, rowsFormatter } from '../../utils/table/rowFormatter';
import TableFilter from '../../components/filter/TableFilter';
import { changeExplorerHeader, metadataGroupAudit } from '../../constants/common/auditTableHeaders';
import { useParams } from '../../hooks/common/useQueryParams';
import { useGetUsers } from '../../hooks/users/useGetUsers';

export interface SelectedAuditProps {
  id: string;
  action: string;
  user: string;
  date: string;
  object?: string;
  type: string;
  dependencies?: any[];
}

export default function ChangeExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState<Record<string, string> | null>(null)
  const [filterQuery, setFilteQuery] = useState<string | null>(null)
  const [selectedChange, setSelectedChange] = useState<SelectedAuditProps | null>(null);
  const [parentChange, setParentChange] = useState<any | null>(null);
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const { getAudit, data, loading } = useGetAudit();
  const { group } = useParams()
  const { users, loading: usersLoading } = useGetUsers();

  console.log(users)

  useEffect(() => {
    getAudit({ page, pageSize, filterQuery: filterQuery! })
  }, [page, pageSize, filterQuery, group])

  return (
    <div className="space-y-5 relative">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">Change Explorer</span>
          </div>
        </div>
        <div className="flex items-center gap-3">  </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search by object name or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
          />
        </div>
        <button
          disabled={loading || usersLoading || !!group}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-sm font-medium text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex gap-5">
        {showFilters && (
          <TableFilter query={query} setQuery={setQuery} setFilteQuery={setFilteQuery} filters={filterValuesFormatter({ users })} />
        )}

        <Table
          loading={loading || usersLoading}
          pagination={{ ...data?.pager!, setPage, setPageSize }}
          setSelectedChange={setSelectedChange}
          header={group ? metadataGroupAudit : changeExplorerHeader}
          dependenceHeaders={group ? changeExplorerHeader : []}
          title='Change History'
          description='Explore the history of changes made to your DHIS2 objects, including who made the change and when.'
          tabledata={group ? data?.audits! : rowsFormatter(data?.audits!)}
        />
      </div>

      {selectedChange &&
        <ChangeExplorerDrawer
          parentChange={parentChange}
          selectedChange={selectedChange}
          setParentChange={setParentChange}
          setSelectedChange={setSelectedChange}
        />}
    </div>
  );
}
