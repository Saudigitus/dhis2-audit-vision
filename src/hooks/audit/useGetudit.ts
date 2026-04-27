import axios from "axios"
import { useState } from "react"

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

    const getAudit = async (page: number, pageSize: number) => {
        setLoading(true)
        try {
            const response = await axios.get(`https://agro.desinglab.org/audit-api/api/audits?page=${page}&pageSize=${pageSize}`)
            setData(response?.data)
            return response
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getAudit, data, loading }
}
