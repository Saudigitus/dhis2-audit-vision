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
    const { showError } = useGlobalError();
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const setErros = useSetRecoilState(ErrorsSchema)

    const buildEventHookWithUrl = (auditApi?: string, token?: string): EventHook => {
        const hook = { ...eventHooks } as unknown as EventHook

        const baseUrl = auditApi
        hook.targets[0].url = `${baseUrl}/api/webhooks/dhis2/event`
        hook.targets[0].auth = { type: 'api-token', token: token ?? '' }

        return hook
    }

    const verifyEventHooks = async (auditApi?: string, token?: string) => {
        if (!auditApi) {
            console.log('Audit API URL not configured, skipping event hook initialization')
            return
        }

        setLoading(true)
        const hook = buildEventHookWithUrl(auditApi, token)

        try {
            let existingHook: EventHook | null = null
            try {
                const response = await engine.query(GET_EVENT_HOOK_QUERY(hook.id)) as { eventHook: EventHook | null }
                existingHook = response.eventHook
            } catch (err) {
                // If query fails, hook probably doesn't exist
            }

            if (existingHook) {
                console.log('Existing event hook found, deleting it')
                await engine.delete(`eventHooks/${hook.id}`)
            }

            console.log('Creating new event hook')
            await engine.post(`eventHooks`, hook)

        } catch (error: any) {
            showError(error);
            setErros((prev: any) => ({ ...prev, webHooks: [...prev?.webHooks || [], { error: `Error initializing Event Hook ${hook.id}: ${error.message}`, object: hook }] }))
        }
        setLoading(false)
    }

    const initialize = async (auditApi?: string, token?: string) => {
        await verifyEventHooks(auditApi, token)
    }

    return {
        initialize,
        loading
    }
}