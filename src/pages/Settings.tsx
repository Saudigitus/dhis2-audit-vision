import { useState } from 'react';
import { Link } from 'lucide-react';
import { useAuditApi } from '../hooks/auditApi/useSaveAuditApi';
import { DataStoreConfigState } from '../packages/wrapper/types/DataStoreSchema';
import { useRecoilValue } from 'recoil';
import useShowAlerts from '../packages/wrapper/hooks/alert/useShowAlert';

// function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${enabled ? 'bg-[#3b82f6]' : 'bg-[#cbd5e1]'
//         }`}
//     >
//       <span
//         className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'left-[22px]' : 'left-0.5'
//           }`}
//       />
//     </button>
//   );
// }

export default function SettingsPage() {
  // const [emailAlerts, setEmailAlerts] = useState(true);
  // const [highRiskOnly, setHighRiskOnly] = useState(true);
  // const [weeklyDigest, setWeeklyDigest] = useState(false);
  const dataStoreDataState = useRecoilValue(DataStoreConfigState)
  const [retention, setRetention] = useState(dataStoreDataState?.auditApi ?? '');
  const { hide, show } = useShowAlerts()

  const { loading, updateApi } = useAuditApi()
  // const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="max-w-3xl space-y-6">

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
            className="flex items-center gap-2 bg-[#3b82f6] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2563eb] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
      </div>
    </div>
  );
}
