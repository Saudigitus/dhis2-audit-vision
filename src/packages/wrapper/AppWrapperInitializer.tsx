import { useRecoilValue } from "recoil"
import React, { useEffect } from "react"
import { AppWrapperProps } from "./types"
import { DataStoreConfigState } from "./types/DataStoreSchema"
import { useInitializer } from "../../hooks/initializer/useInitializer"
import { useGetSeverityRules } from "../../hooks/severityRules/useGetSeverityRules"
import { ProgressContainer } from "../../components/progress/Progress"
import { AccessDenied } from "./components/AccessDenied"
import { UserAuthoritiesSchema } from "../../schema/userAuthoritiesSchema"

const AppWrapperInitializer = (props: AppWrapperProps) => {
    const { children } = props
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const { initialize, loading: initializerLoading, progress, hasAuthority } = useInitializer()
    const { getSeverityRules, loading: loadingRules } = useGetSeverityRules()
    const authorities = useRecoilValue(UserAuthoritiesSchema)

    useEffect(() => {
        if (!dataStoreDataState || authorities?.user?.length == 0) return

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

    }, [dataStoreDataState, authorities?.user])

    if (initializerLoading || loadingRules) {
        return (
            <React.Fragment>
                <ProgressContainer progress={progress} loading={initializerLoading || loadingRules} />
            </React.Fragment>
        )
    }

    if (!hasAuthority) {
        return <AccessDenied />
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export { AppWrapperInitializer }