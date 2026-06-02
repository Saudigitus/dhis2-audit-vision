import { useDataEngine } from "@dhis2/app-runtime";
import { useState } from "react";
import useShowAlerts from "../../packages/wrapper/hooks/alert/useShowAlert";

const POST_METADATA: any = {
    resource: 'metadata',
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        async: false,
        atomicMode: "OBJECT",
        reportMode: "FULL",
        importStrategy: 'CREATE_AND_UPDATE'
    }
}

const useRollback = (): any => {
    const engine = useDataEngine();
    const [loading, setLoading] = useState(false)
    const { hide, show } = useShowAlerts()

    async function rollback(postData: any) {
        setLoading(true)
        try {
            const response = await engine.mutate(POST_METADATA, {
                variables: { data: postData }
            });

            if (response?.response?.stats?.ignored > 0) {
                show({
                    message: `Unknown error while rolling back: ${response?.response?.typeReports?.[0]?.objectReports?.[0]?.errorReports?.[0]?.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }

            return response;
        } catch (error: any) {
            show({
                message: `Unknown error while rolling back: ${error?.details?.response?.typeReports?.[0]?.objectReports?.[0]?.errorReports?.[0]?.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        } finally {
            setLoading(false)
        }
    }

    return { rollback, loading }
}

export default useRollback
