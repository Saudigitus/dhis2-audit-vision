import { useGetDataStore } from "./dataStore/useGetDataStore"

export default function useAppConfig() {
    const { error, loading } = useGetDataStore()

    return {
        error,
        loading: loading
    }
}