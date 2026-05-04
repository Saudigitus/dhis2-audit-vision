import { useSearchParams } from 'react-router-dom'

const useParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const add = (key: string, value: string) => {
        searchParams.set(key, value)
        setSearchParams(searchParams)
    }
    const remove = (key: string) => {
        searchParams.delete(key)
        setSearchParams(searchParams)
    }

    // NÃO precisa ser async
    const useQuery = () => {
        return new URLSearchParams(searchParams)
    }

    const urlParamiters = () => {
        const query = useQuery()

        return {
            globalOrganization: query.get('organization') ?? null,
            objectId: query.get('objectId') ?? null,
            organizationId: query.get('organizationId') ?? null,
            serverId: query.get('serverId') ?? null,
            projectId: query.get('projectId') ?? null,
            serviceId: query.get('serviceId') ?? null,
            mappingId: query.get('mappingId') ?? null,
            tab: query.get('tab') ?? null,
            group: query.get('group') ?? null,
            groupName: query.get('groupName') ?? null,
            startDate: query.get('startDate') as string,
            endDate: query.get('endDate') as string,
        }
    }

    return { add, remove, useQuery, ...urlParamiters() }
}
export { useParams }
