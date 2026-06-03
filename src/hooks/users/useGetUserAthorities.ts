import React, { useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { useSetRecoilState } from 'recoil'
import { UserAuthoritiesSchema } from '../../schema/userAuthoritiesSchema'

const meQuery = {
    me: { resource: 'me', params: { fields: 'authorities' } },
}

export const useGetUserAuthorities = () => {
    const { loading, error, data } = useDataQuery(meQuery)
    const setAuthorities = useSetRecoilState(UserAuthoritiesSchema)

    useEffect(() => {
        if (data?.me) {
            console.log((data.me as any).authorities)
            setAuthorities((data.me as any).authorities || [])
        }
    }, [data, setAuthorities])


    return { loading, error }
}