import { useSetRecoilState } from "recoil"
import { dataStoreKey } from "../../config"
import useShowAlerts from "../alert/useShowAlert"
import { DataStoreConfigState } from "../../types/DataStoreSchema"
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"

const query = {
    dataStoreValues: {
        resource: dataStoreKey
    }
}

export function useGetDataStore(lazy: boolean = false) {
    const { show, hide } = useShowAlerts()
    const setDataStoreDataState = useSetRecoilState(DataStoreConfigState)

    const { error, loading, refetch } = useDataQuery<any>(query, {
        onComplete: (response: any) => {
            setDataStoreDataState(response?.dataStoreValues)
        },
        onError: (error: FetchError) => {
            show({
                message: `Can't load resources data store`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        },
        lazy,
    })

    return { refetch, loading, error }
}