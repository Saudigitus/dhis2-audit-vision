import { actionColors } from "../../../constants/common/common";
import { SelectedAuditProps } from "../../../pages/changeExplorer/ChangeExplorer";
import { Activity, Calendar, FileText, Hash, Package, User } from "lucide-react";

export default function HeaderDetails({ selectedRow }: { selectedRow: SelectedAuditProps }) {

    return (
        <div className="flex flex-wrap gap-y-5 gap-x-15 mb-8">
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-[#94a3b8]" />
                    <span className="text-[#64748b]">User:</span>
                    <span className="font-semibold text-[#0f172a]">{selectedRow.user}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-[#94a3b8]" />
                    <span className="text-[#64748b]">Date:</span>
                    <span className="font-semibold text-[#0f172a]">{selectedRow.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <FileText size={16} className="text-[#94a3b8]" />
                    <span className="text-[#64748b]">Type:</span>
                    <span className="font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-sm text-[#475569]">{selectedRow.type}</span>
                </div>
            </div>
            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <Activity size={16} className="text-[#94a3b8]" />
                    <span className="text-[#64748b]">Action:</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded ${actionColors[selectedRow.action]}`}>
                        {selectedRow.action}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Package size={16} className="text-[#94a3b8]" />
                    <span className="text-[#64748b]">Object name:</span>
                    <span className="font-semibold text-[#0f172a]">{selectedRow.object}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Hash size={16} className="text-[#94a3b8]" />
                    <span className="text-[#64748b]">ID:</span>
                    <span className="font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-sm text-[#475569]">{selectedRow.id}</span>
                </div>
            </div>
        </div>
    )
}