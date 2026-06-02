import { Center, CircularLoader } from "@dhis2/ui"
import { useRecoilValue } from "recoil"
import React, { useEffect } from "react"
import { AppWrapperProps } from "./types"
import { DataStoreConfigState } from "./types/DataStoreSchema"
import { useInitializer } from "../../hooks/initializer/useInitializer"
import { useGetSeverityRules } from "../../hooks/severityRules/useGetSeverityRules"
import { ProgressContainer } from "../../components/progress/Progress"

const AppWrapperInitializer = (props: AppWrapperProps) => {
    const { children } = props
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const { initialize, loading: initializerLoading, progress } = useInitializer()
    const { getSeverityRules, loading: loadingRules } = useGetSeverityRules()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!Object.entries(progress).every(([key, step]) => step.status === 'SUCCESS')) {
                return
            }
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
                <ProgressContainer  progress={progress}  loading={initializerLoading || loadingRules} />
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