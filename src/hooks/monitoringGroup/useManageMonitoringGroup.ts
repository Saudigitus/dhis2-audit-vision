import { useState, useCallback } from "react"
import { useDataEngine } from "@dhis2/app-runtime"
import { dataStoreKey, DataStoreType } from "../../packages/wrapper/config"
import { MonitoringGroup } from "../../types/monitoringGroups/MonitoringGroupsTypes"
import usePostDataStore from "../../packages/wrapper/hooks/dataStore/usePostDataStore"

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

const formatGroupToDelete = ({ dataStore, groupToDelete }: { dataStore: DataStoreType, groupToDelete: MonitoringGroup }): DataStoreType => {
    const exists = dataStore?.monitoringGroups?.some((g) => g?.id === groupToDelete?.id);

    const updated = exists
        ? [...dataStore?.monitoringGroups?.filter((g) => (g?.id !== groupToDelete?.id))]
        : [...(dataStore?.monitoringGroups ?? []), groupToDelete];

    return {
        ...dataStore,
        monitoringGroups: updated,
    };
};

const useManageMonitoringGroup = () => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const { createDataStore } = usePostDataStore()
    const [error, setError] = useState<Error | null>(null)

    const manageMonitoringGroup = useCallback(async ({ group, mode = "post" }: { group: MonitoringGroup, mode?: "post" | "delete" }) => {
        setLoading(true)
        setError(null)

        try {
            const result: any = await engine.query(query)
            const dataToPost = mode == "post"
                ? formatGroupToPost({ dataStore: result?.dataStoreValues, newGroup: group })
                : formatGroupToDelete({ dataStore: result?.dataStoreValues, groupToDelete: group })

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

    return { manageMonitoringGroup, loading, error }
}

export { useManageMonitoringGroup }