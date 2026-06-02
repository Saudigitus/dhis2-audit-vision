import { useState } from 'react';
import { Link, AlertCircle, X, Database, ServerCrash, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuditApi } from '../hooks/auditApi/useSaveAuditApi';
import { DataStoreConfigState } from '../packages/wrapper/types/DataStoreSchema';
import { useRecoilValue } from 'recoil';
import useShowAlerts from '../packages/wrapper/hooks/alert/useShowAlert';
import { ErrorsSchema } from '../schema/errorsSchema';

export default function SettingsPage() {
  const dataStoreDataState = useRecoilValue(DataStoreConfigState)
  const [retention, setRetention] = useState(dataStoreDataState?.auditApi ?? '');
  const { hide, show } = useShowAlerts()
  const setErros = useRecoilValue(ErrorsSchema)
  const { loading, updateApi } = useAuditApi()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalErrors = (setErros?.sqlViews?.length || 0) + (setErros?.webHooks?.length || 0) + (setErros?.routes?.length || 0);

  return (
    <div className="max-w-3xl space-y-6">

      {/* Error Alert Banner */}
      {totalErrors > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-900">System Configuration Errors</h4>
              <p className="text-xs text-red-700 mt-0.5">We found {totalErrors} issue(s) that need your attention.</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
          >
            View Errors
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Link size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">Audit API</h3>
        </div>

        <div className="space-y-0 divide-y divide-[#e2e8f0]">
          <div className="pb-4">
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Audit API Base URL</label>
            <input
              value={retention}
              type='text'
              onChange={(e) => setRetention(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
            <p className="text-xs text-[#94a3b8] mt-2 ml-1">
              Enter your base URL (e.g. <span className="font-mono text-[#64748b]">https://your-server.com</span>).
              We'll automatically append <span className="font-mono text-[#64748b]">/api/endpoint?params</span> to make requests.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-4">
        <button
          onClick={async () => {
            try {
              new URL(retention);
              await updateApi(retention);
            } catch {
              show({
                message: `Please setup a valid URL`,
                type: { critical: true }
              });
              setTimeout(hide, 5000);
            }
          }}
          disabled={loading}
          className="flex items-center gap-2 bg-[#3b82f6] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2563eb] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeDasharray="56.5" strokeDashoffset="42" strokeLinecap="round" />
            </svg>
          )}
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Errors Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f172a]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 text-red-600 rounded-xl shadow-sm">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">System Errors</h2>
                  <p className="text-sm text-gray-500 font-medium">Found {totalErrors} issues in configuration</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/30">
              {setErros?.sqlViews && setErros.sqlViews.length > 0 && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <Database size={16} className="text-blue-500" />
                    SQL Views Errors ({setErros.sqlViews.length})
                  </h3>
                  <div className="grid gap-3">
                    {setErros.sqlViews.map((err, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-red-100 shadow-sm rounded-xl hover:border-red-200 transition-colors">
                        <div className="p-1.5 bg-red-50 rounded-lg shrink-0 mt-0.5">
                          <AlertCircle size={16} className="text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                              {typeof err.object === 'object' ? (err.object?.name || 'Unknown Object') : String(err.object)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 font-mono text-[13px] leading-relaxed break-words whitespace-pre-wrap bg-red-50/50 p-3 rounded-lg border border-red-50">
                            {typeof err.error === 'object' ? JSON.stringify(err.error, null, 2) : String(err.error)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {setErros?.webHooks && setErros.webHooks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <ServerCrash size={16} className="text-purple-500" />
                    WebHooks Errors ({setErros.webHooks.length})
                  </h3>
                  <div className="grid gap-3">
                    {setErros.webHooks.map((err, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-purple-100 shadow-sm rounded-xl hover:border-purple-200 transition-colors">
                        <div className="p-1.5 bg-purple-50 rounded-lg shrink-0 mt-0.5">
                          <AlertCircle size={16} className="text-purple-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                              {typeof err.object === 'object' ? (err.object?.name || 'Unknown Object') : String(err.object)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 font-mono text-[13px] leading-relaxed break-words whitespace-pre-wrap bg-purple-50/50 p-3 rounded-lg border border-purple-50 overflow-x-auto">
                            {typeof err.error === 'object' ? JSON.stringify(err.error, null, 2) : String(err.error)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {setErros?.routes && setErros.routes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <Link size={16} className="text-blue-500" />
                    Routes Errors ({setErros.routes.length})
                  </h3>
                  <div className="grid gap-3">
                    {setErros.routes.map((err, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-blue-100 shadow-sm rounded-xl hover:border-blue-200 transition-colors">
                        <div className="p-1.5 bg-blue-50 rounded-lg shrink-0 mt-0.5">
                          <AlertCircle size={16} className="text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                              {typeof err.object === 'object' ? (err.object?.name || 'Routes') : String(err.object)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 font-mono text-[13px] leading-relaxed break-words whitespace-pre-wrap bg-blue-50/50 p-3 rounded-lg border border-blue-50 overflow-x-auto">
                            {typeof err.error === 'object' ? JSON.stringify(err.error, null, 2) : String(err.error)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {totalErrors === 0 && (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">All Systems Go</h3>
                  <p className="text-gray-500 mt-2 font-medium">No errors found in SQL Views or WebHooks.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/80 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
