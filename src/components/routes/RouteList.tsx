import Dashboard from "../../pages/Dashboard";
import { SideBarLayout, SimpleLayout } from "../../layout";
import { Navigate } from "react-router-dom";
import ChangeExplorer from "../../pages/changeExplorer/ChangeExplorer";
import SecurityAudit from "../../pages/SecurityAudit";
import Documentation from "../../pages/Documentation";
import Alerts from "../../pages/Alerts";
import Trends from "../../pages/Trends";
import UsersPage from "../../pages/Users";
import NotificationsPage from "../../pages/Notifications";
import ProfilePage from "../../pages/Profile";
import SettingsPage from "../../pages/Settings";
import SystemHealth from "../../pages/sysHealth/SystemHealth";
import MonitoringGroups from "../../pages/metadataGroups/MonitoringGroups";
import SeverityRules from "../../pages/SeverityRules";

export default function RouteList() {

    return [
        {
            path: "/",
            layout: SimpleLayout,
            component: () => <Navigate to="/dashboard" replace />
        },
        {
            path: "/dashboard",
            layout: SideBarLayout,
            component: () => <Dashboard />
        },
        {
            path: "/change-explorer",
            layout: SideBarLayout,
            component: () => <ChangeExplorer />
        },
        {
            path: "/metadata-grouping",
            layout: SideBarLayout,
            component: () => <MonitoringGroups />
        },

        // {
        //     path: "/system-health",
        //     layout: SideBarLayout,
        //     component: () => <SystemHealth />
        // },
        {
            path: "/security-audit",
            layout: SideBarLayout,
            component: () => <SecurityAudit />
        },
        {
            path: "/documentation",
            layout: SideBarLayout,
            component: () => <Documentation />
        },
        {
            path: "/alerts",
            layout: SideBarLayout,
            component: () => <Alerts />
        },
        {
            path: "/trends",
            layout: SideBarLayout,
            component: () => <Trends />
        },
        {
            path: "/users",
            layout: SideBarLayout,
            component: () => <UsersPage />
        },
        {
            path: "/severity-rules",
            layout: SideBarLayout,
            component: () => <SeverityRules />
        },
        {
            path: "/notifications",
            layout: SideBarLayout,
            component: () => <NotificationsPage />
        },
        {
            path: "/profile",
            layout: SideBarLayout,
            component: () => <ProfilePage />
        },
        {
            path: "/settings",
            layout: SideBarLayout,
            component: () => <SettingsPage />
        },
    ]
}
