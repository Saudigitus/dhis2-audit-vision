import { useGlobalError } from '../error/useGlobalError';
import { useState } from "react"
import { useDataEngine } from "@dhis2/app-runtime"

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
  const { showError } = useGlobalError();
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const engine = useDataEngine()

    const getAuditDetails = async (objectId: string) => {
        setLoading(true)
        try {
            const query = {
                auditObjects: {
                    resource: 'routes/audit-objects/run',
                    params: {
                        objectId
                    }
                }
            }
            
            const response = await engine.query(query)
            const auditData = response as any
            setData(auditData?.auditObjects?.auditObjects)
            return { data: auditData?.auditObjects }
        } catch (error) {
      showError(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getAuditDetails, auditDetails: data, loadingDetails: loading }
}
