import { useEffect } from "react"
import { useGetDataStore } from "./dataStore/useGetDataStore"

export default function useAppConfig() {
    const { error, loading } = useGetDataStore()

    useEffect(() => {

    }, [])

    return {
        error,
        loading
    }
}