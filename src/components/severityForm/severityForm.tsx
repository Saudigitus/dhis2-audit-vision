import { useState } from "react";
import { NotificationContact } from "../../types/severityRules/severityRules";
import { Edit2, Mail, MessageSquare, Plus, Save, Trash2, X } from "lucide-react";
import { usePostSeverityRules } from "../../hooks/severityRules/usePostSeverityRules";
import { metadataTypes } from "../../constants/common/dhis2Objects";

export default function SeverityForm({ setOpenForm, onSave, row }: { setOpenForm: (args: boolean) => void, onSave: () => Promise<void>, row: any }) {
    const { loading, postAuditRules } = usePostSeverityRules()
    const [form, setForm] = useState<any>({
        isOpen: false,
        ...(row ? row : {})
    });

    const resetForm = () => setForm({ isOpen: false, ...(row ? row : {}) });

    const saveRule = async () => {
        const { contactEmail, contactWA, contactWALabel, contacts, isOpen, ...rest } = form
        const payLoad = { ...rest, recipients: { cc: [], bcc: [], to: contacts?.filter((x: any) => x.type == 'email')?.map((x: any) => x.value) || [] } }

        const { error }: any = await postAuditRules(payLoad)

        if (!error) { setOpenForm(false); await onSave() }
    };

    const addOrUpdateContact = (type: 'email' | 'whatsapp', value: string, label: string) => {
        if (!value) return;

        if (form.editingContactId) {
            setForm((prev: any) => ({ ...prev, editingContactId: null, contactEmail: '', contactWA: '', contactWALabel: '' }));
        } else {
            const newContact: NotificationContact = {
                id: Math.random().toString(36).slice(2, 11),
                type,
                value,
                label: label || value
            };

            // Add the new contact to the contacts array
            setForm((prev: any) => ({ ...prev, contacts: [...prev.contacts || [], newContact], contactEmail: '', contactWA: '', contactWALabel: '' }));
        }
    };

    const removeContact = (value: string) => {
        setForm((prev: any) => ({ ...prev, contacts: prev.contacts?.filter((c: any) => c.value !== value) }))
    };

    const handleInputChange = (field: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [field]: value }));
    };
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

                <div className="p-3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Action</label>
                            <select
                                value={form.action}
                                onChange={(e) => handleInputChange('action', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            >
                                <option></option>
                                <option value={'DELETE'} >DELETE</option>
                                <option value={'UPDATE'} >UPDATE</option>
                                <option value={'CREATE'} >CREATE</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Object Type</label>
                            <select
                                value={form.objectType}
                                onChange={(e) => handleInputChange('objectType', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            >
                                <option></option>
                                {metadataTypes.map((x) => (
                                    <option key={x} value={x}>
                                        {x.replace(/([A-Z])/g, ' $1').trim()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Severity</label>
                            <select
                                value={form.severity}
                                onChange={(e) => handleInputChange('severity', e.target.value as any)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            >
                                <option></option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-6 space-y-4 mt-[-50px]">
                        <label className="block text-sm font-medium text-slate-500 mb-1">Notification subject</label>
                        <input
                            type="text"
                            value={form?.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm leading-relaxed"
                            placeholder="Write the message here..."
                        />
                    </div>

                    <div className="p-6 space-y-4 mt-[-50px] mb-[-10px]">
                        <label className="block text-sm font-medium text-slate-500 mb-1">Notification message</label>
                        <p className="text-xs text-slate-500">This is the default message. Use: <span className="font-mono text-blue-600">{"{object}, {type}, {action}, {user}, {time}"}</span>.</p>
                        <textarea
                            value={form?.messageTemplate}
                            onChange={(e) => handleInputChange('messageTemplate', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm leading-relaxed"
                            placeholder="Write the message here..."
                        />
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mt-2">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Preview example</h4>
                            <p className="text-sm text-slate-600 italic">
                                {form?.messageTemplate
                                    ?.replace('{object}', 'ANC 1st Visit')
                                    ?.replace('{type}', 'dataElement')
                                    ?.replace('{action}', 'DELETE')
                                    ?.replace('{user}', 'rbrown')
                                    ?.replace('{time}', '2026-04-25 10:19')}
                            </p>
                        </div>
                    </div>

                    <div className="p-6 space-y-3 grid grid-cols-2 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <div className="p-[10px_0_10px_20px] border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Mail size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Emails to Notify</h2>
                            </div>
                            <div className="p-[10px_20px] space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
                                        value={form.contactEmail}
                                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                    />
                                    <button
                                        onClick={() => addOrUpdateContact('email', form.contactEmail, '')}
                                        className={`p-2.5 text-white rounded-xl transition-colors shadow-sm ${form.editingContactId && form?.contacts?.find((c: any) => c.id === form.editingContactId)?.type === 'email' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        {form.editingContactId && form?.contacts?.find((c: any) => c.id === form.editingContactId)?.type === 'email' ? <Save size={18} /> : <Plus size={18} />}
                                    </button>
                                    {form.editingContactId && form?.contacts?.find((c: any) => c.id === form.editingContactId)?.type === 'email' && (
                                        <button
                                            // onClick={cancelEdit}
                                            className="p-2.5 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {form?.contacts?.filter((c: any) => c.type === 'email').map((contact: any) => (
                                        <div key={contact.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-900">{contact.value}</span>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    // onClick={() => startEdit(contact)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => removeContact(contact.value)}
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
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <div className="p-[10px_0_10px_20px] border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <MessageSquare size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">WhatsApp Groups to Notify</h2>
                            </div>
                            <div className="p-[10px_20px] space-y-4">
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="WhatsApp Group ID"
                                            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
                                            value={form.contactWA}
                                            onChange={(e) => handleInputChange('contactWA', e.target.value)}
                                        />
                                        <button
                                            onClick={() => addOrUpdateContact('whatsapp', form.contactWA, form.contactWALabel)}
                                            className={`p-2.5 text-white rounded-xl transition-colors shadow-sm ${form.editingContactId && form?.contacts?.find((c: any) => c.id === form.editingContactId)?.type === 'whatsapp' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'}`}
                                        >
                                            {form.editingContactId && form?.contacts?.find((c: any) => c.id === form.editingContactId)?.type === 'whatsapp' ? <Save size={18} /> : <Plus size={18} />}
                                        </button>
                                        {form.editingContactId && form?.contacts?.find((c: any) => c.id === form.editingContactId)?.type === 'whatsapp' && (
                                            <button
                                                // onClick={cancelEdit}
                                                className="p-2.5 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {form?.contacts?.filter((c: any) => c.type === 'whatsapp').map((contact: any) => (
                                        <div key={contact.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-900">{contact.label}</span>
                                                <span className="text-[11px] text-slate-500 font-mono">{contact.value}</span>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    // onClick={() => startEdit(contact)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => removeContact(contact.value)}
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

            <div className="flex items-center gap-3">
                <button
                    onClick={saveRule}
                    className="flex items-center gap-2 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-2.5 transition-all active:scale-95 shadow-md shadow-blue-200"
                >
                    {loading && (
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeDasharray="56.5" strokeDashoffset="42" strokeLinecap="round" />
                        </svg>
                    )}
                    {!loading && <Save size={16} />}
                    {row != null ? 'Update Rule' : loading ? 'Saving Rule...' : 'Save Rule'}
                </button>
                <button
                    onClick={resetForm}
                    className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-2"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}