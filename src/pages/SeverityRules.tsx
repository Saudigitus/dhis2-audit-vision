import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Mail, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Save, 
  ShieldAlert, 
  Info,
  CheckCircle2,
  Clock,
  Phone,
  Edit2,
  X
} from 'lucide-react';

interface SeverityRule {
  id: string;
  level: 'High' | 'Medium' | 'Low';
  action: string;
  objectType: string;
}

interface NotificationContact {
  id: string;
  type: 'email' | 'whatsapp';
  value: string;
  label: string;
}

const SeverityRules = () => {
  const [rules, setRules] = useState<SeverityRule[]>([
    { id: '1', level: 'High', action: 'DELETE', objectType: 'organisationUnit' },
    { id: '2', level: 'Medium', action: 'UPDATE', objectType: 'dataElement' },
    { id: '3', level: 'Low', action: 'CREATE', objectType: 'indicator' },
  ]);

  const [newAction, setNewAction] = useState('DELETE');
  const [newObjectType, setNewObjectType] = useState('organisationUnit');
  const [newSeverity, setNewSeverity] = useState<'High' | 'Medium' | 'Low'>('High');
  const [messageTemplate, setMessageTemplate] = useState('Alerta de Auditoria: O objeto {object} do tipo {type} sofreu uma ação de {action} realizada pelo usuário {user} em {time}.');

  const [contacts, setContacts] = useState<NotificationContact[]>([
    { id: '1', type: 'email', value: 'admin@dhis2.org', label: 'System Admin' },
    { id: '2', type: 'whatsapp', value: 'DHIS2-Alerts-Group-ID', label: 'DHIS2 Alerts Group' },
  ]);

  const addRule = () => {
    const rule: SeverityRule = {
      id: Math.random().toString(36).substr(2, 9),
      level: newSeverity,
      action: newAction,
      objectType: newObjectType,
    };
    setRules([...rules, rule]);
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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Severity Rules Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <ShieldAlert size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Configuração de Regras</h2>
              </div>
            </div>
            <div className="p-0">
              <table className="w-full text-left">
                <thead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                  <tr>
                    <th className="px-6 py-4">Severity Level</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">Object Type</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          rule.level === 'High' ? 'bg-red-100 text-red-700' :
                          rule.level === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            rule.level === 'High' ? 'bg-red-500' :
                            rule.level === 'Medium' ? 'bg-orange-500' :
                            'bg-blue-500'
                          }`} />
                          {rule.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">{rule.action}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-mono bg-slate-50/50 rounded px-2 py-0.5">{rule.objectType}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteRule(rule.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Rule Form */}
            <div className="p-6 bg-slate-50/30 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Adicionar Nova Regra</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
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
              <button
                onClick={addRule}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 transition-all active:scale-95"
              >
                <Plus size={16} />
                Adicionar Regra
              </button>
            </div>
          </div>

          {/* Message Template Section */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Mensagem de Notificação</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500">Personalize a mensagem que será enviada. Use as tags para preenchimento dinâmico: <span className="font-mono text-blue-600">{"{object}, {type}, {action}, {user}, {time}"}</span>.</p>
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

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
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
          </div>
        </div>

        {/* Notification Channels Section */}
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
                <input 
                  type="text" 
                  placeholder="Nome do grupo"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
                  value={newWALabel}
                  onChange={(e) => setNewWALabel(e.target.value)}
                />
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
      </div>
    </div>
  );
};

export default SeverityRules;
