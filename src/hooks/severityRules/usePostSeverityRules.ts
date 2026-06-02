import { useGlobalError } from '../error/useGlobalError';
import { useState } from "react"
import useShowAlerts from "../../packages/wrapper/hooks/alert/useShowAlert"
import { useDataEngine } from "@dhis2/app-runtime"

export interface DataProps {
    id: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

export const usePostSeverityRules = () => {
  const { showError } = useGlobalError();
    const [loading, setLoading] = useState<boolean>(false)
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine()

    const postAuditRules = async (form: any) => {
        setLoading(true)
        try {
            await engine.mutate({
                type: 'create',
                resource: 'routes/create-notification/run',
                data: form
            })
            show({
                message: `Rule created successfully`,
                type: { success: true }
            });
            setTimeout(hide, 5000);
            
            return { error: false }
        } catch (error: any) {
      showError(error);
            const detail = error?.details?.response?.data?.detail?.[0]?.msg || 'Rule creation failed';
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
