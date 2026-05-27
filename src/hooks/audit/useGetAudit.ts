import axios from "axios"
import { useState } from "react"
import { useParams } from "../common/useQueryParams"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { useRecoilValue } from "recoil"
import { useDataEngine } from "@dhis2/app-runtime"
import { getMappingKey, RESOURCE_MAPPING } from "../../constants/common/dhis2Resources"

export interface DataProps {
    uid: number
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
}

interface GetAuditProps {
    audits: DataProps[] | any[]
    pager: {
        total: number
        page: number
        pageSize: number
        pageCount: number
    }
}

export const useGetAudit = () => {
    const [data, setData] = useState<GetAuditProps | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { group } = useParams()
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const engine = useDataEngine()

    const getAudit = async ({ page, pageSize, filterQuery }: { page: number, pageSize: number, filterQuery?: string }) => {
        setLoading(true)
        try {
            if (group) {
                const dsGroup = dataStoreDataState?.monitoringGroups?.find(x => x.id == group)?.items || []

                const total = dsGroup.length
                const pageCount = Math.ceil(total / pageSize)
                const startIndex = (page - 1) * pageSize
                const paginatedItems = dsGroup.slice(startIndex, startIndex + pageSize)
                const enrichedItems = await Promise.all(
                    paginatedItems.map(async (item: any) => {
                        const enrichedItem: any = { ...item }

                        try {
                            const mappingKey = getMappingKey(item.type);
                            const mapping = RESOURCE_MAPPING[mappingKey];
                            
                            const metadataQuery = mapping ? {
                                metadata: {
                                    resource: mapping.resource,
                                    id: item.id,
                                    params: {
                                        fields: mapping.fields
                                    }
                                }
                            } : null;

                            const [auditResponse, metadataResponse] = await Promise.all([
                                axios.get(`${dataStoreDataState.auditApi}/api/audits/metadata/${item.id}?type=${item.type.toUpperCase()}&page=1&pageSize=5`),
                                metadataQuery ? engine.query(metadataQuery) : Promise.resolve(null)
                            ])

                            if (metadataResponse) {
                                const res = metadataResponse as any
                                // Prefer displayName, fallback to name
                                enrichedItem.name = res?.metadata?.displayName || res?.metadata?.name || item.id
                            }

                            if (auditResponse?.data?.audits?.length > 0) {
                                enrichedItem.hasDependencies = true
                                enrichedItem.last5 = auditResponse.data.audits.map((x: any) => x.auditType)
                            }
                        } catch (error) {
                            console.error(`Failed to enrich audit item ${item.id}:`, error)
                        }

                        return enrichedItem
                    })
                )

                setData({
                    audits: enrichedItems,
                    pager: { page, pageCount, pageSize, total }
                })
            } else {
                const response = await axios.get(`${dataStoreDataState.auditApi}/api/audits?page=${page}&pageSize=${pageSize}${filterQuery ? `&${filterQuery}` : ''}`)

                setData(response?.data)
                return response
            }
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getAudit, data, loading }
}
