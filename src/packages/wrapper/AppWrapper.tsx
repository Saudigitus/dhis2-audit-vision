import React, { useEffect } from "react"
import { AppWrapperProps } from "./types"
import useAppConfig from "./hooks/useAppConfig"
import { CircularLoader } from "@dhis2/ui"
import { DataStoreConfigState } from "./types/DataStoreSchema"
import { useRecoilValue } from "recoil"
import RulesWrapper from "./rulesWrapper/rulesWrapper"
import { useInitializer } from "../../hooks/initializer/useInitializer"

const AppWrapper = (props: AppWrapperProps) => {
    const { loading, error } = useAppConfig()
    const { children, errorComponent, loadingComponent } = props
    const dataStoreData = useRecoilValue(DataStoreConfigState)
    const { initialize, loading: initializerLoading } = useInitializer()

    useEffect(() => {
        initialize()
    }, [])

    if (error) {
        return (
            <React.Fragment>
                {
                    errorComponent ??
                    <div className='flex items-center justify-center'>
                        An error occurred while loading the app.
                    </div>
                }
            </React.Fragment>
        )
    }

    if (loading || !dataStoreData || initializerLoading) {
        return (
            <React.Fragment>
                {
                    loadingComponent ??
                    <div className='flex items-center justify-center'>
                        <CircularLoader />
                    </div>
                }
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <RulesWrapper>
                {children}
            </RulesWrapper>
        </React.Fragment>
    )
}

export { AppWrapper }