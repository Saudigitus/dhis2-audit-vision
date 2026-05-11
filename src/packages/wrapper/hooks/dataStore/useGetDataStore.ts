import { useState } from "react"
import { useRecoilState } from "recoil"
import useShowAlerts from "../alert/useShowAlert"
import { useDataEngine } from "@dhis2/app-runtime"
import { dataStoreKey } from "../../constants/config"
import { DataStoreConfigState } from "../../types/DataStoreSchema"

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
    const [, setDataStoreDataState] = useRecoilState(DataStoreConfigState)

    const getDataStore = async () => {
        setLoading(true)
        try {
            const response: any = await engine.query(query)
            setDataStoreDataState(response?.dataStoreValues)
            return response?.dataStoreValues;
        } catch (error: any) {
            const status = error?.details?.httpStatusCode
            if (status === 404) return null
            setError(error)
            show({
                message: `Can't load resources data store`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
            return false
        } finally {
            setLoading(false)
        }
    }

    return { refetch: getDataStore, loading, error }
}