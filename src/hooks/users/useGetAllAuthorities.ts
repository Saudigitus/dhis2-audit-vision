import { useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { useSetRecoilState } from 'recoil'
import { UserAuthoritiesSchema } from '../../schema/userAuthoritiesSchema'

const query = {
    allAuthorities: { resource: 'authorities' }
}

export const useGetAllAuthorities = () => {
    const { loading, error, data } = useDataQuery(query)
    const setAuthorities = useSetRecoilState(UserAuthoritiesSchema)

    useEffect(() => {
        if (data?.allAuthorities) {
            const systemAuth = (data.allAuthorities as any).systemAuthorities || []
            const authorityIds = systemAuth.map((auth: any) => auth.id)
            setAuthorities(prev => ({
                ...prev,
                all: authorityIds
            }))
        }
    }, [data, setAuthorities])

    return { loading, error }
}
