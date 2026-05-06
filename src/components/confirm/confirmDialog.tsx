import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { ConfirmDialogProps } from '../../types/confirm/confirm';
import { defaultIcons, variantStyles } from '../../constants/confirm/confirm';

export default function ConfirmDialog({
    open,
    onConfirm,
    onCancel,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'warning',
    icon: customIcon,
    loading = false,
    confirmOnly = false,
}: ConfirmDialogProps) {
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const confirmRef = useRef<HTMLButtonElement>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const Icon = customIcon || defaultIcons[variant];
    const styles = variantStyles[variant];

    useEffect(() => {
        if (open) {
            setVisible(true);
            // Focus the cancel button after a tick (for accessibility)
            setTimeout(() => {
                cancelRef.current?.focus();
            }, 50);
        } else {
            setAnimating(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setAnimating(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [open]);

    // Handle Escape key
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onCancel]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-50'
                    }`}
                onClick={onCancel}
            />

            {/* Dialog */}
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-desc"
                className={`relative w-full max-w-md transform rounded-2xl bg-white p-0 shadow-2xl ring-1 ring-slate-200/80 transition-all duration-200 ${animating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={onCancel}
                    className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Fechar"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Content */}
                <div className="p-6 pb-0">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}>
                            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
                        </div>

                        <div className="min-w-0 flex-1 pt-1">
                            <h3 id="confirm-dialog-title" className="text-lg font-semibold text-slate-900">
                                {title}
                            </h3>
                            <p id="confirm-dialog-desc" className="mt-2 text-sm leading-relaxed text-slate-500">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 p-6">
                    {!confirmOnly && 
                        <button
                        ref={cancelRef}
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>}
                    <button
                        ref={confirmRef}
                        onClick={onConfirm}
                        disabled={loading}
                        className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${styles.buttonBg} ${styles.buttonHover} focus:${styles.ring}`}
                    >
                        {loading && (
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
