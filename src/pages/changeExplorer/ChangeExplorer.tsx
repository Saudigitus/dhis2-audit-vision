import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import Table from '../../components/table/Table';
import ChangeExplorerDrawer from '../../components/drawer/changeExlorerDrawer';
import { useGetudit } from '../../hooks/audit/useGetudit';
import { Center, CircularLoader } from '@dhis2/ui';
import { rowsFormater } from '../../utils/table/rowFormater';
import { useGetuditDetails } from '../../hooks/audit/useGetAuditDetails';
import TableFilter from '../../components/filter/TableFilter';

const diffData = [
  { field: 'name', before: 'ANC 1st Visit', after: 'ANC 1st Visit (Updated)', changed: true },
  { field: 'shortName', before: 'ANC1', after: 'ANC1_v2', changed: true },
  { field: 'aggregationType', before: 'SUM', after: 'AVERAGE', changed: true },
  { field: 'valueType', before: 'NUMBER', after: 'NUMBER', changed: false },
  { field: 'domainType', before: 'AGGREGATE', after: 'AGGREGATE', changed: false },
  { field: 'categoryCombo', before: '{"id":"bjDvmb4bfuf"}', after: '{"id":"bjDvmb4bfuf"}', changed: true },
  { field: 'description', before: 'Number of first antenatal care visits', after: 'Average number of first antenatal care visits per facility', changed: true },
];

const changeHistory = [
  { action: 'CREATE', user: 'admin', date: '2026-01-10 09:00', fields: 4, desc: 'Initial creation' },
  { action: 'UPDATE', user: 'jdoe', date: '2026-02-14 11:23', fields: 2, desc: 'Updated aggregationType and description' },
  { action: 'UPDATE', user: 'asmith', date: '2026-03-01 15:47', fields: 3, desc: 'Description and categoryCombo revised' },
  { action: 'UPDATE', user: 'admin', date: '2026-04-08 10:05', fields: 2, desc: '' },
];

const columns = [
  {
    id: "collapse",
    displayName: "",
  },
  {
    id: "time",
    displayName: "Timestamp",
  },
  {
    id: "user",
    displayName: "User",
  },
  {
    id: "type",
    displayName: "Type",
  },
  {
    id: "object",
    displayName: "Object Name",
  },
  {
    id: "action",
    displayName: "Action",
  },
  {
    id: "view",
    displayName: "",
  }
];

export interface SelectedAuditProps {
  user: string
  date: string
  type: string
  id: string
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
  const { getAuditDetails, auditDetails, loadingDetails } = useGetuditDetails()

  useEffect(() => {
    getAudit(page, pageSize)
  }, [page, pageSize])

  useEffect(() => {
    if (selectedChange) {
      getAuditDetails(selectedChange.id)
    }
  }, [selectedChange])


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
          header={columns}
          tabledata={rowsFormater(data?.audits!)} />
      </div>

      {/* Change Detail Slide-out Panel */}
      {selectedChange && <ChangeExplorerDrawer
        loading={loadingDetails}
        changeHistory={changeHistory}
        diffData={diffData}
        parentChange={parentChange}
        selectedChange={selectedChange}
        setParentChange={setParentChange}
        setSelectedChange={setSelectedChange}
      />}
    </div>
  );
}
