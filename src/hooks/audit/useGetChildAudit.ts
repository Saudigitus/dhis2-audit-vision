import axios from "axios"

export interface DataProps {
    uid: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

export const useGetchildAudit = () => {

    const getAudit = async (page: number, pageSize: number, id: string, type: string) => {
        try {
            const response = await axios.get(`https://agro.desinglab.org/audit-api/api/audits/metadata/${id}?page=${page}&pageSize=${pageSize}&type=${type.toUpperCase()}`)

            return response
        } catch (error) {
            throw error
        }
    }

    return { getAudit }
}
