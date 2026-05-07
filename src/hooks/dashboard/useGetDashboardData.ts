import { useState } from "react";
import { useRecoilValue } from "recoil";
import { format, addDays } from "date-fns";
import { useDataEngine } from "@dhis2/app-runtime";
import { SeverityRulesSchema } from "../../schema/severityRulesSchema";
import { CHANGE_TYPES, DashboardData } from "../../types/dashboard/DashboardTypes";
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema";
import {
    buildParams, countRiskChanges, getRows,
    getSingleValue, mapChangesByType, mapSeries, mapUserActivity
} from "../../utils/formater/dashboardDataFormater";


const sqlView = (id: string, vars?: Record<string, any>) => ({
    resource: `sqlViews/${id}/data`,
    params: {
        paging: false,
        var: buildParams(vars || {}),
    },
});

const useGetDashboardData = () => {
    const engine = useDataEngine();
    const [loading, setLoading] = useState(false);
    const { reports } = useRecoilValue(DataStoreConfigState);
    const severityrules = useRecoilValue(SeverityRulesSchema);
    const [data, setData] = useState<DashboardData>({
        riskChanges: 0,
        totalChanges: 0,
        totalUpdates: 0,
        todayChanges: 0,
        changesOverTime: [],
        mostActiveUsers: [],
        changesByType: CHANGE_TYPES.map((type) => ({
            ...type,
            value: 0,
        })),
    });

    const getDashboardData = async ({ startDate, endDate,
    }: { startDate: string; endDate: string; }) => {
        if (!startDate || !endDate) return;

        setLoading(true);

        try {
            const today = format(new Date(), "yyyy-MM-dd");
            const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

            const result: any = await engine.query({
                totalChanges: sqlView(reports?.changesByPeriod, { startDate, endDate, actionType: "ALL", }),
                totalUpdates: sqlView(reports?.changesByPeriod, { startDate, endDate, actionType: "UPDATE", }),
                todayChanges: sqlView(reports?.changesByPeriod, { startDate: today, endDate: tomorrow, actionType: "ALL", }),
                changesByType: sqlView(reports?.changesByType, { startDate, endDate, }),
                changesOverTime: sqlView(reports?.changesOverTime, { startDate, endDate, }),
                mostActiveUsers: sqlView(reports?.mostActiveUsers, { startDate, endDate, limit: 10, offset: 0, }),
                riskChanges: sqlView(reports?.riskChanges, { startDate, endDate }),
            });

            setData({
                totalChanges: getSingleValue(result.totalChanges),
                totalUpdates: getSingleValue(result.totalUpdates),
                todayChanges: getSingleValue(result.todayChanges),
                changesOverTime: mapSeries(getRows(result.changesOverTime)),
                changesByType: mapChangesByType(getRows(result.changesByType)),
                mostActiveUsers: mapUserActivity(getRows(result.mostActiveUsers)),
                riskChanges: countRiskChanges(severityrules?.notifications || [], getRows(result.riskChanges)),
            });
        } catch (error) {
            console.error("Audit dashboard error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, getDashboardData };
};

export { useGetDashboardData };