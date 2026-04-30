import { useState } from "react"
import { useDataEngine } from "@dhis2/app-runtime"


export function useGetDataStoreConfig() {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)

    const getDataStore = async (key: string) => {
        try {
            const response = await engine.query(
                {
                    dataStoreConfig: {
                        resource: key
                    }
                })
            return response;
        } catch (error: any) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return { getDataStore, loading }
}