import { SeverityRuleType } from "../../schema/severityRulesSchema";
import { CHANGE_TYPES, ChangeType, ChartItem, UserActivity } from "../../types/dashboard/DashboardTypes";

const getRows = (response: any) => response?.listGrid?.rows || [];

const getSingleValue = (response: any) => Number(getRows(response)?.[0]?.[0] ?? 0);

const mapSeries = (rows: any[]): ChartItem[] =>
    rows.map(([name, value]) => ({
        name,
        value: Number(value),
    }));

const mapChangesByType = (rows: any[]) =>
    CHANGE_TYPES.map((type) => ({
        ...type,
        value: Number(
            rows.find(([action]) => action === type.name)?.[1] ?? 0
        ),
    }));

const mapUserActivity = (rows: any[]): UserActivity[] => {
    const users: Record<string, UserActivity> = {};

    rows.forEach(([username, action, total]) => {
        if (!users[username]) {
            users[username] = {
                CREATE: 0,
                UPDATE: 0,
                DELETE: 0,
                name: username,
            };
        }

        users[username][action as ChangeType] = Number(total);
    });

    return Object.values(users);
};

const buildParams = ({ startDate, endDate, actionType, offset, limit }: any) => {
    const params = [
        `startDate:${startDate}`,
        `endDate:${endDate}`,
    ];

    if (actionType) {
        params.push(`actionType:${actionType}`);
    }

    if (offset !== undefined) {
        params.push(`offset:${offset}`);
    }

    if (limit  !== undefined) {
        params.push(`limit:${limit}`)
    }

    return params;
};

const countRiskChanges = (severityRules: SeverityRuleType[], rows: any[]) => {
    if (!rows.length) return 0;
    
    let total = 0;

    const highRules = severityRules?.filter((item) => item?.severity === "HIGH") ?? [];
    const objectTypeMap = new Map<string, Map<string, number>>();
    rows.forEach(([name, action, changes]: any) => {
        if (!objectTypeMap.has(name.split('.').pop())) objectTypeMap.set(name.split('.').pop(), new Map());
        objectTypeMap.get(name.split('.').pop())!.set(action, Number(changes ?? 0));
    });

    for (const rule of highRules) {
        const objectType = rule.objectType?.split('.').pop();
        const action = rule.action;
        const changes = objectTypeMap.get(objectType || '')?.get(action);
        if (changes !== undefined) total += changes;
    }

    return total;
}

export { getSingleValue, mapSeries, mapChangesByType, mapUserActivity, buildParams, countRiskChanges, getRows }