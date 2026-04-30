import { cn } from '../../utils/cn';
import { CircularLoader } from '@dhis2/ui';
import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, FolderGit2, Layers, X, Check, LoaderCircle } from 'lucide-react';
import { useGetMonitoringItems } from '../../hooks/monitoringGroup/useGetMonitoringItems';
import { useManageMonitoringGroup } from '../../hooks/monitoringGroup/useManageMonitoringGroup';
import { MonitoringGroup, MonitoringGroupItem } from '../../types/monitoringGroups/MonitoringGroupsTypes';

interface MonitoringGroupsModal {
    isModalOpen: boolean
    onCompleteSave: () => void
    editingGroup: MonitoringGroup | null
    setIsModalOpen: (arg: boolean) => void
    setEditingGroup: (arg: MonitoringGroup | null) => void
}

const FILTER_TABS = [
    { key: 'all', label: 'All' },
    { key: 'program', label: 'Programs' },
    { key: 'dataSet', label: 'DataSets' },
];


export default function MonitoringGroupsModal(props: MonitoringGroupsModal) {
    const { isModalOpen, setIsModalOpen, editingGroup, onCompleteSave, setEditingGroup } = props
    const [groupName, setGroupName] = useState('');
    const [itemSearch, setItemSearch] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const { loading, manageMonitoringGroup } = useManageMonitoringGroup()
    const [selectedItems, setSelectedItems] = useState<MonitoringGroupItem[]>([]);
    const { data: monitoringItems, getMonitoringItems, loading: gettingMonitoringItems } = useGetMonitoringItems()
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        getMonitoringItems()
    }, [])

    useEffect(() => {
        setGroupName(editingGroup?.name!)
        setSelectedItems(editingGroup?.items! || [])
        setGroupDescription(editingGroup?.description!)
    }, [editingGroup])

    const getItemName = (id: string) => {
        return monitoringItems?.find((item) => item?.id == id)?.name || `Error loading name. Check the maintenance section to see if the program with ID ${id} exists.`
    }

    const filteredAvailableItems = monitoringItems?.filter(item =>
        getItemName(item?.id).toLowerCase().includes(itemSearch.toLowerCase()) &&
        !selectedItems?.find(si => si?.id === item?.id)
    );

    const typeCounts = useMemo(() => {
        const counts: any = {};
        filteredAvailableItems.forEach((item) => { counts[item?.type] = (counts[item?.type] || 0) + 1; });
        return counts;
    }, [filteredAvailableItems]);

    const filtered = useMemo(() => filteredAvailableItems.filter((item) => {
        const matchesSearch = getItemName(item?.id).toLowerCase().includes(itemSearch?.toLowerCase());
        const matchesFilter = activeFilter === 'all' || item?.type === activeFilter;
        return matchesSearch && matchesFilter;
    }), [filteredAvailableItems, itemSearch, activeFilter]);

    const handleClose = () => {
        setIsModalOpen(false)
        setEditingGroup(null)
    }

    const handleSaveGroup = async () => {
        if (!groupName?.trim()) return;
        await manageMonitoringGroup({
            group: {
                name: groupName!,
                items: selectedItems?.map((item) => ({
                    id: item?.id,
                    type: item?.type
                }))!,
                description: groupDescription!,
                id: editingGroup?.id || `g${Date.now()}`,
                updatedAt: new Date().toISOString()?.split('T')[0],
                createdAt: editingGroup?.createdAt || new Date().toISOString()?.split('T')[0],
            }
        }).then(() => {
            setGroupName('')
            setSelectedItems([])
            setEditingGroup(null);
            setIsModalOpen(false);
            setGroupDescription('')
        }).finally(() => {
            onCompleteSave()
        })
    };

    const toggleItemSelection = (item: MonitoringGroupItem) => {
        if (selectedItems?.find(si => si.id === item?.id)) {
            setSelectedItems(selectedItems?.filter(si => si.id !== item?.id));
        } else {
            setSelectedItems([...selectedItems!, item]);
        }
    };

    return (
        <div>
            <button
                onClick={() => { setIsModalOpen(true) }}
                disabled={loading || gettingMonitoringItems}
                className="flex items-center gap-2 px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-xs font-medium text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer focus:outline-none focus:ring-1 focus:border-transparent"
            >
                {gettingMonitoringItems ? <LoaderCircle size={15} className="animate-spin" /> : <Plus size={15} />}
                New Group
            </button>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
                            <h2 className="text-xl font-bold text-[#0f172a]">{editingGroup ? 'Update Group' : 'New Group'}</h2>
                            <button onClick={() => handleClose()} className="text-[#64748b] hover:bg-[#f1f5f9] p-2 rounded-lg cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8">
                            {/* Form Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Group Name</label>
                                    <input
                                        type="text"
                                        value={groupName}
                                        disabled={loading}
                                        onChange={(e) => setGroupName(e.target.value)}
                                        placeholder="Ex: HIV/AIDS Monitor"
                                        className="w-full px-4 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Description</label>
                                    <textarea
                                        disabled={loading}
                                        value={groupDescription}
                                        onChange={(e) => setGroupDescription(e.target.value)}
                                        placeholder="Describe the purpose of this group..."
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <h4 className="text-sm font-bold text-[#0f172a] mb-3">Selected Items({selectedItems?.length})</h4>
                                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedItems?.length === 0 ? (
                                            <p className="text-sm text-[#94a3b8] italic">No selected items yet.</p>
                                        ) : (
                                            selectedItems?.map(item => (
                                                <div key={item?.id} className="flex justify-between items-center p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        {item?.type === 'program' ? <FolderGit2 size={16} className="text-[#3b82f6]" /> : <Layers size={16} className="text-[#8b5cf6]" />}
                                                        <span className="text-sm font-medium text-[#0f172a]">{getItemName(item?.id)}</span>
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
                                <h4 className="text-sm font-bold text-[#0f172a] mb-3">Add Programs & DataSets</h4>
                                <div className="relative mb-4">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                                    <input
                                        type="text"
                                        placeholder="Searcch metadata..."
                                        value={itemSearch}
                                        onChange={(e) => setItemSearch(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {FILTER_TABS.map((tab) => {
                                        const count = tab.key === 'all' ? filteredAvailableItems.length : (typeCounts[tab.key] || 0);
                                        if (tab.key !== 'all' && count === 0) return null;
                                        return (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveFilter(tab.key)}
                                                className={cn(
                                                    'px-3 py-1.5 rounded-lg font-semibold tracking-wide transition-all duration-200 ease-in-out',
                                                    activeFilter === tab.key
                                                        ? 'bg-[#3b82f6] text-white'
                                                        : 'bg-[#f5f5f5] text-slate-600 hover:bg-slate-20',
                                                )}
                                            >
                                                <span className='text-xs'>{tab.label}</span>
                                                <span className="text-xs ml-1">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar min-h-[300px]">
                                    {filtered?.map(item => (
                                        <div
                                            key={item?.id}
                                            onClick={() => { !loading && toggleItemSelection(item) }}
                                            className="flex justify-between items-center p-3 border border-[#e2e8f0] rounded-lg cursor-pointer hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                {item?.type === 'program' ? <FolderGit2 size={18} className="text-[#3b82f6]" /> : <Layers size={18} className="text-[#8b5cf6]" />}
                                                <div>
                                                    <p className="text-sm font-medium text-[#0f172a]">{getItemName(item?.id)}</p>
                                                    <p className="text-[11px] text-[#64748b] uppercase tracking-wider">{item?.type}</p>
                                                </div>
                                            </div>
                                            <Plus size={16} className="text-[#94a3b8]" />
                                        </div>
                                    ))}
                                    {filtered?.length === 0 && (
                                        <p className="text-sm text-[#94a3b8] text-center py-4">No item was found.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#e2e8f0] flex justify-end gap-3 bg-[#f8fafc] rounded-b-2xl">
                            <button
                                disabled={loading}
                                onClick={() => handleClose()}
                                className="px-5 py-2.5 text-sm font-medium text-[#64748b] bg-white border border-[#e2e8f0] rounded-xl hover:bg-[#f1f5f9] transition-colors cursor-pointer"
                            >

                                Cancel
                            </button>
                            <button
                                onClick={handleSaveGroup}
                                disabled={!groupName?.trim() || loading}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-[#3b82f6] rounded-xl hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-2"
                            >
                                {loading ? <CircularLoader small /> : <Check size={16} />}
                                Save Group
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
