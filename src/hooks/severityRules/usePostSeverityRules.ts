import axios from "axios"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"

export interface DataProps {
    id: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

export const usePostSeverityRules = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)

    const postAuditRules = async (form: any) => {
        setLoading(true)
        try {
            const response = await axios.post(`${dataStoreDataState.auditApi}/api/notifications/create`, form)

            return response
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { postAuditRules, loading }
}
