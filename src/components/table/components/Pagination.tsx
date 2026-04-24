import { Pagination as Dhis2Pagination } from "@dhis2/ui"
import { FC } from "react"

interface PaginationProps {
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

const Pagination: FC<PaginationProps> = ({ pagination }) => {
  // const { page, pageSize, total, totalPages } = pagination
  return (
    <Dhis2Pagination
      page={pagination.page}
      pageCount={pagination.totalPages}
      pageSize={pagination.pageSize}
      total={pagination.total}
    />
  )
}
export default Pagination