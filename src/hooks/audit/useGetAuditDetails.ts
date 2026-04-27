import axios from "axios"
import { useState } from "react"

export interface DataProps {
    id: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

export const useGetuditDetails = () => {
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getAuditDetails = async (objectId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`https://agro.desinglab.org/audit-api/api/auditObjects?objectId=${objectId}`)
            console.log(response, "response")
            setData(response?.data)
            return response
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getAuditDetails, auditDetails: data, loadingDetails: loading }
}
