import { useRecoilValue } from "recoil";
import style from "../layout.module.css"
import Sidebar from "../../components/Sidebar";
import { sidebarData } from "../../constants/sidebar-items/sidebar-items";
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema";

const SideBarLayout = (props: any) => {
    const { children } = props
    const dataStoreDataState = useRecoilValue(DataStoreConfigState)

    return (
        <div className={style.layoutContainer}>
            <Sidebar navItems={sidebarData(!!dataStoreDataState?.auditApi)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default SideBarLayout
