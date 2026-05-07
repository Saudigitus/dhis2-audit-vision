type ChangeType = "CREATE" | "UPDATE" | "DELETE";

type ChartItem = {
    name: string;
    value: number;
};

type UserActivity = {
    name: string;
    CREATE: number;
    UPDATE: number;
    DELETE: number;
};

type DashboardData = {
    riskChanges: number;
    totalChanges: number;
    totalUpdates: number;
    todayChanges: number;
    changesByType: {
        name: ChangeType;
        color: string;
        value: number;
    }[];
    changesOverTime: ChartItem[];
    mostActiveUsers: UserActivity[];
};

const CHANGE_TYPES = [
    { name: "CREATE" as const, color: "#3b82f6" },
    { name: "UPDATE" as const, color: "#f59e0b" },
    { name: "DELETE" as const, color: "#ef4444" },
];

export { CHANGE_TYPES };
export type { DashboardData, ChangeType, ChartItem, UserActivity };