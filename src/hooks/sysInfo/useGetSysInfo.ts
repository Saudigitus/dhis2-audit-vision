import { useDataQuery } from "@dhis2/app-runtime";

const query = {
    systemInfo: {
        resource: 'system/info',
        params: {
            fields: "*"
        }
    }
}

const useGetSysInfo = () => {
    const { data, loading, error, refetch } = useDataQuery(query);

    const sysInfo = data?.systemInfo ?? null;

    return { sysInfo, loading, error, refetch }
}

export default useGetSysInfo;