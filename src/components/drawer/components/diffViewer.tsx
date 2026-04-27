import { ChevronRight, History } from "lucide-react";
import { actionDot, actionOutline } from "../../../constants/common/common";
import { buildDiff } from "../utils/buildDiffData";

export default function DiffViewer({ auditDetails, action }: { action: string, auditDetails: any[] }) {

    return (
        <>
            <div className="mb-6">
                <div className="grid grid-cols-2 gap-0 mb-1">
                    <div className="text-xs font-bold text-[#ef4444] uppercase tracking-wider px-2">BEFORE</div>
                    <div className="text-xs font-bold text-[#22c55e] uppercase tracking-wider px-2">AFTER</div>
                </div>
                <div className="border border-[#e2e8f0] rounded-lg overflow-hidden divide-y divide-[#e2e8f0]">
                    {buildDiff((auditDetails ?? []), action).map((row: any, i: number) => (
                        <div key={i} className="grid grid-cols-2 divide-x divide-[#e2e8f0]">
                            {/* Before */}
                            <div className="px-3 py-2.5">
                                <div className="text-xs text-[#64748b] mb-0.5">{row.field}</div>
                                <div className={`text-sm font-mono break-all ${(row.changed && row.before != '—') ? 'bg-[#fee2e2] text-[#0f172a] px-1.5 py-0.5 rounded line-through decoration-[#ef4444]/40' : 'text-[#0f172a]'}`}>
                                    {row.before}
                                </div>
                            </div>
                            {/* After */}
                            <div className="px-3 py-2.5">
                                <div className="text-xs text-[#64748b] mb-0.5">{row.field}</div>
                                <div className={`text-sm font-mono break-all ${(row.changed && row.after != '—') ? 'bg-[#dcfce7] text-[#0f172a] px-1.5 py-0.5 rounded' : 'text-[#0f172a]'}`}>
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
                    {auditDetails.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 pb-4 relative">
                            {/* Timeline line */}
                            {i < auditDetails.length - 1 && (
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
    )
}