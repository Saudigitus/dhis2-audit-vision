const dataStoreKey = "dataStore/audit/values"
export { dataStoreKey }

type DataStoreType = {
    key: string
    auditApi: string
    reports: {
        changesByType: string
        mostActiveUsers: string
        changesByPeriod: string
        updatesByPeriod: string
        changesOverTime: string
    }
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