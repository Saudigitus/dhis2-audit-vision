import { useGlobalError } from '../error/useGlobalError';
import { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { SeverityRulesSchema } from "../../schema/severityRulesSchema"
import { useDataEngine } from "@dhis2/app-runtime"

export const useGetSeverityRules = () => {
  const { showError } = useGlobalError();
    const engine = useDataEngine()
    const [loading, setLoading] = useState<boolean>(false)
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const setSeverityRules = useSetRecoilState(SeverityRulesSchema)

    const getSeverityRules = async () => {
        if (!dataStoreDataState?.auditApi) {
            console.log('auditApi is not set in dataStoreDataState')
            return
        }
        
        try {
            setLoading(true)
            const response: any = await engine.query({
                notifications: {
                    resource: 'routes/notifications/run'
                }
            })

            setSeverityRules(response.notifications)
        } catch (error) {
      showError(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getSeverityRules, loading }
}
