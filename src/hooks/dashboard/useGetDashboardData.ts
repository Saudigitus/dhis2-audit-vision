import { useState } from "react";
import { useRecoilValue } from "recoil"
import { useDataEngine } from "@dhis2/app-runtime";
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { format, subDays } from "date-fns";

const TOTAL_CHANGES_QUERY = ({ id, startDate, endDate, actionType }: { id: string, startDate: string, endDate: string, actionType?: string }) => ({
    values: {
        resource: `sqlViews/${id}/data`,
        params: {
            var: [`startDate:${startDate}`, `endDate:${endDate}`, actionType ? `actionType:${actionType || ''}` : ''],
        },
    },
});


const useGetDashboardData = () => {
    const engine = useDataEngine()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const dataStoreConfig = useRecoilValue(DataStoreConfigState)
    const { reports } = dataStoreConfig

    const today = format(new Date(), 'yyyy-MM-dd')
    const yesterday = format(subDays(new Date(today), 1), 'yyyy-MM-dd')

    const getDashboardData = async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
        setLoading(true)
        const todayChanges: any = await engine.query(TOTAL_CHANGES_QUERY({ id: reports?.changesByPeriod, startDate: today, endDate: yesterday }), {})

        const totalChanges: any = await engine.query(TOTAL_CHANGES_QUERY({ id: reports?.changesByPeriod, startDate, endDate }), {})

        const changesByType = await engine.query(TOTAL_CHANGES_QUERY({ id: reports?.changesByType, startDate, endDate }), {})

        const updatesByPeriod = await engine.query(TOTAL_CHANGES_QUERY({ id: reports?.updatesByPeriod, startDate, endDate }), {})

        const changesOverTime = await engine.query(TOTAL_CHANGES_QUERY({ id: reports?.changesOverTime, startDate, endDate, actionType: 'all' }), {})

        const mostActiveUsers = await engine.query(TOTAL_CHANGES_QUERY({ id: reports?.mostActiveUsers, startDate, endDate }), {})

        setData({
            todayChanges: todayChanges?.results?.listGrid?.rows?.[0][0],
            changesByType,
            totalChanges: totalChanges?.results?.listGrid?.rows?.[0][0],
            updatesByPeriod,
            changesOverTime,
            mostActiveUsers,
        })

        setLoading(false)

        return {
            data: {
                todayChanges: todayChanges?.results?.listGrid?.rows?.[0][0],
                changesByType,
                totalChanges: totalChanges?.results?.listGrid?.rows?.[0][0],
                updatesByPeriod,
                changesOverTime,
                mostActiveUsers,
            }
        }

    }

    return { getDashboardData, loading, data }
}

export { useGetDashboardData }