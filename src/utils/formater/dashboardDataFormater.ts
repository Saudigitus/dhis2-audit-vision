import { SeverityRuleType } from "../../schema/severityRulesSchema";

const getSingleValue = (res: any) =>
    Number(res?.results?.listGrid?.rows?.[0]?.[0] ?? 0);

const mapRowsToSeries = (res: any) => {
    const rows = res?.results?.listGrid?.rows || [];

    return rows.map((r: any[]) => ({
        name: r?.[0],
        value: Number(r?.[1] ?? 0),
    }));
}

const mapUserActions = (res: any) => {
    const rows = res?.results?.listGrid?.rows || [];
    const result: Record<string, any> = {};

    rows.forEach(([username, action, total]: any[]) => {
        if (!result[username]) {
            result[username] = {
                name: username,
                CREATE: 0,
                UPDATE: 0,
                DELETE: 0,
            };
        }
        result[username][action] = Number(total);
    });

    return Object.values(result);
};

const changesByTypeHelper = [
    { name: "CREATE", color: "#3b82f6" },
    { name: "UPDATE", color: "#f59e0b" },
    { name: "DELETE", color: "#ef4444" },
];

const mapChangesByType = (res: any) => {
    const rows = res?.results?.listGrid?.rows || [];

    return changesByTypeHelper.map((item) => ({
        ...item,
        value: Number(rows.find((r: any) => r?.includes(item.name))?.[1] ?? 0),
    }));

}

const buildParams = ({ startDate, endDate, actionType, offset }: any) => {
    const params = [
        `startDate:${startDate}`,
        `endDate:${endDate}`,
    ];

    if (actionType) params.push(`actionType:${actionType}`);
    if (offset !== undefined) params.push(`offset:${offset}`);

    return params;
};

const countRiskChanges = ({ severityRules, res }: { severityRules: SeverityRuleType[], res: any }) => {
    let total = 0;
    const rows = res?.results?.listGrid?.rows || [];

    severityRules
        ?.filter((item) => item?.severity === "HIGH")
        ?.forEach((item) => {
            const match = rows.find(([name, action]: any[]) =>
                name === item?.objectType?.split('.').pop() &&
                action === item?.action
            );
            
            if (match) {
                total += Number(match[2] ?? 0);
            }
        });

    return total;
}


export { getSingleValue, mapRowsToSeries, mapChangesByType, mapUserActions, buildParams, countRiskChanges }
