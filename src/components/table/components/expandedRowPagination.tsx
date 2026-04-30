import { Center, CircularLoader } from "@dhis2/ui";
import Pagination from "./Pagination";

export default function ExpandedRowPagination({ dependenceHeaders, expandedPagination, fetchExpandedData, row, loading }: { loading: boolean, dependenceHeaders: any, expandedPagination: any, fetchExpandedData: any, row: any }) {
    return (
        <tr >
            <td colSpan={(dependenceHeaders?.length ?? 0) + 2} className="h-[10px] px-4 py-2 bg-[#cfebdf66]">
                {
                    loading ? <div className="flex justify-center m-5">
                        <Center>
                            <CircularLoader />
                        </Center>
                    </div>
                        :
                        <div className="flex justify-end m-3.5">
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
                }
            </td>
        </tr>
    )
}