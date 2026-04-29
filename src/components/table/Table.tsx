import { FC } from "react"
import Pagination from "./components/Pagination"
import TableData from "./components/TableData"
import TableHeader from "./components/TableHeader"
import { SelectedAuditProps } from "../../pages/changeExplorer/ChangeExplorer"

interface TableProps {
    title?: string
    description?: string
    loading: boolean
    header: Array<{
        id: string,
        displayName: string
    }>
    tabledata: Record<string, any>[]
    setSelectedChange: (selectedChange: SelectedAuditProps) => void
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
    const { header, tabledata, setSelectedChange, pagination, title, description, loading } = props

    return (
        <div className="flex-1 bg-white rounded-xl border border-[#e2e8f0]">
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#e2e8f0]">
                <div className="flex gap-2 items-center">
                    <h3 className="font-bold text-[15px] text-[#0f172a]">{title}</h3>
                    <span className="text-sm text-[#64748b]">{description}</span>
                </div>
            </div>

            <table className="w-full">
                <TableHeader header={header} />
                <TableData loading={loading} data={tabledata} header={header} setSelectedChange={setSelectedChange} />
            </table>
            <div className="py-5 px-10">
                {(pagination && !loading) && <Pagination pagination={pagination} />}
            </div>
        </div>
    )
}

export default Table