const dataStoreKey = "dataStore/audit/values"
export { dataStoreKey }

type DataStoreType = {
    key: string
    auditApi: string
    monitoringGroups: Array<{
        id: string,
        name: string,
        createdAt: string
        updatedAt: string
        items: Array<{
            id: string,
            // name: string,
            type: "program" | "dataSet"
        }>,
        // programs: Array<{
        //     id: string,
        //     name: string
        // }>,
        // dataSets: Array<{
        //     id: string,
        //     name: string
        // }>
        description: string
    }>
};

export type { DataStoreType }