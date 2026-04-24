import { Layers } from "lucide-react"
import { Column } from "./TableHeader"

export const actionColors: Record<string, string> = {
    CREATE: 'bg-[#3b82f6] text-white',
    UPDATE: 'bg-[#fef3c7] text-[#d97706] border border-[#fcd34d]',
    DELETE: 'bg-[#fee2e2] text-[#ef4444] border border-[#fca5a5]',
}

const TableCell = ({ column, row }: { column: Column, row: Record<string, any> }) => {
    if (column.id === 'collapse' || column.id === 'view') {
        return null
    }
    switch (column?.id) {
        case "action":
            return (
                <td className="px-6 py-3.5">
                    <span className={`text-xs font-bold px-3 py-1 rounded ${actionColors[row.action]}`}>
                        {row.action}
                    </span>
                </td>
            )
        case "object":
            return (
                <td className="px-6 py-3.5">
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#0f172a]">{row.object}</span>
                            {row.dependencies && row.dependencies.length > 0 && (
                                <span className="text-[10px] font-bold bg-[#f1f5f9] text-[#64748b] px-2 py-0.5 rounded-full">
                                    {row.dependencies.length} dependências
                                </span>
                            )}
                        </div>
                        {row.group && (
                            <span className="text-[10px] text-[#64748b] flex items-center gap-1 mt-1 bg-[#f8fafc] border border-[#e2e8f0] px-1.5 py-0.5 rounded w-fit">
                                <Layers size={10} className="text-[#3b82f6]" /> Grupo: {row.group}
                            </span>
                        )}
                    </div>
                </td>
            )
        case "type":
            return (
                <td className="px-6 py-3.5 text-sm text-[#64748b]">
                    <span className="text-sm font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[#475569]">{row?.[column.id]}</span>
                </td>
            )
        default:
            return (
                <td className={`px-6 py-3.5 text-sm ${column?.id === 'user' ? 'font-semibold text-[#0f172a]' : 'text-[#64748b]'} text-[#64748b]`}>
                    {row?.[column.id]}
                </td>
            )
    }
}

export default TableCell