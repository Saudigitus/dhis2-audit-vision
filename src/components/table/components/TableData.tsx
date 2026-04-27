import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { useState } from "react";
import { Column } from "./TableHeader";
import TableCell, { actionColors } from "./TableCell";
import { SelectedAuditProps } from "../../../pages/changeExplorer/ChangeExplorer";

interface TableDataProps {
    data: Record<string, any>[],
    header: Column[]
    setSelectedChange: (selectedChange: SelectedAuditProps) => void
    setDetailTab: (detailTab: 'diff' | 'dependencies' | 'raw') => void
}

const TableData = (props: TableDataProps) => {
    const { data, header, setSelectedChange, setDetailTab } = props
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (id: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    return (
        <tbody>
            {data.map((row: any) => (
                <>
                    <tr>
                        {
                            row.dependencies && row.dependencies.length > 0 ?
                                <td className="px-4 py-3.5 text-center">
                                    {row.dependencies && row.dependencies.length > 0 ? (
                                        <button onClick={() => toggleRow(row.id)} className="text-[#64748b] hover:text-[#0f172a] cursor-pointer">
                                            {expandedRows.has(row.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    ) : null}
                                </td> : null
                        }

                        {header.map((column: any) => {
                            if (column.id === 'collapse' || column.id === 'view') {
                                return null
                            }
                            return (
                                <TableCell column={column} row={row} />
                            )
                        })}
                        <td className="px-4 py-3.5">
                            <button onClick={() => { setSelectedChange({ date: row?.time, type: row?.type, user: row?.user, id: row?.id }); setDetailTab('diff'); }} className="cursor-pointer">
                                <Eye size={16} className="text-[#94a3b8] hover:text-[#64748b]" />
                            </button>
                        </td>
                    </tr>

                    {/* Dependent Rows */}
                    {expandedRows.has(row.id) && row.dependencies && row.dependencies.map((dep: any, index: number) => (
                        <tr key={dep.id} className="border-b border-[#e2e8f0] bg-[#fafafa]">
                            <td className="px-4 py-3.5"></td>
                            <td className="px-6 py-3.5 text-sm text-[#64748b] pl-10 relative">
                                {/* Vertical line connecting to parent */}
                                <div className={`absolute left-6 top-0 w-px bg-[#cbd5e1] ${index === row.dependencies.length - 1 ? 'bottom-1/2' : 'bottom-0'}`}></div>
                                {/* Horizontal branch */}
                                <div className="absolute left-6 top-1/2 w-3 h-px bg-[#cbd5e1]"></div>
                                {dep.time}
                            </td>
                            <td className="px-6 py-3.5 text-sm font-semibold text-[#0f172a]">{dep.user}</td>
                            <td className="px-6 py-3.5">
                                <span className="text-xs font-mono bg-[#e2e8f0] px-2 py-0.5 rounded text-[#475569]">{dep.type}</span>
                            </td>
                            <td className="px-6 py-3.5 text-sm text-[#0f172a]">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold text-[#94a3b8] border border-[#cbd5e1] px-1 rounded">Dep</span>
                                    {dep.object}
                                </div>
                            </td>
                            <td className="px-6 py-3.5">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded ${actionColors[dep.action]}`}>
                                    {dep.action}
                                </span>
                            </td>
                            <td className="px-4 py-3.5">
                                <button onClick={() => { setSelectedChange(dep); setDetailTab('diff'); }} className="cursor-pointer">
                                    <Eye size={16} className="text-[#94a3b8] hover:text-[#64748b]" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </>
            ))}
        </tbody>
    )
}
export default TableData