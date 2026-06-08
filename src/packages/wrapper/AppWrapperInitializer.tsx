import { useRecoilValue } from "recoil"
import React, { useEffect } from "react"
import { AppWrapperProps } from "./types"
import { DataStoreConfigState } from "./types/DataStoreSchema"
import { useInitializer } from "../../hooks/initializer/useInitializer"
import { useGetSeverityRules } from "../../hooks/severityRules/useGetSeverityRules"
import { ProgressContainer } from "../../components/progress/Progress"
import { AccessDenied } from "./components/AccessDenied"
import { UserAuthoritiesSchema } from "../../schema/userAuthoritiesSchema"
import { UserSchema } from "../../schema/userSchema"

const ADMIN_GROUP_CODE = 'AUDIT_VISION_ADMINS'
const VIEWER_GROUP_CODE = 'AUDIT_VISION_VIEWERS'

const AppWrapperInitializer = (props: AppWrapperProps) => {
    const { children } = props
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const { initialize, loading: initializerLoading, progress } = useInitializer()
    const { getSeverityRules, loading: loadingRules } = useGetSeverityRules()
    const authorities = useRecoilValue(UserAuthoritiesSchema)
    const user = useRecoilValue(UserSchema)

    // Check if user has access: is in either group OR has ALL authority OR has necessary individual authorities
    const hasAccess = 
        (user?.userGroups.some(group => group.code === ADMIN_GROUP_CODE) ||
        user?.userGroups.some(group => group.code === VIEWER_GROUP_CODE) ||
        authorities?.user.some(auth => auth === 'ALL') ||
        authorities?.user.some(auth => auth === 'F_SQLVIEW_PUBLIC_ADD'))

    useEffect(() => {
        if (!dataStoreDataState || authorities?.user?.length == 0 || !user) return

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

    }, [dataStoreDataState, authorities?.user, user])

    if (initializerLoading || loadingRules) {
        return (
            <React.Fragment>
                <ProgressContainer progress={progress} loading={initializerLoading || loadingRules} />
            </React.Fragment>
        )
    }

    if (!hasAccess && !initializerLoading && !loadingRules) {
        return <AccessDenied />
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export { AppWrapperInitializer }