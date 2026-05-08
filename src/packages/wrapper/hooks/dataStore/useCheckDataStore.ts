import { useState } from 'react'
import { useSetRecoilState } from "recoil";
import { useCreateDsDir } from './useCreateDsDir';
import useGetDataStoreConfig from './useGetDataStoreConfig';
import { DataStoreConfigState } from '../../types/DataStoreSchema';

export function useCheckDataStore(keySpace: string) {
    const [loading, setLoading] = useState<boolean>(true)
    const { getDataStore } = useGetDataStoreConfig({ setLoading })
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)
    const { createDir, error: createError } = useCreateDsDir({ keySpace, setLoading, type: 'update', onError: () => { } })

    const areObjectsEqual = (obj1: any, obj2: any) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2)
    }

    const startCheck = async () => {
        await getDataStore(keySpace).then((data: any) => {
            if (!areObjectsEqual({}, data?.dataStoreConfig)) {
                void createDir()
            } else {
                setDataStoreConfigState(data?.dataStoreConfig)
            }
        }).catch((error) => {
            const errorCode = error?.details.httpStatusCode
            if (errorCode == 404 || errorCode == undefined) {
                createDir();
            }
        })
    }

    return { loading, startCheck, createError }
}