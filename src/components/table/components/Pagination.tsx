import { Pagination as Dhis2Pagination } from "@dhis2/ui"
import { FC } from "react"

interface PaginationProps {
  pagination: {
    total: number
    page: number
    pageSize: number
    pageCount: number
    setPage: (page: number) => void
    setPageSize: (pageSize: number) => void
  }
}

const Pagination: FC<PaginationProps> = ({ pagination }) => {
  const { page, pageSize, total, pageCount, setPage, setPageSize } = pagination

  const handlePageChange = (e: any) => {
    setPage(e)
  }

  const handlePageChangeSize = (e: any) => {
    setPage(1)
    setPageSize(e)
  }

  return (
    <Dhis2Pagination
      onPageSizeChange={handlePageChangeSize}
      onPageChange={handlePageChange}
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      total={total}
    />
  )
}
export default Pagination