import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import { useGlobalError } from "../error/useGlobalError";

const query = {
    systemInfo: {
        resource: 'system/info',
        params: {
            fields: "*"
        }
    }
}

const useGetSysInfo = () => {
    const { showError } = useGlobalError();
    const { data, loading, error, refetch } = useDataQuery(query);

    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);

    const sysInfo = data?.systemInfo ?? null;

    return { sysInfo, loading, error, refetch }
}

export default useGetSysInfo;