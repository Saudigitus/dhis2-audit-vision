import { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Eye, X, User, Calendar, FileText, History, ChevronRight, Layers, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import Table from '../../components/table/Table';
import ChangeExplorerDrawer from '../../components/drawer/changeExlorerDrawer';

const allChanges = [
  {
    id: 1,
    time: '2026-04-09 10:19', user: 'rbrown', type: 'program', object: 'HIV Care and Treatment', action: 'UPDATE',
    group: 'HIV/SIDA',
    dependencies: [
      { id: 101, time: '2026-04-09 10:19', user: 'rbrown', type: 'programStage', object: 'First Visit', action: 'UPDATE' },
      { id: 102, time: '2026-04-09 10:19', user: 'rbrown', type: 'dataElement', object: 'HIV Status', action: 'CREATE' },
      { id: 103, time: '2026-04-09 10:19', user: 'rbrown', type: 'programRule', object: 'Hide CD4 if negative', action: 'UPDATE' },
      { id: 104, time: '2026-04-09 10:19', user: 'rbrown', type: 'trackedEntityAttribute', object: 'National ID', action: 'UPDATE' }
    ]
  },
  {
    id: 2,
    time: '2026-04-09 10:08', user: 'rbrown', type: 'dataSet', object: 'Malaria Weekly Report', action: 'UPDATE',
    group: 'Malaria',
    dependencies: [
      { id: 201, time: '2026-04-09 10:08', user: 'rbrown', type: 'dataElement', object: 'Malaria Cases < 5y', action: 'UPDATE' },
      { id: 202, time: '2026-04-09 10:08', user: 'rbrown', type: 'categoryCombo', object: 'Age and Gender', action: 'UPDATE' },
      { id: 203, time: '2026-04-09 10:08', user: 'rbrown', type: 'indicator', object: 'Malaria Incidence Rate', action: 'UPDATE' }
    ]
  },
  { id: 3, time: '2026-04-09 09:44', user: 'rbrown', type: 'categoryCombo', object: 'categoryCombo_972', action: 'CREATE', group: null },
  { id: 4, time: '2026-04-09 09:37', user: 'asmith', type: 'optionSet', object: 'optionSet_877', action: 'CREATE', group: null },
  { id: 5, time: '2026-04-09 09:16', user: 'kchan', type: 'optionSet', object: 'optionSet_164', action: 'UPDATE', group: null },
  { id: 6, time: '2026-04-09 09:01', user: 'rbrown', type: 'categoryCombo', object: 'categoryCombo_663', action: 'CREATE', group: null },
  { id: 7, time: '2026-04-09 08:50', user: 'jdoe', type: 'organisationUnit', object: 'organisationUnit_783', action: 'CREATE', group: null },
  { id: 8, time: '2026-04-09 08:31', user: 'rbrown', type: 'dataElement', object: 'dataElement_101', action: 'CREATE', group: null },
  { id: 9, time: '2026-04-09 08:19', user: 'rbrown', type: 'indicator', object: 'indicator_903', action: 'DELETE', group: null },
];

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

export default function ChangeExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedChange, setSelectedChange] = useState<typeof allChanges[0] | any | null>(null);
  const [parentChange, setParentChange] = useState<typeof allChanges[0] | any | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [detailTab, setDetailTab] = useState<'diff' | 'dependencies' | 'raw'>('diff');
  // Filter states
  const [filterGroup, setFilterGroup] = useState('All Groups');
  const [filterMetadataType, setFilterMetadataType] = useState('All');
  const [filterUser, setFilterUser] = useState('All');
  const [filterAuditType, setFilterAuditType] = useState('All');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  const filteredChanges = allChanges.filter(change => {
    // Filter by search query
    if (searchQuery && !(change.object.toLowerCase().includes(searchQuery.toLowerCase()) || change.user.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Filter by group
    if (filterGroup !== 'All Groups' && change.group !== filterGroup) {
      return false;
    }

    // Filter by metadata type
    if (filterMetadataType !== 'All' && change.type !== filterMetadataType) {
      return false;
    }

    // Filter by user
    if (filterUser !== 'All' && change.user !== filterUser) {
      return false;
    }

    // Filter by audit type
    if (filterAuditType !== 'All' && change.action !== filterAuditType) {
      return false;
    }

    // Filter by date range
    const changeDate = new Date(change.time.split(' ')[0]);
    if (filterDateFrom) {
      const fromDate = new Date(filterDateFrom);
      if (changeDate < fromDate) return false;
    }
    if (filterDateTo) {
      const toDate = new Date(filterDateTo);
      if (changeDate > toDate) return false;
    }

    return true;
  });

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

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
          <div className="w-[260px] shrink-0 bg-white rounded-xl border border-[#e2e8f0] p-5 h-fit">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-sm text-[#0f172a] uppercase tracking-wide">Filters</h3>
              <button className="flex items-center gap-1 text-sm text-[#64748b] hover:text-[#0f172a] cursor-pointer">
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">View Group</label>
                <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                  <option>All Groups</option>
                  <option>HIV/SIDA</option>
                  <option>Malaria</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Metadata Type</label>
                <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                  <option>All</option>
                  <option>dataSet</option>
                  <option>dataElement</option>
                  <option>indicator</option>
                  <option>categoryCombo</option>
                  <option>program</option>
                  <option>trackedEntityType</option>
                  <option>organisationUnit</option>
                  <option>optionSet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">User</label>
                <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                  <option>All</option>
                  <option>admin</option>
                  <option>jdoe</option>
                  <option>kchan</option>
                  <option>rbrown</option>
                  <option>asmith</option>
                  <option>mwilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Audit Type</label>
                <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                  <option>All</option>
                  <option>CREATE</option>
                  <option>UPDATE</option>
                  <option>DELETE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Date From</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Date To</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        <Table
          pagination={{ total: 430, page: 2, pageSize: 50, totalPages: 10 }}
          setDetailTab={setDetailTab}
          setSelectedChange={setSelectedChange}
          header={columns}
          tabledata={allChanges} />
      </div>

      {/* Change Detail Slide-out Panel */}
      {selectedChange && <ChangeExplorerDrawer
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
