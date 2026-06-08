import { useGlobalError } from '../error/useGlobalError';
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useDataEngine } from '@dhis2/app-runtime'
import { SqlView } from '../../types/sqlView/sqlView'
import { ErrorsSchema } from '../../schema/errorsSchema'
import sqlviews from '../../constants/sqlviews/sqlviews.json'
import { useInitializeUserGroup } from './useInitializeUserGroup';
import AccessDefiner from '../accessDefiner/useDefineAccess';

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
        skipSharing: true
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
    const [_, setErrorsState] = useRecoilState(ErrorsSchema)
    const { ensureAdminGroup, ensureViewerGroup } = useInitializeUserGroup()
    const { useDefineAccess } = AccessDefiner()

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
            { id: adminGroupUid, access: 'rw------' },
            { id: viewerGroupUid, access: 'r-------' }
        ],
    })

    const verifySqlViews = async () => {
        setLoading(true)
        let adminGroupUid = null, viewerGroupUid = null

        for (const view of sqlviews as any[]) {
            try {
                const response = await engine.query(GET_SQL_VIEW_QUERY(view.id)) as { sqlView: SqlView | null }
                const existingView = response.sqlView

                if (!existingView) {
                    if (!adminGroupUid) adminGroupUid = await ensureAdminGroup()
                    if (!viewerGroupUid) viewerGroupUid = await ensureViewerGroup()

                    await createSqlViews([withPermissions(view, adminGroupUid, viewerGroupUid)])
                    await useDefineAccess(view.id, adminGroupUid, viewerGroupUid)
                }

            } catch (error: any) {
                const err = error as { details?: { httpStatusCode?: number } }
                if (err.details?.httpStatusCode === 404) {
                    try {
                        if (!adminGroupUid) adminGroupUid = await ensureAdminGroup()
                        if (!viewerGroupUid) viewerGroupUid = await ensureViewerGroup()

                        await createSqlViews([withPermissions(view, adminGroupUid!, viewerGroupUid!)])
                        await useDefineAccess(view.id, adminGroupUid!, viewerGroupUid!)
                    } catch (createError: any) {
                        showError(createError);
                    }
                }
            }
        }

        setLoading(false)
    }

    const createSqlViews = async (views: SqlView[]) => {
        const view = views[0]
        const key = `create-sqlview-${view.id}`

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
            throw error
        }
    }

    const initialize = async () => {
        setProgress({})
        setLoading(true)

        try {
            await verifySqlViews()
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
        progress
    }
}