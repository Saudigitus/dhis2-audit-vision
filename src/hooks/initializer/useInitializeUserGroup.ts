import { useDataEngine } from '@dhis2/app-runtime'

const USER_GROUP_NAME = 'Audit Vision Administrators'
const USER_GROUP_CODE = 'AUDIT_VISION_ADMINS'

const FIND_USER_GROUP_QUERY = {
    userGroups: {
        resource: 'userGroups',
        params: {
            filter: `code:eq:${USER_GROUP_CODE}`,
            fields: 'id,name,code',
        },
    },
}

const GET_NEW_UID_QUERY = {
    id: { resource: 'system/id', params: { limit: 1 } },
}

export const useInitializeUserGroup = () => {
    const engine = useDataEngine()

    const ensureAdminGroup = async (): Promise<string> => {
        // 1. Look up by stable code — safe to call multiple times
        const result: any = await engine.query(FIND_USER_GROUP_QUERY)
        const existing = result?.userGroups?.userGroups?.[0]
        if (existing) {
            return existing.id
        }

        // 2. Get a fresh UID from DHIS2
        const uidResult: any = await engine.query(GET_NEW_UID_QUERY)
        const uid: string = uidResult?.id?.codes?.[0]

        // 3. Create the group
        await engine.mutate({
            type: 'create',
            resource: 'userGroups',
            data: {
                id: uid,
                name: USER_GROUP_NAME,
                code: USER_GROUP_CODE,
                users: [],
            },
        } as any)

        return uid
    }

    return { ensureAdminGroup }
}
