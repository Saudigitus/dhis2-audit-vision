import { useGlobalError } from '../error/useGlobalError';
import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import { useSetRecoilState } from 'recoil'
import { ErrorsSchema } from '../../schema/errorsSchema'

interface Route {
  id: string
  name: string
  code: string
  disabled: boolean
  url: string
  auth: {
    type: string
    headers?: Record<string, string>
  }
  publicAccess: string
  userGroupAccesses: { id: string; access: string }[]
}

const CREATE_OR_UPDATE_ROUTES_MUTATION = {
  type: 'create',
  resource: 'metadata',
  params: {
    importStrategy: 'CREATE_AND_UPDATE',
  },
  data: ({ routes }: { routes: Route[] }) => ({
    routes,
  }),
}

export const useInitializeRoutes = () => {
  const { showError } = useGlobalError();
  const engine = useDataEngine()
  const [loading, setLoading] = useState(false)
  const setErrors = useSetRecoilState(ErrorsSchema)

  const buildRoutes = (baseUrl: string, token: string, adminGroupUid: string, viewerGroupUid: string): Route[] => {
    const auth = token ? {
      type: 'api-headers',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } : {
      type: 'none',
    }

    return [
      {
        id: 'A3htsq6bF6G',
        name: 'Audit Metadata',
        code: 'audit-metadata',
        disabled: false,
        url: `${baseUrl}/api/audits/metadata`,
        auth,
        publicAccess: '--------',
        userGroupAccesses: [
          { id: adminGroupUid, access: 'rwrw----' },
          { id: viewerGroupUid, access: 'r-------' }
        ],
      },
      {
        id: 'HeJMXGf1K9J',
        name: 'Audits',
        code: 'audits',
        disabled: false,
        url: `${baseUrl}/api/audits`,
        auth,
        publicAccess: '--------',
        userGroupAccesses: [
          { id: adminGroupUid, access: 'rwrw----' },
          { id: viewerGroupUid, access: 'r-------' }
        ],
      },
      {
        id: 'rWbZpQenrTD',
        name: 'Audit Objects',
        code: 'audit-objects',
        disabled: false,
        url: `${baseUrl}/api/auditObjects`,
        auth,
        publicAccess: '--------',
        userGroupAccesses: [
          { id: adminGroupUid, access: 'rwrw----' },
          { id: viewerGroupUid, access: 'r-------' }
        ],
      },
      {
        id: 'd0sbsyw0xS8',
        name: 'Create Notification',
        code: 'create-notification',
        disabled: false,
        url: `${baseUrl}/api/notifications/create`,
        auth,
        publicAccess: '--------',
        userGroupAccesses: [
          { id: adminGroupUid, access: 'rwrw----' },
          { id: viewerGroupUid, access: 'r-------' }
        ],
      },
      {
        id: 'aayonvVCCBZ',
        name: 'Delete Notification',
        code: 'delete-notification',
        disabled: false,
        url: `${baseUrl}/api/notifications`,
        auth,
        publicAccess: '--------',
        userGroupAccesses: [
          { id: adminGroupUid, access: 'rwrw----' },
          { id: viewerGroupUid, access: 'r-------' }
        ],
      },
      {
        id: 'DTD2iDhH3mk',
        name: 'Notifications',
        code: 'notifications',
        disabled: false,
        url: `${baseUrl}/api/notifications`,
        auth,
        publicAccess: '--------',
        userGroupAccesses: [
          { id: adminGroupUid, access: 'rwrw----' },
          { id: viewerGroupUid, access: 'r-------' }
        ],
      },
    ]
  }

  const initializeRoutes = async (baseUrl: string, token: string, adminGroupUid: string, viewerGroupUid: string) => {
    if (!baseUrl) {
      console.log('Audit API URL not configured, skipping route initialization')
      return
    }

    setLoading(true)
    const routes = buildRoutes(baseUrl, token, adminGroupUid, viewerGroupUid)

    try {
      await engine.mutate(CREATE_OR_UPDATE_ROUTES_MUTATION as any, {
        variables: { routes },
      })
      console.log(`Routes created/updated successfully:`, routes.map(r => r.name))
    } catch (error: any) {
      showError(error);
      console.error('Error creating routes:', error)
      setErrors((prev: any) => ({
        ...prev,
        routes: [
          ...(prev?.routes || []),
          {
            error: 'Error creating routes: ' + (error?.details?.response?.typeReports?.[0]?.objectReports?.[0]?.errorReports?.[0]?.message || ''),
            object: routes,
          },
        ],
      }))
    } finally {
      setLoading(false)
    }
  }

  return {
    initializeRoutes,
    loading,
  }
}
