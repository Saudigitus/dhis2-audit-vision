import { ChevronLeft, Activity } from 'lucide-react';
import { useLocation, useNavigate} from "react-router-dom";

interface SidebarProps {
  navItems: { id: string; label: string; icon: React.ReactNode, path:string }[]
}

export default function Sidebar({ navItems }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-60 bg-[#0f172a] text-white flex flex-col shrink-0">
      <div className="flex items-center gap-3 px-5 py-5">
        <div>
          <div className="text-white font-semibold text-[15px] leading-tight">DHIS2 Audit Vision</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = item.id.includes(location?.pathname?.substring(1, location.pathname.length))
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${isActive
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#1e293b]'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      {/* <div className="px-3 py-4">
        <button className="w-full flex items-center justify-center py-2 text-[#64748b] hover:text-white transition-colors cursor-pointer">
          <ChevronLeft size={18} />
        </button>
      </div> */}
    </aside>
  );
}
