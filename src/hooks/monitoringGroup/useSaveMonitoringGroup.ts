import { useState, useCallback } from "react"
import { useDataEngine } from "@dhis2/app-runtime"
import { dataStoreKey, DataStoreType } from "../../packages/wrapper/config"
import usePostDataStore from "../../packages/wrapper/hooks/dataStore/usePostDataStore"
import { MonitoringGroup } from "../../types/monitoringGroups/MonitoringGroupsTypes"

const query = {
    dataStoreValues: {
        resource: dataStoreKey
    }
}

const formatGroupToPost = ({ dataStore, newGroup }: { dataStore: DataStoreType, newGroup: MonitoringGroup }): DataStoreType => {
    const exists = dataStore?.monitoringGroups?.some((g) => g?.id === newGroup?.id);
    const updated = exists
        ? dataStore?.monitoringGroups?.map((g) => (g?.id === newGroup?.id ? newGroup : g))
        : [...(dataStore?.monitoringGroups ?? []), newGroup];

    return {
        ...dataStore,
        monitoringGroups: updated,
    };
};

const useSaveMonitoringGroup = () => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const { createDataStore } = usePostDataStore()

    const saveMonitoringGroup = useCallback(async ({ newGroup }: { newGroup: MonitoringGroup }) => {
        setLoading(true)
        setError(null)

        try {
            const result: any = await engine.query(query)
            const dataToPost = formatGroupToPost({ dataStore: result?.dataStoreValues, newGroup })
            await createDataStore({ key: dataStoreKey, data: dataToPost })
            return { success: true }
        } catch (err) {
            const caught = err instanceof Error ? err : new Error(String(err))
            setError(caught)
            return { success: false, error: caught }
        } finally {
            setLoading(false)
        }
    }, [engine, createDataStore])

    return { saveMonitoringGroup, loading, error }
}

export { useSaveMonitoringGroup }