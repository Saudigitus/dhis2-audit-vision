import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import { useRecoilValue } from 'recoil'
import eventHooks from '../../constants/eventHooks/eventHooks.json'
import { EventHook } from '../../types/eventHook/eventHook'
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema'

const GET_EVENT_HOOK_QUERY = (id: string) => ({
    eventHook: {
        resource: `eventHooks/${id}`,
    }
})

const CREATE_OR_UPDATE_EVENT_HOOK_MUTATION = {
    type: 'create',
    resource: 'metadata',
    params: {
        importStrategy: 'CREATE_AND_UPDATE',
    },
    data: ({ eventHooks }: { eventHooks: EventHook[] }) => ({
        eventHooks: eventHooks,
    }),
}

export const useInitializeEventHook = () => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const dataStoreConfig = useRecoilValue(DataStoreConfigState)

    const buildEventHookWithUrl = (): EventHook => {
        const hook = { ...eventHooks } as EventHook
        if (dataStoreConfig?.auditApi) {
            const baseUrl = dataStoreConfig.auditApi
            hook.targets[0].url = `${baseUrl}/api/webhooks/dhis2/event`
        }
        return hook
    }

    const verifyEventHooks = async () => {
        if (!dataStoreConfig?.auditApi) {
            console.log('Audit API URL not configured, skipping event hook initialization')
            return
        }

        setLoading(true)
        const hook = buildEventHookWithUrl()
        
        try {
            const response = await engine.query(GET_EVENT_HOOK_QUERY(hook.id)) as { eventHook: EventHook | null }
            const existingHook = response.eventHook

            if (existingHook) {
                compareEventHooks(existingHook, hook)
            } else {
                createEventHooks([hook])
            }
        } catch (error: unknown) {
            const err = error as { details?: { httpStatusCode?: number } }
            if (err.details?.httpStatusCode === 404) {
                createEventHooks([hook])
            } else {
                console.error(`Error checking Event Hook ${hook.id}:`, error)
            }
        }
        setLoading(false)
    }

    const compareEventHooks = (existingHook: EventHook, newHook: EventHook) => {
        const isSourceEqual = JSON.stringify(existingHook.source) === JSON.stringify(newHook.source)
        const isTargetsEqual = JSON.stringify(existingHook.targets) === JSON.stringify(newHook.targets)
        
        if (!isSourceEqual || !isTargetsEqual) {
            createEventHooks([newHook])
        }
    }

    const createEventHooks = async (hooks: EventHook[]) => {
        try {
            await engine.mutate(CREATE_OR_UPDATE_EVENT_HOOK_MUTATION as any, {
                variables: {
                    eventHooks: hooks,
                },
            })
            console.log(`Event Hooks created/updated successfully:`, hooks.map(h => h.name))
        } catch (error) {
            console.error('Error creating Event Hooks:', error)
        }
    }

    const initialize = async () => {
        await verifyEventHooks()
    }

    return {
        initialize,
        loading
    }
}