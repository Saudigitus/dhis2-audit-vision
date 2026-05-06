import { useEffect, useState } from "react";
import { Center, CircularLoader } from "@dhis2/ui";
import { SelectedAuditProps } from "../../pages/changeExplorer/ChangeExplorer";
import { useGetAuditDetails } from "../../hooks/audit/useGetAuditDetails";
import AuditDiffViewer from "./newDiffViewer";

interface ChangeExplorerDrawerProps {
    setSelectedChange: (change: any | null) => void;
    setParentChange: (change: any | null) => void;
    parentChange: any | null;
    selectedChange: SelectedAuditProps;
}

export default function ChangeExplorerDrawer({ setSelectedChange, selectedChange }: ChangeExplorerDrawerProps) {
    const { getAuditDetails, auditDetails, loadingDetails } = useGetAuditDetails()
    const [refetch, setRefecth] = useState(false)

    useEffect(() => {
        if (selectedChange) getAuditDetails(selectedChange.id)
    }, [selectedChange, refetch])

    const onClose = () => setSelectedChange(null)

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-50 h-[100vh]" onClick={() => onClose()} />
            <div className="fixed top-12 right-0 bottom-0 w-[60vw] bg-white shadow-2xl z-50 flex flex-col overflow-scroll">
                {
                    loadingDetails ?
                        <div className="w-[100%] h-[100%]" >
                            <Center>
                                <CircularLoader />
                            </Center>
                        </div> :
                        <AuditDiffViewer setRefecth={setRefecth} onClose={onClose} auditDetails={auditDetails} selectedChange={selectedChange} />
                }
            </div>
        </>
    )
}
