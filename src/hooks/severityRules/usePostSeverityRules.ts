import axios from "axios"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import useShowAlerts from "../../packages/wrapper/hooks/alert/useShowAlert"

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
    const { hide, show } = useShowAlerts()

    const postAuditRules = async (form: any) => {
        setLoading(true)
        try {
            await axios.post(`${dataStoreDataState.auditApi}/api/notifications/create`, form)
            show({
                message: `Rule created successfully`,
                type: { success: true }
            });
            setTimeout(hide, 5000);
            
            return { error: false }
        } catch (error: any) {
            const detail = error?.response?.data?.detail?.[0]?.msg || 'Rule creation failed';
            show({
                message: detail,
                type: { critical: true }
            });
            setTimeout(hide, 5000);

            return { error: true }
        } finally {
            setLoading(false)
        }
    }

    return { postAuditRules, loading }
}
