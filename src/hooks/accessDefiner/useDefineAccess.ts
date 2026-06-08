import { useDataEngine } from "@dhis2/app-runtime"

const CREATE_OR_UPDATE_SQL_VIEW_ACCESS_MUTATION = {
    type: 'create',
    resource: 'sharing',
    data: ({ data }: any) => data,
    params: ({ params }: any) => params,
}

export default function AccessDefiner() {
    const engine = useDataEngine()

    const useDefineAccess = async (id: string, admin: string, viewer: string) => {
        try {
            const params = {
                type: 'sqlView',
                id,
                importStrategy: 'CREATE_AND_UPDATE',
            }
            const data = {
                "meta": {
                    "allowPublicAccess": true,
                    "allowExternalAccess": true
                },
                "object": {
                    "id": id,
                    "publicAccess": "r-r-----",
                    "userGroupAccesses": [
                        {
                            "id": admin,
                            "access": "rwrw----"
                        },
                        {
                            "id": viewer,
                            "access": "r-r-----"
                        }
                    ],
                    "externalAccess": false
                }
            }
            
            const response = await engine.mutate(CREATE_OR_UPDATE_SQL_VIEW_ACCESS_MUTATION, { variables: { params, data } }) as any
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return { useDefineAccess }
}