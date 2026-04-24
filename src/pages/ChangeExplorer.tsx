import { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Eye, X, User, Calendar, FileText, History, ChevronRight, Layers, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import Table from '../components/table/Table';

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

const actionColors: Record<string, string> = {
  CREATE: 'bg-[#3b82f6] text-white',
  UPDATE: 'bg-[#fef3c7] text-[#d97706] border border-[#fcd34d]',
  DELETE: 'bg-[#fee2e2] text-[#ef4444] border border-[#fca5a5]',
};

const actionOutline: Record<string, string> = {
  CREATE: 'border-[#3b82f6] text-[#3b82f6]',
  UPDATE: 'border-[#d97706] text-[#d97706]',
  DELETE: 'border-[#ef4444] text-[#ef4444]',
};

const actionDot: Record<string, string> = {
  CREATE: 'bg-[#3b82f6]',
  UPDATE: 'bg-[#f59e0b]',
  DELETE: 'bg-[#ef4444]',
};

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
  const [detailTab, setDetailTab] = useState<'diff' | 'dependencies' | 'raw'>('diff');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

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
      {selectedChange && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelectedChange(null)} />
          {/* Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[560px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                {parentChange && (
                  <button onClick={() => { setSelectedChange(parentChange); setParentChange(null); setDetailTab('dependencies'); }} className="p-1.5 hover:bg-[#f1f5f9] rounded-lg cursor-pointer text-[#64748b]">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <h2 className="text-lg font-bold text-[#0f172a]">Change Detail</h2>
              </div>
              <button onClick={() => { setSelectedChange(null); setParentChange(null); }} className="p-1.5 hover:bg-[#f1f5f9] rounded-lg cursor-pointer">
                <X size={20} className="text-[#64748b]" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Meta info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <User size={16} className="text-[#94a3b8]" />
                  <span className="text-[#64748b]">User:</span>
                  <span className="font-semibold text-[#0f172a]">{selectedChange.user}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-[#94a3b8]" />
                  <span className="text-[#64748b]">Date:</span>
                  <span className="font-semibold text-[#0f172a]">{selectedChange.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText size={16} className="text-[#94a3b8]" />
                  <span className="text-[#64748b]">Type:</span>
                  <span className="font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-sm text-[#475569]">{selectedChange.type}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex bg-[#f1f5f9] rounded-lg p-1 mb-5">
                <button
                  onClick={() => setDetailTab('diff')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${detailTab === 'diff' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'
                    }`}
                >
                  Diff View
                </button>
                {selectedChange?.dependencies && selectedChange.dependencies.length > 0 && (
                  <button
                    onClick={() => setDetailTab('dependencies')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2 ${detailTab === 'dependencies' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'
                      }`}
                  >
                    Dependencies
                    <span className="bg-[#e2e8f0] text-[#475569] text-[10px] px-1.5 py-0.5 rounded-full">{selectedChange.dependencies.length}</span>
                  </button>
                )}
                <button
                  onClick={() => setDetailTab('raw')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${detailTab === 'raw' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'
                    }`}
                >
                  Raw JSON
                </button>
              </div>

              {detailTab === 'diff' ? (
                <>
                  {/* Diff Table */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-0 mb-1">
                      <div className="text-xs font-bold text-[#ef4444] uppercase tracking-wider px-2">BEFORE</div>
                      <div className="text-xs font-bold text-[#22c55e] uppercase tracking-wider px-2">AFTER</div>
                    </div>
                    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden divide-y divide-[#e2e8f0]">
                      {diffData.map((row, i) => (
                        <div key={i} className="grid grid-cols-2 divide-x divide-[#e2e8f0]">
                          {/* Before */}
                          <div className="px-3 py-2.5">
                            <div className="text-xs text-[#64748b] mb-0.5">{row.field}</div>
                            <div className={`text-sm font-mono break-all ${row.changed ? 'bg-[#fee2e2] text-[#0f172a] px-1.5 py-0.5 rounded line-through decoration-[#ef4444]/40' : 'text-[#0f172a]'}`}>
                              {row.before}
                            </div>
                          </div>
                          {/* After */}
                          <div className="px-3 py-2.5">
                            <div className="text-xs text-[#64748b] mb-0.5">{row.field}</div>
                            <div className={`text-sm font-mono break-all ${row.changed ? 'bg-[#dcfce7] text-[#0f172a] px-1.5 py-0.5 rounded' : 'text-[#0f172a]'}`}>
                              {row.after}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Change History */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <History size={16} className="text-[#64748b]" />
                      <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Change History</h3>
                    </div>
                    <div className="space-y-0">
                      {changeHistory.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 pb-4 relative">
                          {/* Timeline line */}
                          {i < changeHistory.length - 1 && (
                            <div className="absolute left-[7px] top-5 bottom-0 w-px bg-[#e2e8f0]" />
                          )}
                          {/* Dot */}
                          <div className={`w-[15px] h-[15px] rounded-full ${actionDot[h.action]} shrink-0 mt-0.5 border-2 border-white shadow-sm`} />
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${actionOutline[h.action]}`}>
                                {h.action}
                              </span>
                              <span className="text-sm font-semibold text-[#0f172a]">{h.user}</span>
                              <span className="text-xs text-[#94a3b8]">·</span>
                              <span className="text-xs text-[#94a3b8]">{h.date}</span>
                              <div className="flex-1" />
                              <span className="text-xs text-[#94a3b8]">{h.fields} fields</span>
                              <ChevronRight size={14} className="text-[#94a3b8]" />
                            </div>
                            {h.desc && (
                              <p className="text-xs text-[#64748b] mt-0.5">{h.desc}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : detailTab === 'dependencies' ? (
                /* Dependencies View */
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Dependent Changes</h3>
                    <span className="text-xs text-[#64748b]">Found {selectedChange.dependencies?.length || 0} items</span>
                  </div>

                  <div className="space-y-3">
                    {selectedChange.dependencies?.map((dep: any, i: number) => (
                      <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm hover:border-[#cbd5e1] transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">{dep.type}</span>
                            <span className="text-sm font-semibold text-[#0f172a]">{dep.object}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded ${actionColors[dep.action]}`}>
                            {dep.action}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-[#64748b]">
                          <div className="flex items-center gap-1.5">
                            <User size={14} className="text-[#94a3b8]" />
                            {dep.user}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-[#94a3b8]" />
                            {dep.time}
                          </div>
                          <button
                            onClick={() => { setSelectedChange(dep); setDetailTab('diff'); }}
                            className="ml-auto text-[#3b82f6] hover:text-[#2563eb] font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={14} /> View Diff
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Raw JSON View */
                <div className="bg-[#0f172a] text-[#e2e8f0] rounded-lg p-4 text-xs font-mono overflow-x-auto">
                  <pre>{JSON.stringify({
                    id: selectedChange.object,
                    type: selectedChange.type,
                    action: selectedChange.action,
                    user: selectedChange.user,
                    timestamp: selectedChange.time,
                    before: Object.fromEntries(diffData.map(d => [d.field, d.before])),
                    after: Object.fromEntries(diffData.map(d => [d.field, d.after])),
                  }, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
