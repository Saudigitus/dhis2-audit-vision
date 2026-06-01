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
        sqlViews,
    }),
}
type progress = {
    action: string
    status: 'PENDING' | 'SUCCESS' | 'ERROR'
    details?: string
    object?: any
    date: string
}
export const useInitializer = () => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState<Record<string, progress>>({})
    const { initialize: initializeEventHooks, loading: eventHookLoading } = useInitializeEventHook()
    const setErros = useSetRecoilState(ErrorsSchema)

    const updateProgress = (key: string, action: string, status: 'PENDING' | 'SUCCESS' | 'ERROR', details?: string, object?: any) => {
        setProgress(prev => ({
            ...prev,
            [key]: {
                action,
                status,
                details,
                object,
                date: new Date().toISOString()
            }
        }))
    }

    const verifySqlViews = async () => {
        setLoading(true)

        for (const view of sqlviews as SqlView[]) {
            const key = `sqlview-${view.id}`

            try {
                updateProgress(key, `Checking SQL View ${view.name}`, 'PENDING', undefined, view)

                const response = await engine.query(GET_SQL_VIEW_QUERY(view.id)) as { sqlView: SqlView | null }

                const existingView = response.sqlView

                if (existingView) {
                    await compareSqlViews(existingView, view)
                } else {
                    await createSqlViews([view])
                }

                updateProgress(key, `Checking SQL View ${view.name}`, 'SUCCESS', undefined, view)
            } catch (error: any) {
                const err = error as { details?: { httpStatusCode?: number } }

                const details = error?.details?.response?.message || error?.message || JSON.stringify(error)

                if (err.details?.httpStatusCode === 404) {
                    try {
                        await createSqlViews([view])
                        updateProgress(key, `Checking SQL View ${view.name}`, 'SUCCESS', undefined, view)
                    } catch (createError: any) {
                        updateProgress(
                            key,
                            `Checking SQL View ${view.name}`,
                            'ERROR',
                            createError?.message || 'Unknown error',
                            view
                        )

                        setErros((prev: any) => ({
                            ...prev,
                            sqlViews: [
                                ...(prev?.sqlViews || []),
                                { error: createError?.message, object: view }
                            ]
                        }))
                    }
                } else {
                    updateProgress(key, `Checking SQL View ${view.name}`, 'ERROR', details, view)

                    setErros((prev: any) => ({
                        ...prev,
                        sqlViews: [
                            ...(prev?.sqlViews || []),
                            { error: details, object: view }
                        ]
                    }))

                    console.error(`Error checking SQL View ${view.id}:`, error)
                }
            }
        }

        setLoading(false)
    }

    const compareSqlViews = async (existingView: SqlView, newView: SqlView) => {
        if (existingView.sqlQuery !== newView.sqlQuery) {
            await createSqlViews([newView])
        }
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

            console.log(`SQL Views created/updated successfully:`, views.map(v => v.name))
        } catch (error: any) {
            const details =
                error?.details?.response?.response?.typeReports?.[0]?.objectReports?.[0]?.errorReports?.[0]?.message ||
                error?.message ||
                'Unknown error'

            updateProgress(key, `Creating SQL View ${view.name}`, 'ERROR', details, view)

            setErros((prev: any) => ({
                ...prev,
                sqlViews: [
                    ...(prev?.sqlViews || []),
                    { error: details, object: view }
                ]
            }))

            console.error('Error creating SQL Views:', views, error)

            throw error
        }
    }

    const initialize = async () => {
        setProgress({})
        setLoading(true)

        const eventHookKey = 'event-hooks'

        try {
            await verifySqlViews()

            updateProgress(eventHookKey, 'Initializing Event Hooks', 'PENDING')

            await initializeEventHooks()

            updateProgress(eventHookKey, 'Initializing Event Hooks', 'SUCCESS')
        } catch (error: any) {
            updateProgress(
                eventHookKey,
                'Initializing Event Hooks',
                'ERROR',
                error?.message || 'Unknown error'
            )
        }

        setLoading(false)
    }

    return {
        initialize,
        loading: loading || eventHookLoading,
        progress
    }
}