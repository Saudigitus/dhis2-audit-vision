import { useDataEngine } from "@dhis2/app-runtime";

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

    async function rollback(postData: any) {
        try {
            const response = await engine.mutate(POST_METADATA, {
                variables: { data: postData }
            });
            return response;
        } catch (error) {
            throw error
        }
    }

    return { rollback }
}

export default useRollback
