import Sidebar from "../../components/Sidebar";
import style from "../layout.module.css"
import { sidebarData } from "../../constants/sidebar-items/sidebar-items";

const SideBarLayout = (props: any) => {
    const { children } = props

    return (
        <div className={style.layoutContainer}>
            <Sidebar navItems={sidebarData()} />
            <main className={style.sideBarLayoutContent}>
                {children}
            </main>
        </div>
    )
}

export default SideBarLayout
