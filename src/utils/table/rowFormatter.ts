import { DataProps } from "../../hooks/audit/useGetudit";

function rowsFormatter(data: DataProps[]) {
    const formattedData = data.map((item) => ({
        id: item.uid,
        action: item.auditType,
        user: item.createdBy,
        time: new Date(item.updated_at).toLocaleString(),
        type: item.auditScope,
        object: item.klass.split(".").pop(),
    }))
    return formattedData
}
export { rowsFormatter }