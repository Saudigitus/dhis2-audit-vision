import { useState } from 'react';
import { Globe, Bell, Database, AlertCircle, Trash2, Plus } from 'lucide-react';

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
        enabled ? 'bg-[#3b82f6]' : 'bg-[#cbd5e1]'
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

interface SeverityRule {
  id: number;
  severity: 'high' | 'medium' | 'low';
  action: string;
  objectType: string;
}

const severityBadge: Record<string, string> = {
  high: 'bg-[#fee2e2] text-[#ef4444]',
  medium: 'bg-[#fef3c7] text-[#d97706]',
  low: 'bg-[#dcfce7] text-[#16a34a]',
};

export default function SettingsPage() {
  const [instanceUrl, setInstanceUrl] = useState('https://play.dhis2.org/40');
  const [pollingInterval, setPollingInterval] = useState('5 minutes');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [highRiskOnly, setHighRiskOnly] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [retention, setRetention] = useState('90 days');
  const [autoBackup, setAutoBackup] = useState(true);

  const [rules, setRules] = useState<SeverityRule[]>([
    { id: 1, severity: 'high', action: 'DELETE', objectType: 'organisationUnit' },
    { id: 2, severity: 'high', action: 'DELETE', objectType: 'indicator' },
    { id: 3, severity: 'medium', action: 'UPDATE', objectType: 'program' },
    { id: 4, severity: 'low', action: 'CREATE', objectType: 'dataElement' },
  ]);

  const [newAction, setNewAction] = useState('DELETE');
  const [newObjectType, setNewObjectType] = useState('organisationUnit');
  const [newSeverity, setNewSeverity] = useState('high');

  const deleteRule = (id: number) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const addRule = () => {
    const newRule: SeverityRule = {
      id: Date.now(),
      severity: newSeverity as 'high' | 'medium' | 'low',
      action: newAction,
      objectType: newObjectType,
    };
    setRules(prev => [...prev, newRule]);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Notifications */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">Notifications</h3>
        </div>

        <div className="space-y-0 divide-y divide-[#e2e8f0]">
          <div className="flex items-center justify-between py-4 first:pt-0">
            <div>
              <div className="text-sm font-semibold text-[#0f172a]">Email Alerts</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">Receive alerts via email</div>
            </div>
            <Toggle enabled={emailAlerts} onToggle={() => setEmailAlerts(!emailAlerts)} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <div className="text-sm font-semibold text-[#0f172a]">High-Risk Alerts Only</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">Only notify on high severity events</div>
            </div>
            <Toggle enabled={highRiskOnly} onToggle={() => setHighRiskOnly(!highRiskOnly)} />
          </div>
          <div className="flex items-center justify-between py-4 last:pb-0">
            <div>
              <div className="text-sm font-semibold text-[#0f172a]">Weekly Digest</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">Summary email every Monday</div>
            </div>
            <Toggle enabled={weeklyDigest} onToggle={() => setWeeklyDigest(!weeklyDigest)} />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Database size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">Data Management</h3>
        </div>

        <div className="space-y-0 divide-y divide-[#e2e8f0]">
          <div className="pb-4">
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Audit Log Retention (days)</label>
            <select
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
              <option>180 days</option>
              <option>365 days</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <div className="text-sm font-semibold text-[#0f172a]">Auto Backup</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">Daily backup of audit data</div>
            </div>
            <Toggle enabled={autoBackup} onToggle={() => setAutoBackup(!autoBackup)} />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-4">
        <button className="bg-[#3b82f6] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors cursor-pointer">
          Save Settings
        </button>
      </div>
    </div>
  );
}
