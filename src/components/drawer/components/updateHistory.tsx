import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { format } from "date-fns";
import { actionDot, actionOutline } from "../../../constants/common/common";
import { useState } from "react";

export default function UpdateHistory({ loading, auditDetails, setSelected, selected }: { loading: boolean, selected: any, setSelected: (args: any) => void, auditDetails: any }) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const totalPages = Math.ceil((auditDetails?.length || 0) / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentDetails = auditDetails?.slice(startIndex, startIndex + pageSize) || [];

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className={`px-8 py-5 ${loading ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <History size={16} className="text-[#64748b]" />
                    <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">Change History</h3>
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <span className="text-[11px] font-bold text-[#64748b]">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {currentDetails.map((h: any, i: number) => (
                    <div key={i} className="group relative flex justify-between p-2 rounded-2xl border border-[#e2e8f0] bg-white hover:border-[#3b82f6] hover:shadow-sm transition-all">
                        <div className="flex items-center justify-between">
                            <div className={`w-2 h-2 rounded-full ${actionDot[h.auditType]} ring-4 ring-white shadow-sm`} />&nbsp;
                            <span className={`text-[11px] font-bold p-1 rounded-sm border uppercase tracking-wider ${actionOutline[h.auditType]}`}>
                                {h.auditType}
                            </span>&nbsp;
                            <div className="text-[13px] text-[#94a3b8] font-medium">
                                {format(h.created_at, 'yyyy-MM-dd HH:mm')}
                            </div>&nbsp;
                            <div className="text-sm font-bold text-[#0f172a] truncate mb-0.5">
                                {h?.objectData?.lastUpdatedBy?.displayName || 'Unknown User'}
                            </div>
                        </div>

                        <button
                            disabled={(h.id == auditDetails?.[0]?.id || selected?.id == h?.id)}
                            onClick={() => setSelected(h)}
                            className={`flex items-center justify-center gap-2 p-1 rounded-lg text-[7px] font-bold transition-all ${(h.id == auditDetails?.[0]?.id || selected?.id == h?.id)
                                ? "cursor-not-allowed bg-[#e2e8f0] text-[#cbd5e1] pointer-events-none"
                                : "cursor-pointer bg-[#f8fafc] text-[#64748b] group-hover:bg-[#3b82f6] group-hover:text-white"
                                }`}
                        >
                            View details
                            <ChevronRight size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {auditDetails?.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-sm text-[#94a3b8]">No change history found</p>
                </div>
            )}
        </div >
    )
}