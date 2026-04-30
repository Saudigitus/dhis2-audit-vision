import { Eye } from "lucide-react";
import { rowsFormatter } from "../../../utils/table/rowFormatter";
import TableCell from "./TableCell";

export default function ExpandedRow({ dependenceHeaders, dep, index, expandedData, row, setSelectedChange }: { setSelectedChange: (args: any) => void, row: any, dependenceHeaders: any[], dep: any, index: number, expandedData: any }) {
    const isLast = index === rowsFormatter(expandedData?.[row.id]?.audits).length - 1;

    return (
        <tr
            key={dep.id}
            className={`hover:bg-[#f1f5f9] transition-colors duration-100 ${isLast ? "" : "border-b border-[#f1f5f9]"}`}
        >
            <td className="w-10 relative">
                <div
                    className={`absolute left-[19px] top-0 w-px bg-[#e2e8f0] ${isLast ? "h-1/2" : "h-full"}`}
                />
                <div className="absolute left-[19px] top-1/2 w-2.5 h-px bg-[#e2e8f0]" />
            </td>

            {dependenceHeaders?.map((column: any) => (
                <TableCell key={column.id} column={column} row={dep} />
            ))}

            {/* Eye button for dep row */}
            <td className="px-4 py-3.5">
                <button
                    onClick={() =>
                        setSelectedChange({
                            date: dep?.time, type: dep?.type, user: dep?.user, id: dep?.id, action: dep?.action, object: dep?.object,
                        })
                    }
                    className=" inline-flex items-center justify-center w-6 h-6 rounded text-[#cbd5e1] hover:text-[#475569] hover:bg-[#e2e8f0] transition-colors duration-150 cursor-pointer"
                >
                    <Eye size={14} />
                </button>
            </td>
        </tr>
    )
}