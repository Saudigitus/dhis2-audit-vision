import { useState } from "react"
import useShowAlerts from "../../packages/wrapper/hooks/alert/useShowAlert"
import { useDataEngine } from "@dhis2/app-runtime"

export const useDeleteSeverityRule = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine()

    const deleteSeverityRule = async (id: string) => {
        setLoading(true)
        try {
            await engine.mutate({
                type: 'delete',
                resource: `routes/delete-notification/run`,
                id: id
            })
            show({
                message: `Rule deleted successfully`,
                type: { success: true }
            });
            setTimeout(hide, 5000);
        } catch (error: any) {
            const detail = error?.details?.response?.data?.detail?.[0]?.msg || 'Rule deletion failed';
            show({
                message: detail,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        } finally {
            setLoading(false);
        }
    }

    return { deleteSeverityRule, loading }
}
