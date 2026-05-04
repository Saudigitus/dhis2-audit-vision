
import { useGetSeverityRules } from "../../../hooks/severityRules/useGetSeverityRules"
import React, { useEffect } from "react"
import { AppWrapperProps } from "../types"
import { CircularLoader } from "@dhis2/ui"

export default function RulesWrapper(props: AppWrapperProps) {
    const { getSeverityRules, loading: loadingRules } = useGetSeverityRules()

    useEffect(() => {
        getSeverityRules()
    }, [])

    if (loadingRules) {
        return (
            <>
                {
                    loadingRules ? null :
                        <div className='flex items-center justify-center' >
                            <CircularLoader />
                        </div>
                }
            </>
        )
    }
    return (
        <React.Fragment>
            {props?.children}
        </React.Fragment >
    )

}