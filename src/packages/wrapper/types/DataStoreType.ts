type DataStoreType = {
    key: string
    auditApi: string
    auditApiToken: string
    reports: {
        users: string
        changesByType: string
        mostActiveUsers: string
        changesByPeriod: string
        riskChanges: string
        changesOverTime: string
        topUsersChanges: string
    }
    monitoringGroups: Array<{
        id: string,
        name: string,
        createdAt: string
        updatedAt: string
        items: Array<{
            id: string,
            type: string
        }>,
        description: string
    }>
};

export type { DataStoreType }