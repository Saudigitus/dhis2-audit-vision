import { ActivityTableCheck } from "@/types/activity table/activityTable";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const statusStyles = {
    success: { bg: 'bg-[#f0fdf4]', text: 'text-[#16a34a]', border: 'border-[#bcf0da]', icon: <CheckCircle2 size={16} /> },
    warning: { bg: 'bg-[#fffbeb]', text: 'text-[#d97706]', border: 'border-[#fde68a]', icon: <AlertTriangle size={16} /> },
    failed: { bg: 'bg-[#fef2f2]', text: 'text-[#dc2626]', border: 'border-[#fecaca]', icon: <XCircle size={16} /> },
};

export default function ActivityTable(props: ActivityTableCheck) {
    const { action, items, title } = props

    return (

        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
            {
                (title || action) && <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
                    <h3 className="font-bold text-[15px] text-[#0f172a]">{title}</h3>
                    {action && <button onClick={() => action.onClick()} className="text-sm font-semibold text-[#3b82f6] hover:underline cursor-pointer">{action.label}</button>}
                </div>
            }
            <div className="divide-y divide-[#f1f5f9]">
                {items.map((check) => {
                    const style = statusStyles[check.status as keyof typeof statusStyles];
                    return <div key={check.id} className="p-6 hover:bg-[#f8fafc] transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className={`mt-1 p-1 rounded-full ${style.bg} ${style.text}`}>
                                    {style.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">{check.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
                                        <h4 className="font-bold text-[#0f172a]">{check.check}</h4>
                                    </div>
                                    <p className="text-sm text-[#64748b] mt-1">{check.description}</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${style.bg} ${style.text} ${style.border}`}>
                                {check.status}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}