import { FC } from "react"
import Skeleton from "../../../components/skeleton/Skeleton"
import { DashboardCardProps } from "../../../types/card/cardContainerProps"

const SecurityAuditCard: FC<DashboardCardProps> = ({ icon, indicator, label, value, iconBgColor, indicatorColor, loading }) => {
    return (
        <>
            <div className={`w-12 h-12 rounded-full bg-[${iconBgColor ?? '#fef2f2'}] flex items-center justify-center mb-3`}>
                {loading ? <Skeleton width={100} height={100} /> : icon}
            </div>
            <h4 className="text-2xl font-bold text-[#0f172a]">{loading ? <Skeleton width={100} height={20} /> : value}</h4>
            <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">{loading ? <Skeleton width={100} height={20} /> : label}</span>
            <p className={`text-[10px] text-[${indicatorColor ?? '#ef4444'}] mt-2 font-bold`}>{loading ? <Skeleton width={100} height={20} /> : indicator}</p>
        </>
    )
}

export default SecurityAuditCard