import { DataProps } from "../../hooks/audit/useGetudit";

function rowsFormatter(data: DataProps[]) {
    if (!data) return []

    const formattedData = data?.map((item) => ({
        id: item.uid,
        action: item.auditType,
        user: item.createdBy,
        time: new Date(item.updated_at).toLocaleString(),
        type: item.auditScope,
        object: item.klass?.split(".").pop(),
    }))
    return formattedData
}

function filterValuesFormatter() {
    return {
        auditType: {
            values: ['UPDATE', 'CREATE', 'DELETE'],
            label: 'Action',
            inputType: 'select'
        },
        createdBy: {
            label: 'User',
            inputType: 'text'
        },
        // klass: {
        //     label: 'Object',
        //     inputType: 'text'
        // },
        // auditScope: {
        //     label: 'Type',
        //     inputType: 'text'
        // },
    }
}
export { rowsFormatter, filterValuesFormatter }