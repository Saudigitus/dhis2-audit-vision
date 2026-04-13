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
      {/* DHIS2 Connection */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Globe size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">DHIS2 Connection</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Instance URL</label>
            <input
              type="text"
              value={instanceUrl}
              onChange={(e) => setInstanceUrl(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Polling Interval (minutes)</label>
            <select
              value={pollingInterval}
              onChange={(e) => setPollingInterval(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option>1 minute</option>
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Severity Rules */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">Severity Rules</h3>
        </div>
        <p className="text-xs text-[#64748b] mb-5">Define the importance level for specific action + object combinations.</p>

        <div className="space-y-3 mb-5">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center gap-3 bg-[#f8fafc] rounded-lg px-4 py-3 border border-[#e2e8f0]"
            >
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase ${severityBadge[rule.severity]}`}>
                {rule.severity}
              </span>
              <span className="text-sm font-bold text-[#0f172a]">{rule.action}</span>
              <span className="text-sm text-[#64748b]">on</span>
              <span className="text-sm font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">{rule.objectType}</span>
              <div className="flex-1" />
              <button
                onClick={() => deleteRule(rule.id)}
                className="p-1.5 text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fef2f2] rounded transition-colors cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Rule */}
        <div className="border-t border-[#e2e8f0] pt-5">
          <p className="text-sm font-medium text-[#0f172a] mb-3">Add New Rule</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-[#0f172a] mb-1">Action</label>
              <select
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              >
                <option>DELETE</option>
                <option>UPDATE</option>
                <option>CREATE</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0f172a] mb-1">Object Type</label>
              <select
                value={newObjectType}
                onChange={(e) => setNewObjectType(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              >
                <option>organisationUnit</option>
                <option>dataElement</option>
                <option>indicator</option>
                <option>dataSet</option>
                <option>program</option>
                <option>categoryCombo</option>
                <option>trackedEntityType</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0f172a] mb-1">Severity</label>
              <select
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              >
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
            </div>
          </div>
          <button
            onClick={addRule}
            className="flex items-center gap-1.5 text-sm font-medium text-[#0f172a] border border-[#e2e8f0] rounded-lg px-4 py-2 hover:bg-[#f8fafc] transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Add Rule
          </button>
        </div>
      </div>

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
