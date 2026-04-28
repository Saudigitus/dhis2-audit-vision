import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Table from '../../components/table/Table';
import ChangeExplorerDrawer from '../../components/drawer/changeExlorerDrawer';
import { useGetudit } from '../../hooks/audit/useGetudit';
import { Center, CircularLoader } from '@dhis2/ui';
import { rowsFormatter } from '../../utils/table/rowFormatter';
import TableFilter from '../../components/filter/TableFilter';
import { changeExplorerHeader } from '../../constants/common/auditTableHeaders';

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
  const [showFilters, setShowFilters] = useState(true);
  const [selectedChange, setSelectedChange] = useState<SelectedAuditProps | null>(null);
  const [parentChange, setParentChange] = useState<any | null>(null);
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [detailTab, setDetailTab] = useState<'diff' | 'dependencies' | 'raw'>('diff');
  const { getAudit, data, loading } = useGetudit();
console.log(data,'asasas')
  useEffect(() => {
    getAudit(page, pageSize)
  }, [page, pageSize])

  if (loading) {
    return <Center>
      <CircularLoader />
    </Center>
  }

  return (
    <div className="space-y-5 relative">
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
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-sm font-medium text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex gap-5">
        {/* Filters Panel */}
        {showFilters && (
          <TableFilter />
        )}

        {/* Results Table */}
        <Table
          pagination={{ ...data?.pager!, setPage, setPageSize }}
          setDetailTab={setDetailTab}
          setSelectedChange={setSelectedChange}
          header={changeExplorerHeader}
          title='Change History'
          description='Explore the history of changes made to your DHIS2 objects, including who made the change and when.'
          tabledata={rowsFormatter(data?.audits!)} />
      </div>

      {/* Change Detail Slide-out Panel */}
      {selectedChange && <ChangeExplorerDrawer
        parentChange={parentChange}
        selectedChange={selectedChange}
        setParentChange={setParentChange}
        setSelectedChange={setSelectedChange}
      />}
    </div>
  );
}
