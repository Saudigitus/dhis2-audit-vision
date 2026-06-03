import { useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { useSetRecoilState } from 'recoil'
import { UserAuthoritiesSchema } from '../../schema/userAuthoritiesSchema'

const query = {
    me: {
        resource: 'me',
        params: { fields: ['authorities'] }
    }
}

export const useGetMyAuthorities = () => {
    const { loading, error, data } = useDataQuery(query)
    const setAuthorities = useSetRecoilState(UserAuthoritiesSchema)

    useEffect(() => {
        if (data?.me) {
            setAuthorities(prev => ({
                ...prev,
                user: (data.me as any).authorities || []
            }))
        }
    }, [data, setAuthorities])

    return { loading, error }
}
