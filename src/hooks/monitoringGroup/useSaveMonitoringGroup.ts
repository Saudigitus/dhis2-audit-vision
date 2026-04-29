import { useState } from "react"
import { useDataEngine } from "@dhis2/app-runtime"
import { dataStoreKey, DataStoreType } from "../../packages/wrapper/config"
import usePostDataStore from "../../packages/wrapper/hooks/dataStore/usePostDataStore"
import { MonitoringGroup } from "src/types/monitoringGroups/MonitoringGroupsTypes"

const query = {
    dataStoreValues: {
        resource: dataStoreKey
    }
}

// const mutation = {
//     type: "create",
//     resource: dataStoreKey,
//     data: (data: any) => data,
//     params: {
//         importStrategy: 'CREATE_AND_UPDATE'
//     }
// }

const formatGroupToPost = ({ dataStore, newGroup }: { dataStore: DataStoreType, newGroup: MonitoringGroup }) => {
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
    const { createDataStore } = usePostDataStore()

    const saveMonitoringGroup = async ({ newGroup }: { newGroup: MonitoringGroup }) => {
        setLoading(true)

        await engine.query(query, {
            onComplete: async (result) => {

                const dataToPost = formatGroupToPost({ dataStore: result?.dataStoreValues, newGroup })

                await createDataStore({ key: dataStoreKey, data: dataToPost })
                    .finally(() => {
                        setLoading(false)
                    })
            },

        })
    }

    return { saveMonitoringGroup, loading }
}

export { useSaveMonitoringGroup }