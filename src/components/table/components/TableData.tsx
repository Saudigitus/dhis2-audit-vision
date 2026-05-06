import { ChevronDown, ChevronUp, Eye, Trash } from "lucide-react";
import React, { useState } from "react";
import { Column } from "./TableHeader";
import TableCell from "./TableCell";
import { SelectedAuditProps } from "../../../pages/changeExplorer/ChangeExplorer";
import { Center, CircularLoader } from "@dhis2/ui";
import { useGetchildAudit } from "../../../hooks/audit/useGetChildAudit";
import { rowsFormatter } from "../../../utils/table/rowFormatter";
import ExpandedRow from "./expandedRow";
import ExpandedRowPagination from "./expandedRowPagination";

interface TableDataProps {
    data: Record<string, any>[];
    loading: boolean;
    header: Column[];
    onRowClick?: (row: any) => void;
    setSelectedChange?: (selectedChange: SelectedAuditProps) => void;
    dependenceHeaders?: Column[];
    onDelete?: (id: string) => void
    hasDelete?: boolean
}

const TableData = (props: TableDataProps) => {
    const { data, header, onRowClick, setSelectedChange, loading, dependenceHeaders, onDelete, hasDelete } = props;
    const [expandedRows, setExpandedRows] = useState<Set<any>>(new Set());
    const [expandedData, setExpandedData] = useState<any>({});
    const [isLoading, setIsLoading] = useState<any>({});
    const [expandedPagination, setExpandedPagination] = useState<Record<string, any>>({});
    const { getAudit } = useGetchildAudit();

    const fetchExpandedData = async (rowId: string, type: string, page: number, pageSize: number) => {
        setIsLoading((prev: any) => ({ ...prev, [rowId]: true }));
        try {
            const auditResult = await getAudit({ page, pageSize, id: rowId, type });
            setExpandedData((prev: any) => ({ ...prev, [rowId]: auditResult?.data }));

            if (auditResult?.data?.pager) {
                setExpandedPagination((prev: any) => ({
                    ...prev,
                    [rowId]: auditResult.data.pager
                }));
            }
        } catch (error) {
            console.error("Error fetching expanded data:", error);
        } finally {
            setIsLoading((prev: any) => ({ ...prev, [rowId]: false }));
        }
    };

    const toggleRow = async (row: any) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(row.id)) {
            newExpanded.delete(row.id);
        } else {
            newExpanded.add(row.id);
            await fetchExpandedData(row.id, row.type, 1, 5);
        }
        setExpandedRows(newExpanded);
    };

    return (
        <tbody>
            {loading ? (
                <tr>
                    <td className="pt-4" colSpan={header.length + (dependenceHeaders ? 1 : 0)}>
                        <div className="flex justify-center m-5">
                            <Center>
                                <CircularLoader />
                            </Center>
                        </div>
                    </td>
                </tr>
            ) : data.length === 0 ? (
                <tr>
                    <td className="pt-4 text-center" colSpan={header.length + (dependenceHeaders ? 1 : 0)}>
                        <span className="text-[#94a3b8] text-sm">No data found</span>
                    </td>
                </tr>
            ) : (
                data.map((row: any) => (
                    <React.Fragment key={row.id}>
                        <tr className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors duration-100">
                            {row.hasDependencies && (
                                <td className="w-10 px-3 py-3.5 text-center">
                                    {isLoading[row.id] ? <CircularLoader small /> :
                                        <button
                                            onClick={() => toggleRow(row)}
                                            className="inline-flex items-center justify-center w-5 h-5 rounded text-[#94a3b8] hover:text-[#475569] hover:bg-[#e2e8f0] transition-colors duration-150 cursor-pointer"
                                        >
                                            {expandedRows.has(row.id)
                                                ? <ChevronUp size={13} />
                                                : <ChevronDown size={13} />}
                                        </button>
                                    }
                                </td>
                            )}

                            {header.map((column: any) => {
                                if (column.id === "collapse" || column.id === "view") return null;
                                return <TableCell key={column.id} column={column} row={row} />;
                            })}

                            {/* Eye button */}
                            {!row.hasDependencies && (
                                <td className="px-4 py-3.5 flex">
                                    <button
                                        onClick={() => {
                                            onRowClick?.(row)
                                            setSelectedChange?.({
                                                date: row?.time, type: row?.type, user: row?.user, id: row?.id, action: row?.action, object: row?.object,
                                            })
                                        }}
                                        className=" inline-flex items-center justify-center w-6 h-6 rounded text-[#98a8bb] hover:text-[#475569] hover:bg-[#f1f5f9] transition-colors duration-150 cursor-pointer"
                                    >
                                        <Eye size={14} />
                                    </button>
                                    {hasDelete && <button
                                        onClick={() => onDelete?.(row?.id)}
                                        className=" inline-flex items-center justify-center w-6 h-6 rounded text-[#df1e4298] hover:text-[#d02472] hover:bg-[#f1f5f9] transition-colors duration-150 cursor-pointer"
                                    >
                                        <Trash size={14} />
                                    </button>}
                                </td>
                            )}
                        </tr>

                        {expandedRows.has(row.id) && row.hasDependencies && (
                            <>
                                <tr className="bg-[#cfebdf66] border-y border-[#e2e8f0]">
                                    <td className="w-10" />
                                    {dependenceHeaders?.map((column: Column) => (
                                        <th
                                            key={column.id}
                                            className=" text-left px-4 py-3.5 text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8]"
                                        >
                                            {column.displayName}
                                        </th>
                                    ))}
                                    <th className="w-10" />
                                </tr>

                                {!isLoading[row.id] && rowsFormatter(expandedData?.[row.id]?.audits)?.map(
                                    (dep: any, index: number) => <ExpandedRow
                                        dep={dep}
                                        dependenceHeaders={dependenceHeaders!}
                                        expandedData={expandedData}
                                        index={index}
                                        row={row}
                                        setSelectedChange={setSelectedChange!}
                                    />
                                )}

                                {expandedPagination[row.id] && <ExpandedRowPagination
                                    dependenceHeaders={dependenceHeaders}
                                    fetchExpandedData={fetchExpandedData}
                                    row={row}
                                    loading={!!isLoading[row.id]}
                                    expandedPagination={expandedPagination}
                                />}

                                {/* Bottom separator after expanded block */}
                                <tr className="border-b border-[#e2e8f0]">
                                    <td colSpan={(dependenceHeaders?.length ?? 0) + 2} className="p-0" />
                                </tr>
                            </>
                        )}
                    </React.Fragment>
                ))
            )}
        </tbody>
    );
};

export default TableData;