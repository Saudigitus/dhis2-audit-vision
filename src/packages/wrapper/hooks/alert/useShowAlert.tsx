import { useAlert } from "@dhis2/app-runtime"

const useShowAlerts = () => {
  const { show, hide } = useAlert(({ message }: any) => message, ({ type }: any) => ({ ...type, duration: 3000 }))

  return { show, hide }
}

export default useShowAlerts
