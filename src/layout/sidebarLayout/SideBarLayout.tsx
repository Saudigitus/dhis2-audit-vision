import Sidebar from "../../components/Sidebar";
import style from "../layout.module.css"
import { sidebarData } from "../../constants/sidebar-items/sidebar-items";

const SideBarLayout = (props: any) => {
    const { children } = props

    return (
        // <div className={style.layoutContainer}>
        //     <Sidebar navItems={sidebarData()} />
        //     <main className={style.sideBarLayoutContent}>
        //         {children}
        //     </main>
        // </div>

        <div className={style.layoutContainer}>
            <Sidebar navItems={sidebarData()} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default SideBarLayout
