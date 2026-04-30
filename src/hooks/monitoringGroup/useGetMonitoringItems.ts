import { useState } from "react"
import { useGetPrograms } from "../program/useGetPrograms"
import { useGetDataSets } from "../dataSets/useGetDataSets"

const useGetMonitoringItems = () => {
    const { getDataSets } = useGetDataSets()
    const { getPrograms } = useGetPrograms()
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const getMonitoringItems = async () => {
        setLoading(true)
        const dataSets: any = await getDataSets()
        const programs: any = await getPrograms()

        console.log(dataSets, programs)

        setData([
            ...dataSets?.map((data: any) => ({ id: data?.id, name: data?.displayName, type: "dataSet" })),
            ...programs?.map((data: any) => ({ id: data?.id, name: data?.displayName, type: "program" })),
        ])
        setLoading(false)
    }

    return { getMonitoringItems, data, loading }
}

export { useGetMonitoringItems }