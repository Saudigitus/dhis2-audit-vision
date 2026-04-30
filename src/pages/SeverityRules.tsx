import { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Plus,
  Trash2,
  Save,
  ShieldAlert,
  Edit2,
  X,
  AlertTriangle
} from 'lucide-react';

interface SeverityRule {
  id: string;
  level: 'High' | 'Medium' | 'Low';
  action: string;
  objectType: string;
  includeMessage: boolean;
  emails: string[];
  includeWhatsapp: boolean;
  customMessage?: string;
}

interface NotificationContact {
  id: string;
  type: 'email' | 'whatsapp';
  value: string;
  label: string;
}

const SeverityRules = () => {
  const [rules, setRules] = useState<SeverityRule[]>([
    {
      id: '1',
      level: 'High',
      action: 'DELETE',
      objectType: 'organisationUnit',
      includeMessage: true,
      emails: ['admin@dhis2.org'],
      includeWhatsapp: true,
      customMessage: ''
    },
    {
      id: '2',
      level: 'Medium',
      action: 'UPDATE',
      objectType: 'dataElement',
      includeMessage: false,
      emails: [],
      includeWhatsapp: false,
      customMessage: ''
    },
    {
      id: '3',
      level: 'Low',
      action: 'CREATE',
      objectType: 'indicator',
      includeMessage: true,
      emails: ['user@dhis2.org'],
      includeWhatsapp: false,
      customMessage: ''
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  const [newAction, setNewAction] = useState('DELETE');
  const [newObjectType, setNewObjectType] = useState('organisationUnit');
  const [newSeverity, setNewSeverity] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newIncludeMessage, setNewIncludeMessage] = useState(true);
  const [newEmails, setNewEmails] = useState<string[]>([]);
  const [newIncludeWhatsapp, setNewIncludeWhatsapp] = useState(false);
  const [newCustomMessage, setNewCustomMessage] = useState('');

  const [messageTemplate, setMessageTemplate] = useState('Alerta de Auditoria: O objeto {object} do tipo {type} sofreu uma ação de {action} realizada pelo usuário {user} em {time}.');

  const [contacts, setContacts] = useState<NotificationContact[]>([
    { id: '1', type: 'email', value: 'admin@dhis2.org', label: 'System Admin' },
    { id: '2', type: 'whatsapp', value: 'DHIS2-Alerts-Group-ID', label: 'DHIS2 Alerts Group' },
  ]);

  const resetForm = () => {
    setNewAction('DELETE');
    setNewObjectType('organisationUnit');
    setNewSeverity('High');
    setNewIncludeMessage(true);
    setNewEmails([]);
    setNewIncludeWhatsapp(false);
    setNewCustomMessage('');
    setEditingRuleId(null);
    setIsFormOpen(false);
  };

  const handleAddRule = () => {
    setEditingRuleId(null);
    resetForm();
    setIsFormOpen(true);
  };

  const handleEditRule = (rule: SeverityRule) => {
    setEditingRuleId(rule.id);
    setNewAction(rule.action);
    setNewObjectType(rule.objectType);
    setNewSeverity(rule.level);
    setNewIncludeMessage(rule.includeMessage);
    setNewEmails(rule.emails);
    setNewIncludeWhatsapp(rule.includeWhatsapp);
    setNewCustomMessage(rule.customMessage || '');
    setIsFormOpen(true);
  };

  const saveRule = () => {
    if (editingRuleId) {
      setRules(rules.map(r => r.id === editingRuleId ? {
        ...r,
        level: newSeverity,
        action: newAction,
        objectType: newObjectType,
        includeMessage: newIncludeMessage,
        emails: newEmails,
        includeWhatsapp: newIncludeWhatsapp,
        customMessage: newCustomMessage,
      } : r));
    } else {
      const rule: SeverityRule = {
        id: Math.random().toString(36).substr(2, 9),
        level: newSeverity,
        action: newAction,
        objectType: newObjectType,
        includeMessage: newIncludeMessage,
        emails: newEmails,
        includeWhatsapp: newIncludeWhatsapp,
        customMessage: newCustomMessage,
      };
      setRules([...rules, rule]);
    }
    resetForm();
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const [newEmail, setNewEmail] = useState('');
  const [newWA, setNewWA] = useState('');
  const [newWALabel, setNewWALabel] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addOrUpdateContact = (type: 'email' | 'whatsapp', value: string, label: string) => {
    if (!value) return;

    if (editingId) {
      setContacts(contacts.map(c => c.id === editingId ? { ...c, value, label: label || value } : c));
      setEditingId(null);
    } else {
      const newContact: NotificationContact = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        value,
        label: label || value
      };
      setContacts([...contacts, newContact]);
    }

    if (type === 'email') setNewEmail('');
    else {
      setNewWA('');
      setNewWALabel('');
    }
  };

  const startEdit = (contact: NotificationContact) => {
    setEditingId(contact.id);
    if (contact.type === 'email') {
      setNewEmail(contact.value);
    } else {
      setNewWA(contact.value);
      setNewWALabel(contact.label);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewEmail('');
    setNewWA('');
    setNewWALabel('');
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-12xl mx-auto space-y-5 pb-12">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">Severity Rules</span>
          </div>
        </div>
        <div className="flex items-center gap-3">  </div>
      </div>

      {!isFormOpen ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <ShieldAlert size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Configuração de Regras</h2>
              </div>
              <button
                onClick={handleAddRule}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 transition-all active:scale-95"
              >
                <Plus size={16} />
                Adicionar Regra
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
                  {rules.map((rule) => (
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
                            onClick={() => handleEditRule(rule)}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteRule(rule.id)}
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

          {/* <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl h-fit">
              <Info size={24} />
            </div>
            <div>
              <h3 className="font-bold text-blue-900">Como as regras funcionam</h3>
              <p className="text-blue-800/80 text-sm mt-1 leading-relaxed">
                As regras de severidade determinam quais eventos disparam notificações automáticas.
                Eventos de <strong>Alta Severidade</strong> são enviados para todos os canais imediatamente,
                enquanto eventos de <strong>Baixa Severidade</strong> são apenas registrados no log do sistema.
              </p>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Plus size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingRuleId ? 'Editar Regra' : 'Nova Regra de Severidade'}
                  </h2>
                </div>
                <button
                  onClick={resetForm}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Ação</label>
                    <select
                      value={newAction}
                      onChange={(e) => setNewAction(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      <option>DELETE</option>
                      <option>UPDATE</option>
                      <option>CREATE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Tipo de Objeto</label>
                    <select
                      value={newObjectType}
                      onChange={(e) => setNewObjectType(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
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
                    <label className="block text-xs font-medium text-slate-500 mb-1">Severidade</label>
                    <select
                      value={newSeverity}
                      onChange={(e) => setNewSeverity(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>


                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-500">Esta é a mensagem padrão. Use: <span className="font-mono text-blue-600">{"{object}, {type}, {action}, {user}, {time}"}</span>.</p>
                  <textarea
                    value={messageTemplate}
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm leading-relaxed"
                    placeholder="Escreva a mensagem aqui..."
                  />
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pré-visualização</h4>
                    <p className="text-sm text-slate-600 italic">
                      {messageTemplate
                        .replace('{object}', 'ANC 1st Visit')
                        .replace('{type}', 'dataElement')
                        .replace('{action}', 'DELETE')
                        .replace('{user}', 'rbrown')
                        .replace('{time}', '2026-04-25 10:19')}
                    </p>
                  </div>
                </div>


              </div>

            </div>
          </div>

          {/* Right Sidebar - Notification Contacts */}
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Mail size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Email Notifications</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <button
                    onClick={() => addOrUpdateContact('email', newEmail, '')}
                    className={`p-2.5 text-white rounded-xl transition-colors shadow-sm ${editingId && contacts.find(c => c.id === editingId)?.type === 'email' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {editingId && contacts.find(c => c.id === editingId)?.type === 'email' ? <Save size={18} /> : <Plus size={18} />}
                  </button>
                  {editingId && contacts.find(c => c.id === editingId)?.type === 'email' && (
                    <button
                      onClick={cancelEdit}
                      className="p-2.5 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {contacts.filter(c => c.type === 'email').map(contact => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">{contact.value}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(contact)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => removeContact(contact.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <MessageSquare size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">WhatsApp Groups</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="WhatsApp Group ID"
                      className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
                      value={newWA}
                      onChange={(e) => setNewWA(e.target.value)}
                    />
                    <button
                      onClick={() => addOrUpdateContact('whatsapp', newWA, newWALabel)}
                      className={`p-2.5 text-white rounded-xl transition-colors shadow-sm ${editingId && contacts.find(c => c.id === editingId)?.type === 'whatsapp' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {editingId && contacts.find(c => c.id === editingId)?.type === 'whatsapp' ? <Save size={18} /> : <Plus size={18} />}
                    </button>
                    {editingId && contacts.find(c => c.id === editingId)?.type === 'whatsapp' && (
                      <button
                        onClick={cancelEdit}
                        className="p-2.5 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {contacts.filter(c => c.type === 'whatsapp').map(contact => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">{contact.label}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{contact.value}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(contact)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => removeContact(contact.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={saveRule}
              className="flex items-center gap-2 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-2.5 transition-all active:scale-95 shadow-md shadow-blue-200"
            >
              <Save size={16} />
              {editingRuleId ? 'Atualizar Regra' : 'Salvar Regra'}
            </button>
            <button
              onClick={resetForm}
              className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeverityRules;
