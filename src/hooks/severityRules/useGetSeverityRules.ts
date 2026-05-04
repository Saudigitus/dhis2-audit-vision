import axios from "axios"
import { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { SeverityRulesSchema } from "../../schema/severityRulesSchema"

export interface DataProps {
    id: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

export const useGetSeverityRules = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const setSeverityRules = useSetRecoilState(SeverityRulesSchema)

    const getSeverityRules = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${dataStoreDataState.auditApi}/api/notifications`)
            console.log('called')
            console.log(response,'yowee')
            setSeverityRules(response.data)

        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getSeverityRules, loading }
}
