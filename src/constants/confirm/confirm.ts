import { AlertTriangle, Info, ShieldAlert, Trash2 } from "lucide-react";
import { ConfirmVariant } from "../../types/confirm/confirm";

export const variantStyles: Record<ConfirmVariant, { iconBg: string; iconColor: string; buttonBg: string; buttonHover: string; ring: string }> = {
    danger: {
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        buttonBg: 'bg-red-600',
        buttonHover: 'hover:bg-red-700',
        ring: 'ring-red-200',
    },
    warning: {
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        buttonBg: 'bg-amber-600',
        buttonHover: 'hover:bg-amber-700',
        ring: 'ring-amber-200',
    },
    info: {
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        buttonBg: 'bg-indigo-600',
        buttonHover: 'hover:bg-indigo-700',
        ring: 'ring-indigo-200',
    },
    success: {
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        buttonBg: 'bg-emerald-600',
        buttonHover: 'hover:bg-emerald-700',
        ring: 'ring-emerald-200',
    },
};

export const defaultIcons: Record<ConfirmVariant, React.ElementType> = {
    danger: Trash2,
    warning: AlertTriangle,
    info: Info,
    success: ShieldAlert,
};
