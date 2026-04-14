import { ReactNode } from "react";

type CardVariant = 'system-healt-card' | 'dashboard-card' | 'security-audit-card';

interface CardContainerProps {
    variant: CardVariant;
    icon: ReactNode | string;
    iconBgColor?: string;
    indicatorColor?: string;
    label?: string;
    value?: string;
    indicator?: string;
    loading?: boolean;
}

interface DashboardCardProps {
    icon: React.ReactNode;
    iconBgColor?: string;
    indicatorColor?: string;
    label: string;
    value: string;
    indicator: string
}


interface SystemHealthCardProps {
    icon: React.ReactNode;
    iconBgColor?: string;
    label: string;
    value: string
}

export { type CardContainerProps, type CardVariant, type DashboardCardProps, type SystemHealthCardProps }