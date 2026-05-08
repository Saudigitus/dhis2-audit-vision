export const KEY = 'values'
export const NAMESPACE = 'audit'

export const dataStoreKey = `dataStore/${NAMESPACE}/${KEY}`

export const defaultDataStoreConfig = {
    "key": "audit",
    "auditApi": "",
    "monitoringGroups": [
        {
            "createdAt": "",
            "description": "",
            "id": "",
            "items": [
                {
                    "id": "",
                    "type": ""
                }
            ],
            "name": "",
            "updatedAt": ""
        }
    ],
    "reports": {
        "changesByPeriod": "",
        "changesByType": "",
        "changesOverTime": "",
        "mostActiveUsers": "",
        "riskChanges": "",
        "topUsersChanges": "",
        "users": ""
    }
}