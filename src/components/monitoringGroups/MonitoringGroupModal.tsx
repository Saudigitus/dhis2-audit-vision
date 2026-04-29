import { useEffect, useState } from 'react';
import { Plus, Search, FolderGit2, Layers, X, Check } from 'lucide-react';
import { MonitoringGroup, MonitoringGroupItem } from '../../types/monitoringGroups/MonitoringGroupsTypes';
import { useSaveMonitoringGroup } from '../../hooks/monitoringGroup/useSaveMonitoringGroup';
import { CircularLoader, LinearLoader } from '@dhis2/ui';

const availableItems: MonitoringGroupItem[] = [
    { id: 'p1', name: 'HIV Care and Treatment', type: 'program' },
    { id: 'p2', name: 'PMTCT', type: 'program' },
    { id: 'p3', name: 'Malaria Case Investigation', type: 'program' },
    { id: 'p4', name: 'TB Program', type: 'program' },
    { id: 'p5', name: 'COVID-19 Vaccination', type: 'program' },
    { id: 'ds1', name: 'HIV Monthly Summary', type: 'dataSet' },
    { id: 'ds2', name: 'Malaria Weekly Report', type: 'dataSet' },
    { id: 'ds3', name: 'TB Register', type: 'dataSet' },
    { id: 'ds4', name: 'Facility Assessment', type: 'dataSet' },
];

interface MonitoringGroupsModal {
    isModalOpen: boolean
    onCompleteSave: () => void
    editingGroup: MonitoringGroup | null
    setIsModalOpen: (arg: boolean) => void
    setEditingGroup: (arg: MonitoringGroup | null) => void
}

export default function MonitoringGroupsModal(props: MonitoringGroupsModal) {
    const { isModalOpen, setIsModalOpen, editingGroup, onCompleteSave } = props
    const [itemSearch, setItemSearch] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [selectedItems, setSelectedItems] = useState<MonitoringGroupItem[]>([]);

    useEffect(() => {
        setGroupName(editingGroup?.name!)
        setSelectedItems(editingGroup?.items!)
        setGroupDescription(editingGroup?.description!)
    }, [editingGroup])

    const filteredAvailableItems = availableItems.filter(item =>
        item.name.toLowerCase().includes(itemSearch.toLowerCase()) &&
        !selectedItems?.find(si => si?.id === item.id)
    );

    // save group
    const { loading, saveMonitoringGroup } = useSaveMonitoringGroup()

    const handleSaveGroup = async () => {
        if (!groupName?.trim()) return;
        await saveMonitoringGroup({
            newGroup: {
                name: groupName!,
                items: selectedItems!,
                description: groupDescription!,
                id: editingGroup?.id || `g${Date.now()}`,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            }
        }).then(() => {
            setIsModalOpen(false);
        }).finally(() => {
            onCompleteSave()
        })
    };


    const toggleItemSelection = (item: MonitoringGroupItem) => {
        if (selectedItems?.find(si => si.id === item.id)) {
            setSelectedItems(selectedItems?.filter(si => si.id !== item.id));
        } else {
            setSelectedItems([...selectedItems!, item]);
        }
    };

    return (
        <div>
            <button
                disabled={loading} onClick={() => { setIsModalOpen(true) }}
                className="flex items-center gap-2 px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-xs font-medium text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer focus:outline-none focus:ring-1 focus:border-transparent"
            >
                <Plus size={15} /> Novo Grupo
            </button>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
                            <h2 className="text-xl font-bold text-[#0f172a]">{editingGroup ? 'Editar Grupo' : 'Novo Grupo de Visualização'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#64748b] hover:bg-[#f1f5f9] p-2 rounded-lg cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8">
                            {/* Form Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Nome do Grupo</label>
                                    <input
                                        type="text"
                                        value={groupName}
                                        disabled={loading}
                                        onChange={(e) => setGroupName(e.target.value)}
                                        placeholder="Ex: HIV/SIDA Monitor"
                                        className="w-full px-4 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Descrição</label>
                                    <textarea
                                        disabled={loading}
                                        value={groupDescription}
                                        onChange={(e) => setGroupDescription(e.target.value)}
                                        placeholder="Descreva o propósito deste grupo..."
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <h4 className="text-sm font-bold text-[#0f172a] mb-3">Itens Selecionados ({selectedItems?.length})</h4>
                                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedItems?.length === 0 ? (
                                            <p className="text-sm text-[#94a3b8] italic">Nenhum item selecionado.</p>
                                        ) : (
                                            selectedItems?.map(item => (
                                                <div key={item.id} className="flex justify-between items-center p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        {item.type === 'program' ? <FolderGit2 size={16} className="text-[#3b82f6]" /> : <Layers size={16} className="text-[#8b5cf6]" />}
                                                        <span className="text-sm font-medium text-[#0f172a]">{item.name}</span>
                                                    </div>
                                                    <button disabled={loading} onClick={() => toggleItemSelection(item)} className="text-[#ef4444] hover:bg-[#fee2e2] p-1 rounded cursor-pointer">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Item Selection */}
                            <div className="flex-1 border-l border-[#e2e8f0] pl-0 md:pl-8 flex flex-col">
                                <h4 className="text-sm font-bold text-[#0f172a] mb-3">Adicionar Programas e DataSets</h4>
                                <div className="relative mb-4">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                                    <input
                                        type="text"
                                        placeholder="Buscar metadata..."
                                        value={itemSearch}
                                        onChange={(e) => setItemSearch(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                                    />
                                </div>
                                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar min-h-[300px]">
                                    {filteredAvailableItems.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => { !loading && toggleItemSelection(item) }}
                                            className="flex justify-between items-center p-3 border border-[#e2e8f0] rounded-lg cursor-pointer hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                {item.type === 'program' ? <FolderGit2 size={18} className="text-[#3b82f6]" /> : <Layers size={18} className="text-[#8b5cf6]" />}
                                                <div>
                                                    <p className="text-sm font-medium text-[#0f172a]">{item.name}</p>
                                                    <p className="text-[11px] text-[#64748b] uppercase tracking-wider">{item.type}</p>
                                                </div>
                                            </div>
                                            <Plus size={16} className="text-[#94a3b8]" />
                                        </div>
                                    ))}
                                    {filteredAvailableItems.length === 0 && (
                                        <p className="text-sm text-[#94a3b8] text-center py-4">Nenhum item encontrado.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#e2e8f0] flex justify-end gap-3 bg-[#f8fafc] rounded-b-2xl">
                            <button
                                disabled={loading}
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-medium text-[#64748b] bg-white border border-[#e2e8f0] rounded-xl hover:bg-[#f1f5f9] transition-colors cursor-pointer"
                            >

                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveGroup}
                                disabled={!groupName?.trim() || loading}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-[#3b82f6] rounded-xl hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-2"
                            >
                                {loading ? <CircularLoader small /> : <Check size={16} />}
                                Salvar Grupo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
