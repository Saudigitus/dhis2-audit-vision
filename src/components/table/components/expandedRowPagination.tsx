import Pagination from "./Pagination";

export default function ExpandedRowPagination({ dependenceHeaders, expandedPagination, fetchExpandedData, row }: { dependenceHeaders: any, expandedPagination: any, fetchExpandedData: any, row: any }) {
    return (
        <tr >
            <td colSpan={(dependenceHeaders?.length ?? 0) + 2} className="h-[10px] px-4 py-2 bg-[#f8fafc]">
                <div className="flex justify-end m-5">
                    <Pagination
                        pagination={{
                            total: expandedPagination[row.id]?.total || 0,
                            page: expandedPagination[row.id]?.page || 1,
                            pageSize: expandedPagination[row.id]?.pageSize || 5,
                            pageCount: expandedPagination[row.id]?.pageCount || 1,
                            setPage: (page: number) => fetchExpandedData(row.id, row.type, page, expandedPagination[row.id]?.pageSize || 5),
                            setPageSize: (pageSize: number) => fetchExpandedData(row.id, row.type, 1, pageSize),
                        }}
                    />
                </div>
            </td>
        </tr>
    )
}