import { useDataEngine } from '@dhis2/app-runtime'

const ADMIN_GROUP_NAME = 'Audit Vision Administrators'
const ADMIN_GROUP_CODE = 'AUDIT_VISION_ADMINS'
const VIEWER_GROUP_NAME = 'Audit Vision Viewers'
const VIEWER_GROUP_CODE = 'AUDIT_VISION_VIEWERS'

const FIND_USER_GROUP_QUERY = (code: string) => ({
    userGroups: {
        resource: 'userGroups',
        params: {
            filter: `code:eq:${code}`,
            fields: 'id,name,code',
        },
    },
})

const GET_NEW_UID_QUERY = {
    id: { resource: 'system/id', params: { limit: 1 } },
}

export const useInitializeUserGroup = () => {
    const engine = useDataEngine()

    const ensureUserGroup = async (name: string, code: string): Promise<string> => {
        // 1. Look up by stable code — safe to call multiple times
        const result: any = await engine.query(FIND_USER_GROUP_QUERY(code))
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
                name,
                code,
                users: [],
            },
        } as any)

        return uid
    }

    const ensureAdminGroup = async (): Promise<string> => {
        return ensureUserGroup(ADMIN_GROUP_NAME, ADMIN_GROUP_CODE)
    }

    const ensureViewerGroup = async (): Promise<string> => {
        return ensureUserGroup(VIEWER_GROUP_NAME, VIEWER_GROUP_CODE)
    }

    return { ensureAdminGroup, ensureViewerGroup }
}
