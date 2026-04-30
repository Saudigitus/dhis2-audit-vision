import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  navItems: { id: string; label: string; icon: any, path: string }[]
}

export default function Sidebar({ navItems }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`bg-[#2c6693] text-white flex flex-col shrink-0 transition-all duration-300 ease-in-out ${collapsed ? "w-[68px]" : "w-60"}`}>
      {/* Navigation */}
      <nav className="flex flex-col flex-1 pt-5 px-3 space-y-2 gap-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = item.id.includes(location?.pathname?.substring(1, location.pathname.length))
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3.5 py-3 rounded-lg text-[14px] font-medium  transition-all duration-500 cursor-pointer ${isActive
                ? 'bg-[#1e293b] text-white'
                : 'text-white hover:text-white hover:bg-[#1e293b]'
                }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed &&
                <span
                  className={`whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto ml-1"}`}
                >
                  {item.label}
                </span>
              }
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="px-3 py-4 border-t border-[#e2e8f036] shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-[14px] font-medium transition-colors cursor-pointer 
             hover:bg-[#1e293b] text-white`}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className='text-sx'>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
