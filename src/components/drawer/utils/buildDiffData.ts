import { actions } from "../../../enum/actions";

type DiffEntry = {
    field: string;
    before: string;
    after: string;
    changed: boolean;
};

type AuditRecord = {
    id: string;
    auditId: string;
    objectData: Record<string, unknown>;
    updated_at: string;
    objectId: string;
    created_at: string;
};

function flattenObject(
    obj: Record<string, unknown>,
    prefix = ''
): Record<string, unknown> {
    return Object.entries(obj).reduce<Record<string, unknown>>((acc, [k, v]) => {
        const key = prefix ? `${prefix}.${k}` : k;
        if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
            Object.assign(acc, flattenObject(v as Record<string, unknown>, key));
        } else {
            acc[key] = v;
        }
        return acc;
    }, {});
}

function serialize(value: unknown): string {
    if (value === undefined) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
}

export function buildDiff(arr: AuditRecord[], action?: string | null | undefined): DiffEntry[] {
    if (arr?.length === 0) return [];

    const a = actions.DELETE == action ? {} : flattenObject(arr?.[0]?.objectData ?? {});
    const b = action == actions.DELETE ? flattenObject(arr?.[0]?.objectData) : arr?.[1] ? flattenObject(arr?.[1]?.objectData ?? {}) : {};

    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

    return Array.from(keys).sort().map((field): DiffEntry => {
        const before = field in b ? serialize(b[field]) : '—';
        const after = field in a ? serialize(a[field]) : '—';
        return { field, before, after, changed: before !== after };
    });
}