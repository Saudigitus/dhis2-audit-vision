import { useDataEngine } from "@dhis2/app-runtime"

const PROGRAM_QUERY = {
    results: {
        resource: "dataSets",
        params: {
            fieds: "id, displayName"
        }
    }
}

const useGetDataSets = () => {
    const engine = useDataEngine()

    const getDataSets = async () => {
        return await engine.query(PROGRAM_QUERY, {
        }).then((data: any) => data?.results?.dataSets)
    }

    return { getDataSets }
}

export { useGetDataSets }