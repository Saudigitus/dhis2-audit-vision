import { Card, Center, CircularLoader } from '@dhis2/ui'
import SystemHealthCard from './cardType/SystemHealthCard';
import { FC } from 'react';
import DashboardCard from './cardType/DashboardCard';
import { CardContainerProps, CardVariant } from '../../types/card/cardContainerProps';
import SecurityAuditCard from './cardType/SecurityAuditCard';

const CardContainer: FC<CardContainerProps> = (props) => {
    const { icon, label, value, variant, indicator, loading, iconBgColor, indicatorColor } = props;

    const renderCardContent = (variant: CardVariant) => {
        switch (variant) {
            case 'system-healt-card': return <SystemHealthCard
                icon={icon!} label={label!} value={value!} />;
            case 'dashboard-card': return <DashboardCard
                icon={icon} indicator={indicator!} label={label!} value={value!}
                iconBgColor={iconBgColor} indicatorColor={indicatorColor} />;
            case 'security-audit-card': return <SecurityAuditCard
                icon={icon} indicator={indicator!} label={label!} value={value!} />;
        }
    }

    const cardStyles = {
        'dashboard-card': 'flex! items-start justify-between  border border-[#e2e8f0]',
        'system-healt-card': 'border border-[#e2e8f0]',
        'security-audit-card': 'flex! flex-col! items-center justify-center text-center  border border-[#e2e8f0]',
    }

    return (
        <Card className={`shadow-none! rounded-xl!  p-5 ${cardStyles[variant]}`}>
            {
                loading ? <Center><CircularLoader small /></Center> :
                    renderCardContent(variant)
            }
        </Card>
    )
}

export default CardContainer