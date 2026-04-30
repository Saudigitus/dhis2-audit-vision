import React from "react"
import { AppWrapperProps } from "./types"
import useAppConfig from "./hooks/useAppConfig"
import { CircularLoader } from "@dhis2/ui"

const AppWrapper = (props: AppWrapperProps) => {
    const { loading, error } = useAppConfig()
    const { children, errorComponent, loadingComponent } = props

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

    if (loading) {
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

export { AppWrapper }