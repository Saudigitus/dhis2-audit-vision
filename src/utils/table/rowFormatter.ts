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
    }
}

function severityRulesFormater(data: any[]) {
    if (!data) return []

    const formattedData = data?.map((item) => {
        const template = item?.messageTemplate?.replace(/\\n/g, '\n') || '';
       
        return {
            ...item,
            numberOfEmails: item?.recipients?.to?.length,
            objectType: item?.objectType?.replace(/([A-Z])/g, ' $1').trim(),
            messageTemplate: template.length > 100 ? template.substring(0, 100) + '...' : template,
        }
    })
    return formattedData
}
export { rowsFormatter, filterValuesFormatter, severityRulesFormater }