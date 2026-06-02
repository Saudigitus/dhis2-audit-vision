import { useGlobalError } from '../../../../hooks/error/useGlobalError';
import { useState } from "react"
import { useDataEngine } from "@dhis2/app-runtime"

export default function usePostDataStore() {
    const { showError } = useGlobalError();
    const engine = useDataEngine()
    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const DATASTORE_MUTATE = ({ key, data }: { key: string, data: any }): any => {
        return {
            resource: key,
            type: "update",
            data: data,
            params: {
                importStrategy: 'CREATE_AND_UPDATE'
            }
        }
    }

    const createDataStore = async ({ data, key }: { data: any, key: string }) => {
        setLoading(true)
        try {
            const response = await engine.mutate(DATASTORE_MUTATE({ key, data }))
            return response;
        } catch (error) {
      showError(error);
            setError(error)
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return { createDataStore, loading, error }
}