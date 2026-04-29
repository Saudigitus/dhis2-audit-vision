import { ReactElement } from "react";

interface AppWrapperProps {
    children: ReactElement
    errorComponent?: ReactElement
    loadingComponent?: ReactElement
}

export type { AppWrapperProps }