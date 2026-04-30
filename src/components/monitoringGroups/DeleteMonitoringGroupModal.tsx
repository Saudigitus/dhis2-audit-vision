import { cn } from '../../utils/cn';
import { CircularLoader } from '@dhis2/ui';
import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, FolderGit2, Layers, X, Check } from 'lucide-react';
import { useGetMonitoringItems } from '../../hooks/monitoringGroup/useGetMonitoringItems';
import { useManageMonitoringGroup } from '../../hooks/monitoringGroup/useManageMonitoringGroup';
import { MonitoringGroup, MonitoringGroupItem } from '../../types/monitoringGroups/MonitoringGroupsTypes';

interface DeleteMonitoringGroupsModalProps {
    isModalOpen: boolean
    onCompleteDelete: () => void
    deletingGroup: MonitoringGroup | null
    setIsModalOpen: (arg: boolean) => void
    setDeletingGroup: (arg: MonitoringGroup | null) => void
}


export default function DeleteMonitoringGroupsModal(props: DeleteMonitoringGroupsModalProps) {
    const { loading, manageMonitoringGroup } = useManageMonitoringGroup()
    const { isModalOpen, setIsModalOpen, deletingGroup, onCompleteDelete, setDeletingGroup } = props

    const handleClose = () => {
        setIsModalOpen(false)
        setDeletingGroup(null)
    }

    const handleDeleteGroup = async () => {
        if (!deletingGroup?.name?.trim()) return;
        await manageMonitoringGroup({
            mode: "delete",
            group: deletingGroup
        }).then(() => {
            setDeletingGroup(null);
            setIsModalOpen(false);
        }).finally(() => {
            onCompleteDelete()
        })
    };

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
                            <h2 className="text-xl font-bold text-[#0f172a]">Delete monitoring group?</h2>
                            <button onClick={() => handleClose()} className="text-[#64748b] hover:bg-[#f1f5f9] p-2 rounded-lg cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8">
                            {/* Left: Icon & Group Name */}
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                    <FolderGit2 className="text-red-500" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Group Name</p>
                                    <p className="text-lg font-semibold text-slate-900">{deletingGroup?.name || '—'}</p>
                                </div>
                            </div>

                            {/* Right: Stats & Warning */}
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg border border-slate-200 p-3">
                                        <p className="text-sm text-slate-500">Items</p>
                                        <p className="text-xl font-bold text-slate-900">{deletingGroup?.items?.length || 0}</p>
                                    </div>
                                    <div className="rounded-lg border border-slate-200 p-3">
                                        <p className="text-sm text-slate-500">Last Modified</p>
                                        <p className="text-sm font-medium text-slate-900">
                                            {deletingGroup?.updatedAt
                                                ? new Date(deletingGroup?.updatedAt).toLocaleDateString()
                                                : '—'}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
                                    <Layers className="text-amber-500 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-sm font-medium text-amber-800">Heads-up</p>
                                        <p className="text-sm text-amber-700">
                                            Deleting this group will remove it from every dashboard that references it. This action cannot be undone.
                                        </p>
                                    </div>
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
                                onClick={handleDeleteGroup}
                                disabled={!deletingGroup?.name?.trim() || loading}
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-2"
                            >
                                {loading ? <CircularLoader small /> : <Check size={16} />}
                                Delete Group
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
