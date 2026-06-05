import { useGlobalError } from '../error/useGlobalError';
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useDataEngine } from '@dhis2/app-runtime'
import { SqlView } from '../../types/sqlView/sqlView'
import { ErrorsSchema } from '../../schema/errorsSchema'
import sqlviews from '../../constants/sqlviews/sqlviews.json'
import { UserAuthoritiesSchema } from '../../schema/userAuthoritiesSchema';
import { useInitializeUserGroup } from './useInitializeUserGroup';

const GET_SQL_VIEW_QUERY = (id: string) => ({
    sqlView: {
        resource: `sqlViews/${id}`,
    }
})

const CREATE_OR_UPDATE_SQL_VIEW_MUTATION = {
    type: 'create',
    resource: 'metadata',
    params: {
        importStrategy: 'CREATE_AND_UPDATE',
    },
    data: ({ sqlViews }: { sqlViews: SqlView[] }) => ({
        sqlViews,
    }),
}
type progress = {
    object?: any
    date: string
    action: string
    details?: string
    status: 'PENDING' | 'SUCCESS' | 'ERROR'
}

export const useInitializer = () => {
    const { showError } = useGlobalError();
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const [hasAuthority, setHasAuthority] = useState(true)
    const authorities = useRecoilValue(UserAuthoritiesSchema)
    const [_, setErrorsState] = useRecoilState(ErrorsSchema)
    const { ensureAdminGroup, ensureViewerGroup } = useInitializeUserGroup()

    const [progress, setProgress] = useState<Record<string, progress>>({})
    const updateProgress = (key: string, action: string, status: 'PENDING' | 'SUCCESS' | 'ERROR', details?: string, object?: any) => {
        setProgress(prev => ({
            ...prev, [key]: { action, status, details, object, date: new Date().toISOString() }
        }))
    }

    // Stamps correct permissions onto a view object before sending to DHIS2
    const withPermissions = (view: SqlView, adminGroupUid: string, viewerGroupUid: string): SqlView => ({
        ...view,
        publicAccess: '--------',
        userGroupAccesses: [
            { id: adminGroupUid, access: 'rwrw----' },
            { id: viewerGroupUid, access: 'r-------' }
        ],
    })

    // Widened: re-apply permissions even if only access settings changed
    const compareSqlViews = async (
        existingView: SqlView,
        newView: SqlView,
        adminGroupUid: string,
        viewerGroupUid: string
    ) => {
        const desired = withPermissions(newView, adminGroupUid, viewerGroupUid)

        const sqlChanged = existingView.sqlQuery !== desired.sqlQuery
        const accessChanged = existingView.publicAccess !== desired.publicAccess
        const adminGroupMissing = !existingView.userGroupAccesses?.some(
            (a: any) => a.id === adminGroupUid
        )
        const viewerGroupMissing = !existingView.userGroupAccesses?.some(
            (a: any) => a.id === viewerGroupUid
        )

        if (sqlChanged || accessChanged || adminGroupMissing || viewerGroupMissing) {
            await createSqlViews([desired])
        }
    }

    const verifySqlViews = async (adminGroupUid: string, viewerGroupUid: string) => {
        setLoading(true)

        for (const view of sqlviews as SqlView[]) {
            try {
                const response = await engine.query(GET_SQL_VIEW_QUERY(view.id)) as { sqlView: SqlView | null }
                const existingView = response.sqlView

                if (existingView) {
                    await compareSqlViews(existingView, view, adminGroupUid, viewerGroupUid)
                } else {
                    await createSqlViews([withPermissions(view, adminGroupUid, viewerGroupUid)])
                }

            } catch (error: any) {
                const err = error as { details?: { httpStatusCode?: number } }
                if (err.details?.httpStatusCode === 404) {
                    try {
                        await createSqlViews([withPermissions(view, adminGroupUid, viewerGroupUid)])
                    } catch (createError: any) {
                        showError(createError);
                        console.error(`Error checking SQL View ${view.id}:`, error)
                    }
                }
            }
        }

        setLoading(false)
    }

    const createSqlViews = async (views: SqlView[]) => {
        const view = views[0]
        const key = `create-sqlview-${view.id}`
        const hasSqlViewAuth = authorities?.user?.some(auth => auth === 'F_SQLVIEW_PUBLIC_ADD' || auth === 'ALL')

        if (!hasSqlViewAuth) {
            setHasAuthority(false)
            return
        }

        try {
            updateProgress(key, `Creating SQL View ${view.name}`, 'PENDING', undefined, view)

            await engine.mutate(CREATE_OR_UPDATE_SQL_VIEW_MUTATION as any, {
                variables: {
                    sqlViews: views,
                },
            })

            updateProgress(key, `Creating SQL View ${view.name}`, 'SUCCESS', undefined, view)

        } catch (error: any) {

            showError(error);
            setErrorsState((prev: any) => ({
                ...prev,
                sqlViews: [...(prev?.sqlViews || []),
                { error: 'Error creating SQL View:  ' + error?.details?.response?.response?.typeReports?.[0]?.objectReports?.[0]?.errorReports?.[0]?.message || '', object: views[0] }]
            }))

            updateProgress(key, `Creating SQL View ${view.name}`, 'ERROR', error?.message || 'Unknown error', view)
            console.error('Error creating SQL Views:', views, error)
            throw error
        }
    }

    const initialize = async () => {
        setProgress({})
        setLoading(true)

        try {
            // Ensure the admin and viewer groups exist before anything else
            updateProgress('user-groups', 'Ensuring admin and viewer user groups', 'PENDING')
            const adminGroupUid = await ensureAdminGroup()
            const viewerGroupUid = await ensureViewerGroup()
            updateProgress('user-groups', 'Ensuring admin and viewer user groups', 'SUCCESS')

            await verifySqlViews(adminGroupUid, viewerGroupUid)
        } catch (error: any) {
            console.log(error)
            showError(error);
            updateProgress('user-groups', 'Ensuring admin and viewer user groups', 'ERROR', error?.message || 'Unknown error')
        }

        setLoading(false)
    }

    return {
        initialize,
        loading: loading,
        progress,
        hasAuthority
    }
}