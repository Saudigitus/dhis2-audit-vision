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
        if (!dataStoreDataState) return

        const hasAuditApi = !!dataStoreDataState?.auditApi;
        const progressEntries = Object.values(progress);
        const isFullyInitialized = progressEntries.length > 0 && progressEntries.every((step) => step.status === 'SUCCESS');
        const isInProgress = progressEntries.some((step) => step.status === 'PENDING');

        if (isFullyInitialized || isInProgress) {
            return
        }

        if (!hasAuditApi) {
            window.location.hash = "#/settings"
        } else {
            initialize()
            getSeverityRules()
        }

    }, [dataStoreDataState])

    if (initializerLoading || loadingRules) {
        return (
            <React.Fragment>
                <ProgressContainer progress={progress} loading={initializerLoading || loadingRules} />
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