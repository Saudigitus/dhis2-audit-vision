import { useRecoilState } from "recoil"
import { dataStoreKey } from "../../config"
import useShowAlerts from "../alert/useShowAlert"
import { DataStoreConfigState } from "../../types/DataStoreSchema"
import { useDataEngine } from "@dhis2/app-runtime"
import { useEffect, useState } from "react"

const query = {
    dataStoreValues: {
        resource: dataStoreKey
    }
}

export function useGetDataStore() {
    const engine = useDataEngine()
    const { show, hide } = useShowAlerts()
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [dataStoreDataState, setDataStoreDataState] = useRecoilState(DataStoreConfigState)

    const getDataStore = async () => {
        setLoading(true)
        try {
            const response: any = await engine.query(query)
            setDataStoreDataState(response?.dataStoreValues)
            return response;
        } catch (error: any) {
            setError(error)
            show({
                message: `Can't load resources data store`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!dataStoreDataState) {
            getDataStore()
        }
    }, [])

    // const { error, loading, refetch } = useDataQuery<any>(query, {
    //     onComplete: (response: any) => {
    //         setDataStoreDataState(response?.dataStoreValues)
    //     },
    //     onError: (error: FetchError) => {
    //         show({
    //             message: `Can't load resources data store`,
    //             type: { critical: true }
    //         })
    //         setTimeout(hide, 5000)
    //     },
    //     lazy,
    // })

    return { refetch: getDataStore, loading, error }
}