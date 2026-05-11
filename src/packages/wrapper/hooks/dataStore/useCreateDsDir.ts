import { useSetRecoilState } from 'recoil';
import { useDataMutation } from '@dhis2/app-runtime';
import { DataStoreConfigState } from '../../types/DataStoreSchema';

export function useCreateDsDir({ keySpace, setLoading, type, onError }: { type: any, keySpace: string, setLoading: (args: boolean) => void, onError: (args: any) => void }) {
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)


    const [mutate, { error }] = useDataMutation({
        resource: `${keySpace}`,
        data: () => {},
        type: type,
        params: {
            importStrategy: 'CREATE_AND_UPDATE'
        }
    },
        {
            onError(error) {
                setLoading(false)
                onError(error)
            },
            onComplete: async () => {
                setDataStoreConfigState({} as any)
                setLoading(false)
            }
        }
    )



    return { createDir: mutate, error }
}