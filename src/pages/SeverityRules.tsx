import { AlertTriangle, Plus, SlidersHorizontal, X } from 'lucide-react';
import SeverityForm from '../components/severityForm/severityForm';
import { useRef, useState } from 'react';
import Table from '../components/table/Table';
import { severityHeaders } from '../constants/common/auditTableHeaders';
import { SeverityRulesSchema } from '../schema/severityRulesSchema';
import { useRecoilValue } from 'recoil';
import { severityFilters, severityRulesFormater, filterNotifications } from '../utils/table/rowFormatter';
import ConfirmDialog from '../components/confirm/confirmDialog';
import { useDeleteSeverityRule } from '../hooks/severityRules/useDeleteSeverityRule';
import { useGetSeverityRules } from '../hooks/severityRules/useGetSeverityRules';
import TableFilter from '../components/filter/TableFilter';

const SeverityRules = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const refId = useRef('')
  const [row, setSelectedRow] = useState<any>(null)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const data = useRecoilValue(SeverityRulesSchema)
  const { deleteSeverityRule, loading } = useDeleteSeverityRule()
  const { getSeverityRules, loading: loadingRules } = useGetSeverityRules()
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState<Record<string, string> | null>(null)
  const [filterQuery, setFilteQuery] = useState<string | null>(null)

  const notifications = data?.notifications ?? [];
  const filteredNotifications = filterNotifications(notifications, filterQuery);
  const total = filteredNotifications.length;
  const pageCount = Math.ceil(total / pageSize);
  const slicedNotifications = filteredNotifications.slice((page - 1) * pageSize, page * pageSize);

  const onRowClick = (selected: any) => {
    const originalData = slicedNotifications.find((x: any) => x.id == selected.id)
    if (!originalData) return

    setSelectedRow({
      ...selected,
      messageTemplate: originalData?.messageTemplate,
      objectType: originalData?.objectType,
      contacts: originalData?.recipients?.to?.map((x: string) => ({ value: x, label: x, type: 'email' }))
    })
    setOpenForm(true)
  }

  const onDelete = async () => {
    await deleteSeverityRule(refId.current)
    setOpenConfirm(false)
    await getSeverityRules()
    refId.current = ''
  }

  return (
    <div className="max-w-12xl mx-auto space-y-5 pb-12">
      {
        openConfirm && <ConfirmDialog
          message='Are you sure you want to delete this rule?'
          onCancel={() => setOpenConfirm(false)}
          onConfirm={async () => onDelete()}
          open={openConfirm} title='Delete Rule'
          loading={loading}
        />
      }

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">Severity Rules</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={loading}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-sm font-medium text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <button
            onClick={() => {
              setOpenForm(!openForm)
              if (openForm) setSelectedRow(null)
            }}
            className={`flex items-center  gap-2 text-sm font-bold rounded-xl px-4 py-3 transition-all active:scale-95 border  cursor-pointer ${openForm
              ? 'text-red-600 bg-red-100 border-[#e2e8f0]'
              : 'text-blue-600 bg-blue-100 border-[#e2e8f08f]'
              }`}
          >
            {!openForm ? <Plus size={16} /> : <X size={16} />}
            {!openForm ? 'Add Rule' : 'Close'}
          </button>
        </div>

      </div>

      {!openForm ? (
        <div className="flex gap-5">
          {showFilters && (
            <TableFilter query={query} setQuery={setQuery} setFilteQuery={setFilteQuery} filters={severityFilters()} />
          )}

          <Table
            loading={loadingRules || false}
            onRowClick={onRowClick}
            pagination={{ total, page, pageSize, pageCount, setPage, setPageSize }}
            header={severityHeaders}
            hasDelete
            onDelete={(id: string) => {
              refId.current = id
              setOpenConfirm(true)
            }}
            title='Severity rules'
            description='Manage your DHIS2 Audit Vision severity rules.'
            tabledata={severityRulesFormater(slicedNotifications)}
          />
        </div>
      ) : (
        <SeverityForm setOpenForm={setOpenForm} onSave={getSeverityRules} row={row} />
      )}
    </div>
  );
};

export default SeverityRules;
