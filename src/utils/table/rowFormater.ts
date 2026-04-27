import { DataProps } from "../../hooks/audit/useGetudit";

function rowsFormater(data: DataProps[]) {
    const formattedData = data.map((item) => ({
        id: item.uid,
        action: item.auditType,
        user: item.createdBy,
        time: new Date(item.updated_at).toLocaleString(),
        object: item.auditScope,
        type: item.klass.split(".").pop(),
    }))
    return formattedData
}
export { rowsFormater }