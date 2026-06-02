import { useGlobalError } from '../../../../hooks/error/useGlobalError';
import { useDataEngine } from "@dhis2/app-runtime"

export default function useGetDataStoreConfig({ setLoading }: { setLoading: (args: boolean) => void }) {
    const { showError } = useGlobalError();
    const engine = useDataEngine()

    const getDataStore = async (key: string) => {
        try {
            const response = await engine.query(
                {
                    dataStoreConfig: {
                        resource: key
                    }
                })
            return response;
        } catch (error: any) {
      showError(error);
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return { getDataStore }
}