import axios from "axios"
import { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { SeverityRulesSchema } from "../../schema/severityRulesSchema"

export const useGetSeverityRules = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const setSeverityRules = useSetRecoilState(SeverityRulesSchema)

    const getSeverityRules = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${dataStoreDataState.auditApi}/api/notifications`)

            setSeverityRules(response.data)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getSeverityRules, loading }
}
