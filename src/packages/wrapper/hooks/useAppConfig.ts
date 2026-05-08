import { useEffect } from "react"
// import { useGetDataStore } from "./dataStore/useGetDataStore"
import { useInitializeDataStore } from "./dataStore/useInitializeDataStore"

export default function useAppConfig() {
    // const { error, loading } = useGetDataStore()
    const { initializeDataStore, loading, error } = useInitializeDataStore()

    const initialize = async () => {
        await initializeDataStore()
    }

    useEffect(() => {
        initialize()
    }, [])


    return { loading: loading, error: error }
}