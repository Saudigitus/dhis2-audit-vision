 import axios from "axios"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema"
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

export const useGetchildAudit = () => {
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)
    const engine = useDataEngine()

    const getAudit = async ({ page, pageSize, id, type }: { page: number, pageSize: number, id: string, type: string }) => {
        try {
            const response = await axios.get(`${dataStoreDataState.auditApi}/api/audits/metadata/${id}?page=${page}&pageSize=${pageSize}&type=${type.toUpperCase()}`)
            const auditItems = response?.data?.audits || []

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
                                // Item might have been deleted or not found
                                enrichedItem.displayName = item.uid
                            }
                        }
                    }
                    return enrichedItem
                })
            )

            return {
                ...response,
                data: {
                    ...response.data,
                    audits: enrichedAudits
                }
            }
        } catch (error) {
            throw error
        }
    }

    return { getAudit }
}