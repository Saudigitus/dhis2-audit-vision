import { AlertTriangle, Plus, X } from 'lucide-react';
import SeverityForm from '../components/severityForm/severityForm';
import { useState } from 'react';
import Table from '../components/table/Table';
import { severityHeaders } from '../constants/common/auditTableHeaders';
import { SeverityRulesSchema } from '../schema/severityRulesSchema';
import { useRecoilValue } from 'recoil';
import { severityRulesFormater } from '../utils/table/rowFormatter';


const SeverityRules = () => {
  const [openForm, setOpenForm] = useState(false);
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const data = useRecoilValue(SeverityRulesSchema)

  return (
    <div className="max-w-12xl mx-auto space-y-5 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">Severity Rules</span>
          </div>
        </div>
        <button
          onClick={() => setOpenForm(!openForm)}
          className={`flex items-center gap-2 text-sm font-bold rounded-xl px-4 py-2 transition-all active:scale-95 border ${
            openForm 
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
          loading={false}
          pagination={{ ...data?.pager!, setPage, setPageSize }}
          header={severityHeaders}
          title='Severity rules'
          description='Manage your DHIS2 Audit Vision severity rules.'
          tabledata={severityRulesFormater(data?.notifications ?? [])}
        />
      ) : (
        <SeverityForm />
      )}
    </div>
  );
};

export default SeverityRules;
