export interface Column {
    id: string,
    displayName: string
}

const TableHeader = ({ header, hasDependence }: { hasDependence: boolean, header: Column[] }) => {
    return (
        <thead>
            <tr className="border-b border-[#e2e8f0]">
                {hasDependence && <th />}
                {
                    header?.map((column: Column) => (
                        <th key={column.id} className="text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase">
                            {column.displayName}
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHeader