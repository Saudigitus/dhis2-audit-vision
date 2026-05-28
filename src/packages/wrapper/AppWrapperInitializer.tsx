import { useRecoilValue } from "recoil"
import React, { useEffect } from "react"
import { AppWrapperProps } from "./types"
import { CircularLoader } from "@dhis2/ui"
import { DataStoreConfigState } from "./types/DataStoreSchema"
import { useInitializer } from "../../hooks/initializer/useInitializer"
import { useGetSeverityRules } from "../../hooks/severityRules/useGetSeverityRules"

const AppWrapperInitializer = (props: AppWrapperProps) => {
    const { children, loadingComponent } = props
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const { initialize, loading: initializerLoading } = useInitializer()
    const { getSeverityRules, loading: loadingRules } = useGetSeverityRules()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!dataStoreDataState?.auditApi && !initializerLoading && !loadingRules) {
                window.location.hash = "#/settings"
            } else {
                initialize()
                getSeverityRules()
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [dataStoreDataState])

    if (initializerLoading || loadingRules) {
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
            {children}
        </React.Fragment>
    )
}

export { AppWrapperInitializer }