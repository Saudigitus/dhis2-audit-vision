import { useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { useSetRecoilState } from 'recoil'
import { UserAuthoritiesSchema } from '../../schema/userAuthoritiesSchema'
import { UserSchema } from '../../schema/userSchema'

const query = {
    me: {
        resource: 'me',
        params: { 
            fields: ['id', 'displayName', 'username', 'authorities', 'userGroups[id,code,displayName]'] 
        }
    }
}

export const useGetMyAuthorities = () => {
    const { loading, error, data } = useDataQuery(query)
    const setAuthorities = useSetRecoilState(UserAuthoritiesSchema)
    const setUser = useSetRecoilState(UserSchema)

    useEffect(() => {
        if (data?.me) {
            const me = data.me as any
            setAuthorities(prev => ({
                ...prev,
                user: me.authorities || []
            }))
            setUser({
                id: me.id,
                displayName: me.displayName,
                username: me.username,
                authorities: me.authorities || [],
                userGroups: me.userGroups || []
            })
        }
    }, [data, setAuthorities, setUser])

    return { loading, error }
}
