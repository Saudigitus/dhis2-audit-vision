import { useDataEngine } from "@dhis2/app-runtime";
import { useState } from "react";

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

    async function rollback(postData: any) {
        setLoading(true)
        try {
            const response = await engine.mutate(POST_METADATA, {
                variables: { data: postData }
            });
            return response;
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { rollback, loading }
}

export default useRollback
