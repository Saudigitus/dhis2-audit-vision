import React, { useEffect, useRef } from "react"
import { Center, CircularLoader } from "@dhis2/ui"

type StepStatus = "PENDING" | "SUCCESS" | "ERROR"

type ProgressStep = {
    action: string
    status: StepStatus
    details?: string
}

type PropsContainer = {
    progress: Record<string, ProgressStep>
    onClose?: () => void
    loading?: boolean
}

const statusConfig: Record<
    StepStatus,
    {
        label: string
        icon: React.ReactNode
        className: string
    }
> = {
    PENDING: {
        label: "Pending",
        icon: (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
        ),
        className: "text-blue-600",
    },
    SUCCESS: {
        label: "Success",
        icon: <span className="text-green-600">✔</span>,
        className: "text-green-600",
    },
    ERROR: {
        label: "Error",
        icon: <span className="text-red-600">✖</span>,
        className: "text-red-600",
    },
}

const ProgressItem = ({ step }: { step: ProgressStep }) => {
    const config = statusConfig[step.status]

    return (
        <div className="flex items-start justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                    {step.action}
                </span>

                {step.details && (
                    <span className="mt-1 text-xs text-red-500">
                        {step.details}
                    </span>
                )}
            </div>

            <div className={`flex items-center gap-2 text-sm font-medium ${config.className}`}>
                {config.icon}
                <span>{config.label}</span>
            </div>
        </div>
    )
}

export const ProgressContainer = ({ progress, onClose, loading }: PropsContainer) => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const steps = Object.entries(progress)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            })
        }
    }, [progress])

    console.log(progress)

    if (loading && !Object.keys(progress).length) {
        return (
            <React.Fragment>
                <Center className='flex items-center justify-center'>
                    <CircularLoader />
                </Center>
            </React.Fragment>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-xl h-[500px] rounded-2xl bg-gray-50 shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-start justify-between py-3 px-6 border-b border-gray-200 bg-gray-50">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Processing
                        </h2>
                        <p className="text-sm text-gray-500">
                            Please wait while we complete the steps
                        </p>
                    </div>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-200"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-3"
                >
                    {steps.map(([key, step]) => (
                        <ProgressItem key={key} step={step} />
                    ))}
                    <div className="h-2" />
                </div>
            </div>
        </div>
    )
}