import { useRef, useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import { useGetDataStore } from './useGetDataStore'
import { DataStoreType } from '../../types/DataStoreType'
import views from "../../../../constants/sqlviews/sqlviews.json"
import { defaultDataStoreConfig, KEY, NAMESPACE } from '../../constants/config'

export const useInitializeDataStore = () => {
    const ran = useRef(false)
    const engine = useDataEngine()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const { refetch: getDataStore } = useGetDataStore()

    const createOrUpdate = async (config: any) => {
        await engine.mutate({
            resource: `dataStore/${NAMESPACE}/${KEY}`,
            type: 'update',
            data: config,
        } as any)
    }

    const initializeDataStore = async () => {
        if (ran.current) {
            setLoading(false)
            return
        }
        ran.current = true

        try {
            const baseConfig = defaultDataStoreConfig
            const existing = await getDataStore()
            const finalConfig = buildReportsConfig(
                existing ?? baseConfig
            )

            if (!existing) {
                await engine.mutate({
                    resource: `dataStore/${NAMESPACE}/${KEY}`,
                    type: 'create',
                    data: finalConfig,
                } as any)

                return
            }

            const isSameShape = isSameStructure(existing, baseConfig)
            const reportsComplete = configHasReports(existing)
            if (!isSameShape || !reportsComplete) {
                await createOrUpdate(finalConfig)
            }

        } catch (error) {
            console.error('Datastore initialization error:', error)

            try {
                await engine.mutate({
                    resource: `dataStore/${NAMESPACE}/${KEY}`,
                    type: 'create',
                    data: defaultDataStoreConfig,
                } as any)
            } catch (fallbackError) {
                setError(true)
                console.error('Recovery failed:', fallbackError)
            }

        } finally {
            setLoading(false)
        }
    }

    return { initializeDataStore, loading, error }
}

function isSameStructure(a: any, b: any): boolean {
    const isObject = (v: any) =>
        v !== null && typeof v === 'object' && !Array.isArray(v)

    const isArray = Array.isArray

    if (isObject(a) && isObject(b)) {
        const keysA = Object.keys(a).sort()
        const keysB = Object.keys(b).sort()

        if (keysA.length !== keysB.length) return false

        return keysA.every(key =>
            isSameStructure(a[key], b[key])
        )
    }

    if (isArray(a) && isArray(b)) {
        if (a.length === 0 || b.length === 0) return true
        return isSameStructure(a[0], b[0])
    }

    return typeof a === typeof b
}

function configHasReports(config: DataStoreType): boolean {
    return Object.values(config?.reports ?? {}).every(Boolean)
}

function buildReportsConfig(config: DataStoreType): DataStoreType {
    const getViewId = (name: string) =>
        views.find((view) => view.name === name)?.id ?? ""

    return {
        ...config,

        reports: {
            users: getViewId("users_with_audits"),
            riskChanges: getViewId("audit_total_risk"),
            changesByType: getViewId("audit_by_types"),
            changesByPeriod: getViewId("audit_totals"),
            changesOverTime: getViewId("audit_daily"),
            topUsersChanges: getViewId("audit_top_5_by_date"),
            mostActiveUsers: getViewId("audit_total_per_user"),
        },
    }
}