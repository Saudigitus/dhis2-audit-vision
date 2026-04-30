import { useDataEngine } from "@dhis2/app-runtime"

const PROGRAM_QUERY = {
    results: {
        resource: "programs",
        params: {
            fieds: "id, displayName"
        }
    }
}

const useGetPrograms = () => {
    const engine = useDataEngine()

    const getPrograms = async () => {
        return await engine.query(PROGRAM_QUERY, {
        }).then((data: any) => data?.results?.programs)
    }

    return { getPrograms }
}

export { useGetPrograms }