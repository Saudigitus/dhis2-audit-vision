import { useGlobalError } from '../error/useGlobalError';
import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import { useSetRecoilState } from 'recoil'
import eventHooks from '../../constants/eventHooks/eventHooks.json'
import { EventHook } from '../../types/eventHook/eventHook'
import { ErrorsSchema } from '../../schema/errorsSchema'

const GET_EVENT_HOOK_QUERY = (id: string) => ({
    eventHook: {
        resource: `eventHooks/${id}`,
    }
})

export const useInitializeEventHook = () => {
    const { showError } = useGlobalError()
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const setErrors = useSetRecoilState(ErrorsSchema)

    const buildEventHook = (
        auditApi: string,
        token: string,
        adminGroupUid: string,
        viewerGroupUid: string
    ): EventHook => {
        const hook = { ...eventHooks } as unknown as EventHook

        hook.targets[0].url = `${auditApi}/api/webhooks/dhis2/event`

        // Use DHIS2's structured auth field — encrypted at rest, never returned by GET /api/eventHooks
        hook.targets[0].auth = { type: 'api-token', token }

        // Restrict access to the admin and viewer groups
        hook.publicAccess = '--------'
        hook.userGroupAccesses = [
            { id: adminGroupUid, access: 'rw------' },
            { id: viewerGroupUid, access: 'r-------' }
        ]

        return hook
    }

    const hookNeedsUpdate = (existing: EventHook, desired: EventHook): boolean => {
        const urlChanged = existing.targets?.[0]?.url !== desired.targets?.[0]?.url
        const accessChanged = existing.publicAccess !== desired.publicAccess
        const adminGroupMissing = !existing.userGroupAccesses?.some(
            (a: any) => a.id === desired.userGroupAccesses?.[0]?.id
        )
        const viewerGroupMissing = !existing.userGroupAccesses?.some(
            (a: any) => a.id === desired.userGroupAccesses?.[1]?.id
        )
        // Note: we cannot compare auth/token since DHIS2 never returns it in GET responses.
        // Always recreate on URL or access change; otherwise leave the existing hook intact.
        return urlChanged || accessChanged || adminGroupMissing || viewerGroupMissing
    }

    const verifyEventHooks = async (
        auditApi?: string,
        token?: string,
        adminGroupUid?: string,
        viewerGroupUid?: string
    ) => {
        if (!auditApi || !token || !adminGroupUid || !viewerGroupUid) return

        setLoading(true)
        const desired = buildEventHook(auditApi, token, adminGroupUid, viewerGroupUid)

        try {
            let existingHook: EventHook | null = null
            try {
                const response = await engine.query(GET_EVENT_HOOK_QUERY(desired.id)) as { eventHook: EventHook | null }
                existingHook = response.eventHook
            } catch {
                // 404 — hook does not exist yet
            }

            if (existingHook && !hookNeedsUpdate(existingHook, desired)) {
                setLoading(false)
                return  // already up to date, nothing to do
            }

            if (existingHook) {
                console.log('Existing event hook found, deleting it')
                await engine.delete(`eventHooks/${desired.id}`)
            }

            console.log('Creating new event hook')
            await engine.post('eventHooks', desired)
        } catch (error: any) {
            showError(error)
            setErrors((prev: any) => ({
                ...prev,
                webHooks: [
                    ...(prev?.webHooks || []),
                    { error: `Error initializing Event Hook ${desired.id}: ${error.message}`, object: desired },
                ],
            }))
        }
        setLoading(false)
    }

    const initialize = async (auditApi?: string, token?: string, adminGroupUid?: string, viewerGroupUid?: string) => {
        await verifyEventHooks(auditApi, token, adminGroupUid, viewerGroupUid)
    }

    return { initialize, loading }
}
