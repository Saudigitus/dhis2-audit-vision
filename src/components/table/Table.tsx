import { FC } from "react"
import Pagination from "./components/Pagination"
import TableData from "./components/TableData"
import TableHeader from "./components/TableHeader"
import { SelectedAuditProps } from "../../pages/changeExplorer/ChangeExplorer"
import { useParams } from "../../hooks/common/useQueryParams"

interface TableProps {
    title?: string
    description?: string
    loading?: boolean
    hasDelete?: boolean
    onDelete?: (id: string) => void
    header: Array<{
        id: string,
        displayName: string
    }>
    tabledata: Record<string, any>[]
    setSelectedChange?: (selectedChange: SelectedAuditProps) => void
    dependenceHeaders?: Array<{ id: string, displayName: string }>
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
    const { onDelete, hasDelete = false, onRowClick, header, tabledata, setSelectedChange, pagination, title, description, loading, dependenceHeaders } = props
    const { groupName } = useParams()
    console.log(tabledata)

    return (
        <div className="flex-1 bg-white rounded-xl border border-[#e2e8f0]">
            <div className="px-6 py-2 border-b border-[#e2e8f0] my-2">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex gap-2 items-center">
                        <h3 className={`font-bold text-[15px] text-[#0f172a]`}>{title}</h3>
                        {groupName && <h3 className="font-semi-bold text-[14px] text-[#0f172a]">-&nbsp;{groupName}</h3>}
                    </div>
                </div>
                <span className="text-sm text-[#64748b] text-[12px]">{description}</span>
            </div>

            <table className="w-full">
                <TableHeader hasDependence={dependenceHeaders?.length! > 0} header={header} />
                <TableData
                    onRowClick={onRowClick!}
                    setSelectedChange={setSelectedChange!}
                    dependenceHeaders={dependenceHeaders}
                    loading={loading!}
                    data={tabledata}
                    header={header}
                    hasDelete={hasDelete}
                    onDelete={onDelete}
                />
            </table>
            <div className="py-5 px-10">
                {(pagination && !loading! && pagination.page) && <Pagination pagination={pagination} />}
            </div>
        </div>
    )
}

export default Table