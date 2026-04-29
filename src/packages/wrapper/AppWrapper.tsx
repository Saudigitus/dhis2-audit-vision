import React from "react"
import { AppWrapperProps } from "./types"
import useAppConfig from "./hooks/useAppConfig"

const AppWrapper = (props: AppWrapperProps) => {
    const { loading, error } = useAppConfig()
    const { children, errorComponent, loadingComponent } = props

    if (error) {
        return (
            <React.Fragment>
                {
                    errorComponent ??
                    <>Error</>
                }
            </React.Fragment>
        )
    }

    if (loading) {
        return (
            <React.Fragment>
                {
                    loadingComponent ??
                    <>Loading</>
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