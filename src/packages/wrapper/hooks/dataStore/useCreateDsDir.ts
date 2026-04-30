import { useShowAlerts } from 'dhis2-semis-functions';
import { config } from '../../utils/constants/config/config';
import { useDataMutation } from '@dhis2/app-runtime';
import { useSetRecoilState } from 'recoil';
import { DataStoreConfigState } from '../../atoms/DataStoreSchema';
import { D2I18n } from 'dhis2-semis-types';

export function useCreateDsDir({ keySpace, setLoading, type, i18n }: { type: any, keySpace: string, setLoading: (args: boolean) => void, i18n: D2I18n }) {
    const { hide, show } = useShowAlerts()
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)


    const [mutate, { error }] = useDataMutation({
        resource: `${keySpace}`,
        data: () => config(i18n),
        type: type,
        params: {
            importStrategy: 'CREATE_AND_UPDATE'
        }
    },
        {
            onError(error) {
                setLoading(false)
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete: async () => {
                setDataStoreConfigState(config(i18n) as any)
                setLoading(false)
            }
        }
    )



    return { createDir: mutate, error }
}