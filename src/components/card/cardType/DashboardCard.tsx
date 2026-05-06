import { FC } from "react";
import Skeleton from "../../../components/skeleton/Skeleton";
import { DashboardCardProps } from "../../../types/card/cardContainerProps";

const DashboardCard: FC<DashboardCardProps> = ({ icon, indicator, label, value, iconBgColor, indicatorColor, loading }) => {
    return (
        <>
            <div>
                <div className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">{label}</div>
                <div className="text-3xl font-bold text-[#0f172a] mt-1">{loading ? <Skeleton width={100} height={20} /> : value}</div>
                {indicator && <div className={`text-xs mt-1 ${indicatorColor}`}>{loading ? <Skeleton width={100} height={20} /> : indicator}</div>}
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center ${iconBgColor} justify-center`}>
                {icon}
            </div>
        </>
    )
}

export default DashboardCard