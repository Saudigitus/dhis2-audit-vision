import { metadataTypes } from "../../constants/common/dhis2Objects";
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

function severityFilters() {
    return {
        severity: {
            values: ['HIGH', 'MEDIUM', 'LOW'],
            label: 'Severity',
            inputType: 'select'
        },
        auditType: {
            values: ['UPDATE', 'CREATE', 'DELETE'],
            label: 'Action',
            inputType: 'select'
        },
        objectType: {
            values: metadataTypes,
            label: 'Object Type',
            inputType: 'select'
        },
    }
}

function severityRulesFormater(data: any[]) {
    const copydata = [...data]
    if (!copydata) return []

    const formattedData = copydata?.map((item) => {
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
function filterNotifications(notifications: any[], filterQuery: string | null) {
    if (!filterQuery) return notifications;

    const params = new URLSearchParams(filterQuery);
    
    // Map filter keys to actual object properties if they differ
    const keyMap: Record<string, string> = {
        auditType: 'action',
        // Add more mappings here as filters increase
    };

    return notifications.filter((item: any) => {
        // Use 'every' for better performance and readability: all active filters must match
        return Array.from(params.entries()).every(([key, value]) => {
            if (!value) return true; // Skip empty filters

            const targetKey = keyMap[key] || key;
            const itemValue = item[targetKey];

            // If the property doesn't exist on the item, we skip this filter match
            // Alternatively, return false if you want strict filtering for non-existent properties
            if (itemValue === undefined) return true;

            return String(itemValue).toLowerCase() === String(value).toLowerCase();
        });
    });
}

export { rowsFormatter, filterValuesFormatter, severityRulesFormater, severityFilters, filterNotifications }