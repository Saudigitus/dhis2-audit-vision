import { ChevronLeft, ChevronRight, History, X } from "lucide-react";
import HeaderDetails from "./components/headerDetails";
import { actionColors, actionDot, actionOutline } from "../../constants/common/common";
import { useState } from "react";
import DrawerTabs from "./components/drawerTabs";

interface ChangeExplorerDrawerProps {
    setSelectedChange: (change: any | null) => void;
    setParentChange: (change: any | null) => void;
    parentChange: any | null;
    selectedChange: any;
    changeHistory: any[];
    diffData: any;
}

export default function ChangeExplorerDrawer({ setSelectedChange, setParentChange, parentChange, selectedChange, changeHistory, diffData }: ChangeExplorerDrawerProps) {
    const [detailTab, setDetailTab] = useState<'diff' | 'dependencies' | 'raw'>('diff');

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/20 z-50 h-[100vh]" onClick={() => setSelectedChange(null)} />
            {/* Panel */}
            <div className="fixed top-12 right-0 bottom-0 w-[560px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
                {/* Panel Header */}
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

                    {detailTab === 'diff' ? (
                        <>
                            {/* Diff Table */}
                            <div className="mb-6">
                                <div className="grid grid-cols-2 gap-0 mb-1">
                                    <div className="text-xs font-bold text-[#ef4444] uppercase tracking-wider px-2">BEFORE</div>
                                    <div className="text-xs font-bold text-[#22c55e] uppercase tracking-wider px-2">AFTER</div>
                                </div>
                                <div className="border border-[#e2e8f0] rounded-lg overflow-hidden divide-y divide-[#e2e8f0]">
                                    {diffData.map((row: any, i: number) => (
                                        <div key={i} className="grid grid-cols-2 divide-x divide-[#e2e8f0]">
                                            {/* Before */}
                                            <div className="px-3 py-2.5">
                                                <div className="text-xs text-[#64748b] mb-0.5">{row.field}</div>
                                                <div className={`text-sm font-mono break-all ${row.changed ? 'bg-[#fee2e2] text-[#0f172a] px-1.5 py-0.5 rounded line-through decoration-[#ef4444]/40' : 'text-[#0f172a]'}`}>
                                                    {row.before}
                                                </div>
                                            </div>
                                            {/* After */}
                                            <div className="px-3 py-2.5">
                                                <div className="text-xs text-[#64748b] mb-0.5">{row.field}</div>
                                                <div className={`text-sm font-mono break-all ${row.changed ? 'bg-[#dcfce7] text-[#0f172a] px-1.5 py-0.5 rounded' : 'text-[#0f172a]'}`}>
                                                    {row.after}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Change History */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <History size={16} className="text-[#64748b]" />
                                    <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Change History</h3>
                                </div>
                                <div className="space-y-0">
                                    {changeHistory.map((h, i) => (
                                        <div key={i} className="flex items-start gap-3 pb-4 relative">
                                            {/* Timeline line */}
                                            {i < changeHistory.length - 1 && (
                                                <div className="absolute left-[7px] top-5 bottom-0 w-px bg-[#e2e8f0]" />
                                            )}
                                            {/* Dot */}
                                            <div className={`w-[15px] h-[15px] rounded-full ${actionDot[h.action]} shrink-0 mt-0.5 border-2 border-white shadow-sm`} />
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${actionOutline[h.action]}`}>
                                                        {h.action}
                                                    </span>
                                                    <span className="text-sm font-semibold text-[#0f172a]">{h.user}</span>
                                                    <span className="text-xs text-[#94a3b8]">·</span>
                                                    <span className="text-xs text-[#94a3b8]">{h.date}</span>
                                                    <div className="flex-1" />
                                                    <span className="text-xs text-[#94a3b8]">{h.fields} fields</span>
                                                    <ChevronRight size={14} className="text-[#94a3b8]" />
                                                </div>
                                                {h.desc && (
                                                    <p className="text-xs text-[#64748b] mt-0.5">{h.desc}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : detailTab === 'dependencies' ? (
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
                                timestamp: selectedChange.time,
                                before: Object.fromEntries(diffData.map((d: any) => [d.field, d.before])),
                                after: Object.fromEntries(diffData.map((d: any) => [d.field, d.after])),
                            }, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}