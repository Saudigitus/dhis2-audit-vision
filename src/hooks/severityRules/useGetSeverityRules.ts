import axios from "axios"
import { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { SeverityRulesSchema } from "../../schema/severityRulesSchema"

export const useGetSeverityRules = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const setSeverityRules = useSetRecoilState(SeverityRulesSchema)

    const getSeverityRules = async () => {
        if (!dataStoreDataState?.auditApi) {
            console.log('auditApi is not set in dataStoreDataState')
            setLoading(false)
            return
        }

        try {
            const response = await axios.get(`${dataStoreDataState?.auditApi}/api/notifications`)

            setSeverityRules(response.data)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getSeverityRules, loading }
}
