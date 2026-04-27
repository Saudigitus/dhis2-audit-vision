import { FC } from "react"
import Pagination from "./components/Pagination"
import TableData from "./components/TableData"
import TableHeader from "./components/TableHeader"
import { SelectedAuditProps } from "../../pages/changeExplorer/ChangeExplorer"

interface TableProps {
    header: Array<{
        id: string,
        displayName: string
    }>
    tabledata: Record<string, any>[]
    setSelectedChange: (selectedChange: SelectedAuditProps) => void
    setDetailTab: (detailTab: 'diff' | 'dependencies' | 'raw') => void
    pagination?: {
        total: number
        page: number
        pageSize: number
        pageCount: number,
        setPage: (page: number) => void
        setPageSize: (pageSize: number) => void
    }
    onRowClick?: (data: Record<string, any>) => void
}

const Table: FC<TableProps> = (props) => {
    const { header, tabledata, setDetailTab, setSelectedChange, pagination } = props

    return (
        <div className="flex-1 bg-white rounded-xl border border-[#e2e8f0]">
            <div className="px-6 py-3 flex items-center justify-between border-b border-[#e2e8f0]">
                <span className="text-sm text-[#64748b]">50 results</span>
                <span className="text-xs font-medium text-[#0f172a] border border-[#e2e8f0] rounded px-2.5 py-1">Metadata</span>
            </div>
            <table className="w-full">
                <TableHeader header={header} />
                <TableData data={tabledata} header={header} setSelectedChange={setSelectedChange} setDetailTab={setDetailTab} />
            </table>
            <div className="py-5 px-10">
                {pagination && <Pagination pagination={pagination} />}
            </div>
        </div>
    )
}

export default Table