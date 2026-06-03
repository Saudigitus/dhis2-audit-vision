import { useGlobalError } from '../error/useGlobalError';
import { useState } from "react"
import { useParams } from "../common/useQueryParams"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
import { useRecoilValue } from "recoil"
import { useDataEngine } from "@dhis2/app-runtime"
import { getMappingKey, RESOURCE_MAPPING } from "../../constants/common/dhis2Resources"

export interface DataProps {
    uid: number | string
    auditType: string
    createdBy: string
    updated_at: string
    auditScope: string
    klass: string
    displayName?: string
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
    const { showError } = useGlobalError();
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

                            const auditQuery = {
                                audit: {
                                    resource: `routes/audit-metadata/run/${item.id}`,
                                    params: {
                                        type: item.type.toUpperCase(),
                                        page: 1,
                                        pageSize: 5
                                    }
                                }
                            };

                            const [auditResponse, metadataResponse] = await Promise.all([
                                engine.query(auditQuery),
                                metadataQuery ? engine.query(metadataQuery) : Promise.resolve(null)
                            ])

                            if (metadataResponse) {
                                const res = metadataResponse as any
                                // Prefer displayName, fallback to name
                                enrichedItem.name = res?.metadata?.displayName || res?.metadata?.name || item.id
                            }

                            const auditData = auditResponse as any
                            if (auditData?.audit?.audits?.length > 0) {
                                enrichedItem.hasDependencies = true
                                enrichedItem.last5 = auditData.audit.audits.map((x: any) => x.auditType)
                            }
                        } catch (error) {
                            // showError(error);
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
                // Parse filterQuery into params object
                const params: any = { page, pageSize };
                if (filterQuery) {
                    filterQuery.split('&').forEach(pair => {
                        const [key, value] = pair.split('=');
                        params[key] = value;
                    });
                }

                const query = {
                    audits: {
                        resource: 'routes/audits/run',
                        params
                    }
                };

                const response = await engine.query(query);
                const auditData = response as any;
                const auditItems = auditData?.audits?.audits || [];

                const enrichedAudits = await Promise.all(
                    auditItems.map(async (item: any) => {
                        const enrichedItem = { ...item }
                        // Extract type from klass (e.g. org.hisp.dhis.program.Program -> Program)
                        const klassParts = item.klass?.split('.') || []
                        const rawType = klassParts[klassParts.length - 1]

                        if (rawType && item.uid) {
                            const mappingKey = getMappingKey(rawType)
                            const mapping = RESOURCE_MAPPING[mappingKey]

                            if (mapping) {
                                try {
                                    const metadataResponse = await engine.query({
                                        metadata: {
                                            resource: mapping.resource,
                                            id: item.uid,
                                            params: { fields: mapping.fields }
                                        }
                                    }) as any
                                    enrichedItem.displayName = metadataResponse?.metadata?.displayName || metadataResponse?.metadata?.name || item.uid
                                } catch (error) {
                                    // showError(error);
                                    // Item might have been deleted or not found
                                    enrichedItem.displayName = item.uid
                                }
                            }
                        }
                        return enrichedItem
                    })
                )

                setData({
                    ...auditData?.audits,
                    audits: enrichedAudits
                })
                return { data: auditData?.audits }
            }
        } catch (error) {
            showError(error);
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { getAudit, data, loading }
}
