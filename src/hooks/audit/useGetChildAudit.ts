import axios from "axios"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"

export interface DataProps {
    uid: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

export const useGetchildAudit = () => {
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)

    const getAudit = async (page: number, pageSize: number, id: string, type: string) => {
        try {
            const response = await axios.get(`${dataStoreDataState.auditApi}/api/audits/metadata/${id}?page=${page}&pageSize=${pageSize}&type=${type.toUpperCase()}`)

            return response
        } catch (error) {
            throw error
        }
    }

    return { getAudit }
}
