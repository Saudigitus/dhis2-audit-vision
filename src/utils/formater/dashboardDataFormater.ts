const getSingleValue = (res: any) =>
    Number(res?.results?.listGrid?.rows?.[0]?.[0] ?? 0);
            
const mapRowsToSeries = (rows: any[] = []) =>
    rows.map((r) => ({
        name: r?.[0],
        value: Number(r?.[1] ?? 0),
    }));

const mapUserActions = (rows: any[] = []) => {
    const result: Record<string, any> = {};

    rows.forEach(([username, action, total]) => {
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

const mapChangesByType = (rows: any[] = []) =>
    changesByTypeHelper.map((item) => ({
        ...item,
        value: Number(rows.find((r) => r?.includes(item.name))?.[1] ?? 0),
    }));

const buildParams = ({ startDate, endDate, actionType, offset }: any) => {
    const params = [
        `startDate:${startDate}`,
        `endDate:${endDate}`,
    ];

    if (actionType) params.push(`actionType:${actionType}`);
    if (offset !== undefined) params.push(`offset:${offset}`);

    return params;
};

export { getSingleValue, mapRowsToSeries, mapChangesByType, mapUserActions, buildParams }