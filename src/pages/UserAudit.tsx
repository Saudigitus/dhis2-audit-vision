import { useState } from 'react';
import {
  Search,
  Filter,
  UserPlus,
  UserCog,
  UserX,
  Eye,
  ChevronDown,
  ChevronUp,
  Download,
  Shield,
} from 'lucide-react';

interface UserAuditEntry {
  id: string;
  timestamp: string;
  actor: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ACTIVATE' | 'DEACTIVATE' | 'PASSWORD_RESET';
  targetUser: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
  details: {
    field?: string;
    oldValue?: string;
    newValue?: string;
    description?: string;
  }[];
  ipAddress: string;
  userAgent: string;
}

const mockAuditData: UserAuditEntry[] = [
  {
    id: '1',
    timestamp: '2026-04-09 14:32:15',
    actor: {
      id: 'admin',
      name: 'Admin User',
      email: 'admin@dhis2.org',
      role: 'Super Admin',
    },
    action: 'CREATE',
    targetUser: {
      id: 'user_001',
      name: 'Maria Santos',
      email: 'maria.santos@health.gov',
      username: 'msantos',
    },
    details: [
      { description: 'Created new user account' },
      { field: 'Role', newValue: 'Data Manager' },
      { field: 'Organisation Unit', newValue: 'National Hospital' },
    ],
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
  {
    id: '2',
    timestamp: '2026-04-09 13:45:22',
    actor: {
      id: 'admin',
      name: 'Admin User',
      email: 'admin@dhis2.org',
      role: 'Super Admin',
    },
    action: 'UPDATE',
    targetUser: {
      id: 'user_042',
      name: 'John Doe',
      email: 'jdoe@dhis2.org',
      username: 'jdoe',
    },
    details: [
      { field: 'Role', oldValue: 'Analyst', newValue: 'Data Manager' },
      { field: 'Email', oldValue: 'john.doe@old.com', newValue: 'jdoe@dhis2.org' },
    ],
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
  {
    id: '3',
    timestamp: '2026-04-09 12:18:44',
    actor: {
      id: 'rbrown',
      name: 'Robert Brown',
      email: 'rbrown@dhis2.org',
      role: 'Data Manager',
    },
    action: 'DELETE',
    targetUser: {
      id: 'user_089',
      name: 'Test Account',
      email: 'test@temp.com',
      username: 'testuser',
    },
    details: [
      { description: 'Permanently deleted user account' },
      { description: 'All associated data archived' },
    ],
    ipAddress: '10.0.2.15',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  },
  {
    id: '4',
    timestamp: '2026-04-09 11:05:33',
    actor: {
      id: 'asmith',
      name: 'Alice Smith',
      email: 'asmith@dhis2.org',
      role: 'Analyst',
    },
    action: 'PASSWORD_RESET',
    targetUser: {
      id: 'user_023',
      name: 'Kwame Chan',
      email: 'kchan@dhis2.org',
      username: 'kchan',
    },
    details: [
      { description: 'Password reset initiated' },
      { description: 'Reset link sent to user email' },
    ],
    ipAddress: '172.16.0.22',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
  },
  {
    id: '5',
    timestamp: '2026-04-09 10:52:09',
    actor: {
      id: 'admin',
      name: 'Admin User',
      email: 'admin@dhis2.org',
      role: 'Super Admin',
    },
    action: 'DEACTIVATE',
    targetUser: {
      id: 'user_067',
      name: 'Inactive User',
      email: 'inactive@dhis2.org',
      username: 'inactive',
    },
    details: [
      { description: 'Account deactivated due to inactivity' },
      { field: 'Status', oldValue: 'Active', newValue: 'Inactive' },
    ],
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
  {
    id: '6',
    timestamp: '2026-04-09 09:30:17',
    actor: {
      id: 'kchan',
      name: 'Kwame Chan',
      email: 'kchan@dhis2.org',
      role: 'Analyst',
    },
    action: 'ACTIVATE',
    targetUser: {
      id: 'user_012',
      name: 'Mary Wilson',
      email: 'mwilson@dhis2.org',
      username: 'mwilson',
    },
    details: [
      { description: 'Account reactivated' },
      { field: 'Status', oldValue: 'Inactive', newValue: 'Active' },
    ],
    ipAddress: '10.0.5.8',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
  {
    id: '7',
    timestamp: '2026-04-09 08:15:52',
    actor: {
      id: 'admin',
      name: 'Admin User',
      email: 'admin@dhis2.org',
      role: 'Super Admin',
    },
    action: 'UPDATE',
    targetUser: {
      id: 'user_055',
      name: 'Robert Brown',
      email: 'rbrown@dhis2.org',
      username: 'rbrown',
    },
    details: [
      { field: 'Permissions', oldValue: 'Read Only', newValue: 'Read/Write' },
      { description: 'Added access to program indicators' },
    ],
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
];

const actionConfig = {
  CREATE: { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Created' },
  UPDATE: { icon: UserCog, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Updated' },
  DELETE: { icon: UserX, color: 'text-red-600', bg: 'bg-red-50', label: 'Deleted' },
  ACTIVATE: { icon: UserPlus, color: 'text-green-600', bg: 'bg-green-50', label: 'Activated' },
  DEACTIVATE: { icon: UserX, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Deactivated' },
  PASSWORD_RESET: { icon: UserCog, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Password Reset' },
};

export default function UserAudit() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredData = mockAuditData.filter((entry) => {
    const matchesSearch =
      entry.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.targetUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.targetUser.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.actor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = selectedAction === 'all' || entry.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  const toggleExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">24</p>
              <p className="text-xs text-gray-500">Users Created</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <UserCog className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">156</p>
              <p className="text-xs text-gray-500">Users Updated</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <UserX className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Users Deleted</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">42</p>
              <p className="text-xs text-gray-500">Password Resets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by actor, target user, or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">Created</option>
              <option value="UPDATE">Updated</option>
              <option value="DELETE">Deleted</option>
              <option value="ACTIVATE">Activated</option>
              <option value="DEACTIVATE">Deactivated</option>
              <option value="PASSWORD_RESET">Password Reset</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((entry) => {
                const config = actionConfig[entry.action];
                const Icon = config.icon;
                const isExpanded = expandedRow === entry.id;

                return (
                  <>
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${config.color}`} />
                          </div>
                          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{entry.actor.name}</p>
                          <p className="text-xs text-gray-500">{entry.actor.email}</p>
                          <span className="inline-flex mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {entry.actor.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{entry.targetUser.name}</p>
                          <p className="text-xs text-gray-500">@{entry.targetUser.username}</p>
                          <p className="text-xs text-gray-400">{entry.targetUser.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{entry.timestamp}</span>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {entry.ipAddress}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleExpand(entry.id)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-4 py-4">
                          <div className="border-l-2 border-blue-500 pl-4 space-y-3">
                            <h4 className="text-sm font-medium text-gray-900">Change Details</h4>
                            <div className="space-y-2">
                              {entry.details.map((detail, idx) => (
                                <div key={idx} className="text-sm">
                                  {detail.field ? (
                                    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 last:border-0">
                                      <span className="text-gray-600">{detail.field}</span>
                                      {detail.oldValue && (
                                        <span className="text-red-600 line-through">{detail.oldValue}</span>
                                      )}
                                      {detail.newValue && (
                                        <span className="text-green-600">{detail.newValue}</span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-600">{detail.description}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="pt-2 text-xs text-gray-500">
                              <p>User Agent: {entry.userAgent}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No audit records found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
