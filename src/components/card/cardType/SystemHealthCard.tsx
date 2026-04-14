import { SystemHealthCardProps } from "../../../types/card/cardContainerProps";
import { FC } from "react";

const SystemHealthCard: FC<SystemHealthCardProps> = ({ icon, label, value, iconBgColor }) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg bg-[${iconBgColor ?? '#f1f5f9'}] flex items-center justify-center text-[#64748b]`}>
          {icon}
        </div>
        <span className="text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">{label}</span>
      </div>
      <div className="text-xl font-bold text-[#0f172a]">{value}</div>
    </>
  )
}

export default SystemHealthCard