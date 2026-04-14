import { DashboardCardProps } from "../../../types/card/cardContainerProps";
import { FC } from "react";

const DashboardCard: FC<DashboardCardProps> = ({ icon, indicator, label, value, iconBgColor, indicatorColor }) => {
    return (
        <>
            <div>
                <div className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">{label}</div>
                <div className="text-3xl font-bold text-[#0f172a] mt-1">{value}</div>
                {indicator && <div className={`text-xs mt-1 ${indicatorColor}`}>{indicator}</div>}
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center ${iconBgColor} justify-center`}>
                {icon}
            </div>
        </>
    )
}

export default DashboardCard