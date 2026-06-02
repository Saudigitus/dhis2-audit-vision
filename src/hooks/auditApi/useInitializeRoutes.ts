import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import { useSetRecoilState } from 'recoil'
import { ErrorsSchema } from '../../schema/errorsSchema'

interface Route {
  name: string
  code: string
  disabled: boolean
  url: string
  auth: {
    type: string
    headers?: Record<string, string>
  }
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
  const engine = useDataEngine()
  const [loading, setLoading] = useState(false)
  const setErrors = useSetRecoilState(ErrorsSchema)

  const buildRoutes = (baseUrl: string, token: string): Route[] => {
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
        name: 'Audit Metadata',
        code: 'audit-metadata',
        disabled: false,
        url: `${baseUrl}/api/audits/metadata`,
        auth,
      },
      {
        name: 'Audits',
        code: 'audits',
        disabled: false,
        url: `${baseUrl}/api/audits`,
        auth,
      },
      {
        name: 'Audit Objects',
        code: 'audit-objects',
        disabled: false,
        url: `${baseUrl}/api/auditObjects`,
        auth,
      },
      {
        name: 'Create Notification',
        code: 'create-notification',
        disabled: false,
        url: `${baseUrl}/api/notifications/create`,
        auth,
      },
      {
        name: 'Delete Notification',
        code: 'delete-notification',
        disabled: false,
        url: `${baseUrl}/api/notifications`,
        auth,
      },
    ]
  }

  const initializeRoutes = async (baseUrl: string, token: string) => {
    if (!baseUrl) {
      console.log('Audit API URL not configured, skipping route initialization')
      return
    }

    setLoading(true)
    const routes = buildRoutes(baseUrl, token)

    try {
      await engine.mutate(CREATE_OR_UPDATE_ROUTES_MUTATION as any, {
        variables: { routes },
      })
      console.log(`Routes created/updated successfully:`, routes.map(r => r.name))
    } catch (error: any) {
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
