import { useEffect } from "react";
import { CircularLoader } from "@dhis2/ui";
import { SelectedAuditProps } from "../../pages/changeExplorer/ChangeExplorer";
import { useGetuditDetails } from "../../hooks/audit/useGetAuditDetails";
import AuditDiffViewer from "./newDiffViewer";

interface ChangeExplorerDrawerProps {
    setSelectedChange: (change: any | null) => void;
    setParentChange: (change: any | null) => void;
    parentChange: any | null;
    selectedChange: SelectedAuditProps;
}

export default function ChangeExplorerDrawer({ setSelectedChange, selectedChange }: ChangeExplorerDrawerProps) {
    const { getAuditDetails, auditDetails, loadingDetails } = useGetuditDetails()

    useEffect(() => {
        if (selectedChange) {
            getAuditDetails(selectedChange.id)
        }
    }, [selectedChange])

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-50 h-screen" onClick={() => setSelectedChange(null)} />
            <div className="fixed top-12 right-0 bottom-0 w-[70vw] bg-white shadow-2xl z-50 flex flex-col overflow-scroll">
                {
                    loadingDetails ?
                        <div className='flex items-center justify-center h-full'>
                            <CircularLoader />
                        </div>
                        :
                        <AuditDiffViewer selectedChange={selectedChange} onClose={()=> setSelectedChange(null)} after={auditDetails?.[0]?.objectData ?? []} before={auditDetails?.[1]?.objectData ?? []} />
                }
            </div>
        </>
    )
}