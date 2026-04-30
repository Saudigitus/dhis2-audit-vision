import { HashRouter, Route, Routes } from 'react-router-dom';
import { RouteList } from '.';
import { useRecoilValue } from 'recoil';
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema';

export default function Router() {
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)

    return (
        <HashRouter>
            <Routes>
                {
                    RouteList(!!dataStoreDataState?.auditApi).map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <route.layout>
                                    {route.component()}
                                </route.layout>
                            }
                        />
                    ))
                }
            </Routes>
        </HashRouter>
    )
}
