import axios from "axios"
import { useState } from "react"
import { useParams } from "../common/useQueryParams"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { useRecoilValue } from "recoil"

export interface DataProps {
    uid: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

interface GetAuditProps {
    audits: DataProps[]
    pager: {
        total: number
        page: number
        pageSize: number
        pageCount: number
    }
}

export const useGetudit = () => {
    const [data, setData] = useState<GetAuditProps | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { group } = useParams()
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)

    const getAudit = async (page: number, pageSize: number, filterQuery?: string) => {
        setLoading(true)
        try {
            if (group) {
                const audits: DataProps[] = []
                const dsGroup = dataStoreDataState?.monitoringGroups?.find(x => x.id == group)?.items || []

                const total = dsGroup.length
                const pageCount = Math.ceil(total / pageSize)
                const startIndex = (page - 1) * pageSize
                const paginatedItems = dsGroup.slice(startIndex, startIndex + pageSize)

                for (const item of paginatedItems) {
                    const response = await axios.get(`https://agro.desinglab.org/audit-api/api/audits/metadata/${item.id}?type=${item.type.toUpperCase()}&page=1&pageSize=1`)
                    if (response?.data?.audits?.[0]) {
                        audits.push(response.data.audits[0])
                    }
                }

                setData({
                    audits,
                    pager: { page, pageCount, pageSize, total }
                })
            } else {
                const response = await axios.get(`https://agro.desinglab.org/audit-api/api/audits?page=${page}&pageSize=${pageSize}${filterQuery ? `&${filterQuery}` : ''}`)

                setData(response?.data)
                return response
            }
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getAudit, data, loading }
}
