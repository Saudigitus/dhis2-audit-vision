import { DashboardCardProps } from "../../../types/card/cardContainerProps"
import { FC } from "react"

const SecurityAuditCard: FC<DashboardCardProps> = ({ icon, indicator, label, value, iconBgColor, indicatorColor }) => {
    return (
        <>
            <div className={`w-12 h-12 rounded-full bg-[${iconBgColor ?? '#fef2f2'}] flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <h4 className="text-2xl font-bold text-[#0f172a]">{value}</h4>
            <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">{label}</span>
            <p className={`text-[10px] text-[${indicatorColor ?? '#ef4444'}] mt-2 font-bold`}>{indicator}</p>
        </>
    )
}

export default SecurityAuditCard