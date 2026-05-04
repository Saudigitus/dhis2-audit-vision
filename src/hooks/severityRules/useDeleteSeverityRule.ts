import axios from "axios"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import useShowAlerts from "../../packages/wrapper/hooks/alert/useShowAlert"

export const useDeleteSeverityRule = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const { hide, show } = useShowAlerts()

    const deleteSeverityRule = async (id: string) => {
        setLoading(true)
        try {
            await axios.delete(`${dataStoreDataState.auditApi}/api/notifications/${id}`)
            show({
                message: `Rule deleted successfully`,
                type: { success: true }
            });
            setTimeout(hide, 5000);
        } catch (error) {
            show({
                message: `Rule deletion failed`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        } finally {
            setLoading(false)
        }
    }

    return { deleteSeverityRule, loading }
}
