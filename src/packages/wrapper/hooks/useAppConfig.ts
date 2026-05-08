import { useEffect } from "react"
import { useInitializeDataStore } from "./dataStore/useInitializeDataStore"

export default function useAppConfig() {
    const { initializeDataStore, loading, error } = useInitializeDataStore()

    const initialize = async () => {
        await initializeDataStore()
    }

    useEffect(() => {
        initialize()
    }, [])


    return { loading: loading, error: error }
}