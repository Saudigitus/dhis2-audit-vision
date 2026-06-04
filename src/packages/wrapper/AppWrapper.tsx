import React from "react"
import { AppWrapperProps } from "./types"
import { CircularLoader } from "@dhis2/ui"
import useAppConfig from "./hooks/useAppConfig"
import { AppWrapperInitializer } from "./AppWrapperInitializer"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "./types/DataStoreSchema"
import { useGetMyAuthorities } from "../../hooks/users/useGetMyAuthorities"
import { useGetAllAuthorities } from "../../hooks/users/useGetAllAuthorities"

const AppWrapper = (props: AppWrapperProps) => {
    const { children } = props
    const { loading, error } = useAppConfig()
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const { loading: myAuthLoading, error: myAuthError } = useGetMyAuthorities()
    const { loading: allAuthLoading, error: allAuthError } = useGetAllAuthorities()

    if (error || myAuthError || allAuthError) {
        return (
            <React.Fragment>
                <div className='flex items-center justify-center'>
                    An error occurred while loading the app.
                </div>
            </React.Fragment>
        )
    }

    if (loading && !dataStoreDataState && (myAuthLoading || allAuthLoading)) {
        return (
            <React.Fragment>
                <div className='flex items-center justify-center'>
                    <CircularLoader />
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <AppWrapperInitializer>
                {children}
            </AppWrapperInitializer>
        </React.Fragment>
    )
}

export { AppWrapper }