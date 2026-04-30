import { useState, useCallback } from "react"
import { useDataEngine } from "@dhis2/app-runtime"
import { dataStoreKey } from "../../packages/wrapper/config"
import usePostDataStore from "../../packages/wrapper/hooks/dataStore/usePostDataStore"
import useShowAlerts from "../../packages/wrapper/hooks/alert/useShowAlert"

const query = {
    dataStoreValues: {
        resource: dataStoreKey
    }
}

const useAuditApi = () => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const { createDataStore } = usePostDataStore()
    const [error, setError] = useState<Error | null>(null)
    const { hide, show } = useShowAlerts()

    const updateApi = useCallback(async (auditApi: string) => {
        setLoading(true)
        setError(null)

        try {
            const result: any = await engine.query(query)
            await createDataStore({ key: dataStoreKey, data: { ...result?.dataStoreValues, auditApi } })

            show({
                message: `Configuration saved successfuly!`,
                type: { success: true }
            });
            setTimeout(hide, 5000);
            window.location.reload()
        } catch (err) {
            const caught = err instanceof Error ? err : new Error(String(err))
            show({
                message: `Unknown error: ${caught}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            setError(caught)
        } finally {
            setLoading(false)
        }
    }, [engine, createDataStore])

    return { updateApi, loading, error }
}

export { useAuditApi }