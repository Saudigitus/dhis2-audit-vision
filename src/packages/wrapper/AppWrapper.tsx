import React from "react"
import { AppWrapperProps } from "./types"
import { CircularLoader } from "@dhis2/ui"
import useAppConfig from "./hooks/useAppConfig"
import { AppWrapperInitializer } from "./AppWrapperInitializer"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "./types/DataStoreSchema"

const AppWrapper = (props: AppWrapperProps) => {
    const { children } = props
    const { loading, error } = useAppConfig()
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    

    if (error) {
        return (
            <React.Fragment>
                <div className='flex items-center justify-center'>
                    An error occurred while loading the app.
                </div>
            </React.Fragment>
        )
    }

    if (loading && !dataStoreDataState) {
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