import React, { useEffect } from "react"
import { AppWrapperProps } from "./types"
import { CircularLoader } from "@dhis2/ui"
import { useInitializer } from "../../hooks/initializer/useInitializer"

const AppWrapperInitializer = (props: AppWrapperProps) => {
    const { children, loadingComponent } = props
    const { initialize, loading: initializerLoading } = useInitializer()

    useEffect(() => {
        initialize()
    }, [])

    if (initializerLoading) {
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