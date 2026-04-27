import { ChevronLeft, X } from "lucide-react";
import HeaderDetails from "./components/headerDetails";
import { actionColors } from "../../constants/common/common";
import { useEffect, useState } from "react";
import DrawerTabs from "./components/drawerTabs";
import { CircularLoader } from "@dhis2/ui";
import { SelectedAuditProps } from "../../pages/changeExplorer/ChangeExplorer";
import { useGetuditDetails } from "../../hooks/audit/useGetAuditDetails";
import DiffViewer from "./components/diffViewer";
import { buildDiff } from "./utils/buildDiffData";

interface ChangeExplorerDrawerProps {
    setSelectedChange: (change: any | null) => void;
    setParentChange: (change: any | null) => void;
    parentChange: any | null;
    selectedChange: SelectedAuditProps;
}

export default function ChangeExplorerDrawer({ setSelectedChange, setParentChange, parentChange, selectedChange }: ChangeExplorerDrawerProps) {
    const [detailTab, setDetailTab] = useState<'diff' | 'dependencies' | 'raw'>('diff');
    const { getAuditDetails, auditDetails, loadingDetails } = useGetuditDetails()
    const diffData = buildDiff(auditDetails ?? [])

    useEffect(() => {
        if (selectedChange) {
            getAuditDetails(selectedChange.id)
        }
    }, [selectedChange])

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/20 z-50 h-[100vh]" onClick={() => setSelectedChange(null)} />
            {/* Panel */}
            <div className="fixed top-12 right-0 bottom-0 w-[560px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
                {
                    loadingDetails ? <CircularLoader /> :
                        <>
                            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0]">
                                <div className="flex items-center gap-3">
                                    {parentChange && (
                                        <button onClick={() => { setSelectedChange(parentChange); setParentChange(null); setDetailTab('dependencies'); }} className="p-1.5 hover:bg-[#f1f5f9] rounded-lg cursor-pointer text-[#64748b]">
                                            <ChevronLeft size={20} />
                                        </button>
                                    )}
                                    <h2 className="text-lg font-bold text-[#0f172a]">Change Detail</h2>
                                </div>
                                <button onClick={() => { setSelectedChange(null); setParentChange(null); }} className="p-1.5 hover:bg-[#f1f5f9] rounded-lg cursor-pointer">
                                    <X size={20} className="text-[#64748b]" />
                                </button>
                            </div>

                            {/* Panel Content */}
                            <div className="flex-1 overflow-y-auto px-6 py-5">
                                {/* Meta info */}
                                <HeaderDetails selectedRow={selectedChange} />

                                {/* Tabs */}
                                <DrawerTabs detailTab={detailTab} selectedChange={selectedChange} setDetailTab={setDetailTab} />

                                {detailTab === 'diff' ? <DiffViewer action={selectedChange.action} auditDetails={auditDetails} />
                                    : detailTab === 'dependencies' ? (
                                        /* Dependencies View */
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Dependent Changes</h3>
                                                <span className="text-xs text-[#64748b]">Found {selectedChange.dependencies?.length || 0} items</span>
                                            </div>

                                            <div className="space-y-3">
                                                {selectedChange.dependencies?.map((dep: any, i: number) => (
                                                    <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm hover:border-[#cbd5e1] transition-colors">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">{dep.type}</span>
                                                                <span className="text-sm font-semibold text-[#0f172a]">{dep.object}</span>
                                                            </div>
                                                            <span className={`text-[10px] font-bold px-2 py-1 rounded ${actionColors[dep.action]}`}>
                                                                {dep.action}
                                                            </span>
                                                        </div>

                                                        <HeaderDetails selectedRow={dep} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Raw JSON View */
                                        <div className="bg-[#0f172a] text-[#e2e8f0] rounded-lg p-4 text-xs font-mono overflow-x-auto">
                                            <pre>{JSON.stringify({
                                                id: selectedChange.object,
                                                type: selectedChange.type,
                                                action: selectedChange.action,
                                                user: selectedChange.user,
                                                timestamp: selectedChange.date,
                                                before: Object.fromEntries(diffData.map((d: any) => [d.field, d.before])),
                                                after: Object.fromEntries(diffData.map((d: any) => [d.field, d.after])),
                                            }, null, 2)}</pre>
                                        </div>
                                    )}
                            </div>
                        </>
                }
                {/* Panel Header */}
            </div>
        </>
    )
}