import { useGlobalError } from '../error/useGlobalError';
import { useState, useCallback } from "react"
import { useDataEngine } from "@dhis2/app-runtime"
import usePostDataStore from "../../packages/wrapper/hooks/dataStore/usePostDataStore"
import useShowAlerts from "../../packages/wrapper/hooks/alert/useShowAlert"
import { dataStoreKey } from "../../packages/wrapper/constants/config"
import { useInitializeRoutes } from "./useInitializeRoutes"
import { useInitializeEventHook } from '../initializer/useInitializeEventHook';
import { useInitializeUserGroup } from '../initializer/useInitializeUserGroup';

const query = {
    dataStoreValues: {
        resource: dataStoreKey
    }
}

const useAuditApi = () => {
    const { showError } = useGlobalError();
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const { createDataStore } = usePostDataStore()
    const [error, setError] = useState<Error | null>(null)
    const { hide, show } = useShowAlerts()
    const { initializeRoutes } = useInitializeRoutes()
    const { initialize: initializeEventHooks } = useInitializeEventHook()
    const { ensureAdminGroup } = useInitializeUserGroup()


    const updateApi = useCallback(async (auditApi: string, auditApiToken: string) => {
        setLoading(true)
        setError(null)

        try {
            const result: any = await engine.query(query)
            await createDataStore({ key: dataStoreKey, data: { ...result?.dataStoreValues, auditApi } })

            // Ensure the admin group exists before wiring up the event hook
            const adminGroupUid = await ensureAdminGroup()
            await initializeRoutes(auditApi, auditApiToken)
            await initializeEventHooks(auditApi, auditApiToken, adminGroupUid)
            
            show({
                message: `Configuration saved successfuly!`,
                type: { success: true }
            });
            setTimeout(hide, 5000);
            // window.location.hash = "#/"
            // window.location.reload()
        } catch (err) {
            showError(err);
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
    }, [engine, createDataStore, initializeRoutes, initializeEventHooks, ensureAdminGroup])

    return { updateApi, loading, error }
}

export { useAuditApi }