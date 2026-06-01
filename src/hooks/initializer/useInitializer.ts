import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import sqlviews from '../../constants/sqlviews/sqlviews.json'
import { SqlView } from '../../types/sqlView/sqlView'
import { useInitializeEventHook } from './useInitializeEventHook'
import { ErrorsSchema } from '../../schema/errorsSchema'
import { useSetRecoilState } from 'recoil'

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
        sqlViews: sqlViews,
    }),
}

export const useInitializer = () => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const { initialize: initializeEventHooks, loading: eventHookLoading } = useInitializeEventHook()
    const setErros = useSetRecoilState(ErrorsSchema)

    const verifySqlViews = async () => {
        setLoading(true)
        for (const view of sqlviews as SqlView[]) {
            try {
                const response = await engine.query(GET_SQL_VIEW_QUERY(view.id)) as { sqlView: SqlView | null }
                const existingView = response.sqlView

                if (existingView) {
                    compareSqlViews(existingView, view)
                } else {
                    createSqlViews([view])
                }
            } catch (error: any) {
                const err = error as { details?: { httpStatusCode?: number } }
                if (err.details?.httpStatusCode === 404) {
                    createSqlViews([view])
                } else {
                    setErros((prev: any) => ({ ...prev, sqlViews: [...(prev?.sqlViews || []), { error: `Error checking SQL View ${view.id}: ${error.message}`, object: view }] }))
                    console.error(`Error checking SQL View ${view.id}:`, error)
                }
            }
        }
        setLoading(false)
    }

    const compareSqlViews = (existingView: SqlView, newView: SqlView) => {
        if (existingView.sqlQuery !== newView.sqlQuery) {
            createSqlViews([newView])
        }
    }

    const createSqlViews = async (views: SqlView[]) => {
        try {
            await engine.mutate(CREATE_OR_UPDATE_SQL_VIEW_MUTATION as any, {
                variables: {
                    sqlViews: views,
                },
            })
            console.log(`SQL Views created/updated successfully:`, views.map(v => v.name))
        } catch (error: any) {
            setErros((prev: any) => ({
                ...prev,
                sqlViews: [...(prev?.sqlViews || []),
                { error: 'Error creating SQL View:  ' + error?.details?.response?.response?.typeReports?.[0]?.objectReports?.[0]?.errorReports?.[0]?.message || '', object: views[0] }]
            }))
            console.error('Error creating SQL Views:', views, error, error?.details)
        }
    }

    const initialize = async () => {
        await verifySqlViews()
        await initializeEventHooks()
    }

    return {
        initialize,
        loading: loading || eventHookLoading
    }
}
