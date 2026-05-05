import { AlertTriangle, Plus, X } from 'lucide-react';
import SeverityForm from '../components/severityForm/severityForm';
import { useRef, useState } from 'react';
import Table from '../components/table/Table';
import { severityHeaders } from '../constants/common/auditTableHeaders';
import { SeverityRulesSchema } from '../schema/severityRulesSchema';
import { useRecoilValue } from 'recoil';
import { severityRulesFormater } from '../utils/table/rowFormatter';
import ConfirmDialog from '../components/confirm/confirmDialog';
import { useDeleteSeverityRule } from '../hooks/severityRules/useDeleteSeverityRule';
import { useGetSeverityRules } from '../hooks/severityRules/useGetSeverityRules';

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

  const notifications = data?.notifications ?? [];
  const total = data?.pager?.total!;
  const pageCount = Math.ceil(total / pageSize);
  const slicedNotifications = notifications.slice((page - 1) * pageSize, page * pageSize);

  const onRowClick = (selected: any) => {
    const originalData = slicedNotifications.find((x: any) => x.id == selected.id)
    if (!originalData) return
    setSelectedRow({ ...selected, messageTemplate: originalData?.messageTemplate, objectType: originalData?.objectType, contacts: originalData?.recipients?.to?.map((x: string) => ({ value: x, label: x, type: 'email' })) })
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
        <button
          onClick={() => setOpenForm(!openForm)}
          className={`flex items-center gap-2 text-sm font-bold rounded-xl px-4 py-2 transition-all active:scale-95 border ${openForm
            ? 'text-red-600 hover:bg-red-50 border-red-200'
            : 'text-blue-600 hover:bg-blue-50 border-blue-200'
            }`}
        >
          {!openForm ? <Plus size={16} /> : <X size={16} />}
          {!openForm ? 'Add Rule' : 'Close'}
        </button>
      </div>

      {!openForm ? (
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
      ) : (
        <SeverityForm setOpenForm={setOpenForm} onSave={getSeverityRules} row={row} />
      )}
    </div>
  );
};

export default SeverityRules;
