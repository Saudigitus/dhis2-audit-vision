import { Plus, Trash2, ShieldAlert, Edit2, AlertTriangle } from 'lucide-react';
import { SeverityRule } from '../types/severityRules/severityRules';
import SeverityForm from '../components/severityForm/severityForm';
import { useState } from 'react';


const SeverityRules = () => {
  const [openForm, setOpenForm] = useState(true);
  const [rules, _] = useState([]);

  return (
    <div className="max-w-12xl mx-auto space-y-5 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">Severity Rules</span>
          </div>
        </div>
        <div className="flex items-center gap-3">  </div>
      </div>

      {!openForm ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <ShieldAlert size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Rule Configuration</h2>
              </div>
              <button
                onClick={() => setOpenForm(true)}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 transition-all active:scale-95"
              >
                <Plus size={16} />
                Add Rule
              </button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                  <tr>
                    <th className="px-6 py-4">Severity Level</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">Object Type</th>
                    <th className="px-6 py-4">Include Message</th>
                    <th className="px-6 py-4">Number of Emails</th>
                    <th className="px-6 py-4">Include WhatsApp Group</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rules?.map((rule: SeverityRule) => (
                    <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${rule.level === 'High' ? 'bg-red-100 text-red-700' :
                          rule.level === 'Medium' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${rule.level === 'High' ? 'bg-red-500' :
                            rule.level === 'Medium' ? 'bg-orange-500' :
                              'bg-blue-500'
                            }`} />
                          {rule.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">{rule.action}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-mono bg-slate-50/50 rounded px-2 py-0.5">{rule.objectType}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 text-center">
                        {rule.includeMessage ? (
                          <span className="text-green-600 font-bold">YES</span>
                        ) : (
                          <span className="text-slate-400">NO</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 text-center font-bold">
                        {rule.emails.length}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 text-center">
                        {rule.includeWhatsapp ? (
                          <span className="text-green-600 font-bold">YES</span>
                        ) : (
                          <span className="text-slate-400">NO</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => () => { }}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => () => { }}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <SeverityForm />
      )}
    </div>
  );
};

export default SeverityRules;
