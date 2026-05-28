import axios from "axios"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"

export interface DataProps {
    id: number | string
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
    displayName?: string
}

export const useGetAuditDetails = () => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)

    const getAuditDetails = async (objectId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${dataStoreDataState.auditApi}/api/auditObjects?objectId=${objectId}`)
            setData(response?.data?.auditObjects)
            return response
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getAuditDetails, auditDetails: data, loadingDetails: loading }
}
