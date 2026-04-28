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

function reconstructNested(
    flat: Record<string, unknown>,
    topKey: string
): unknown {
    const prefix = `${topKey}.`;
    const children = Object.entries(flat).filter(([k]) => k.startsWith(prefix));

    // Primitive — no children
    if (children.length === 0) {
        return flat[topKey];
    }

    // Reconstruct nested object from dot-notation children
    const result: Record<string, unknown> = {};
    for (const [flatKey, value] of children) {
        const parts = flatKey.slice(prefix.length).split('.');
        let cursor = result;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!(parts[i] in cursor)) cursor[parts[i]] = {};
            cursor = cursor[parts[i]] as Record<string, unknown>;
        }
        cursor[parts[parts.length - 1]] = value;
    }
    return result;
}

export function buildDiff(arr: AuditRecord[], action?: string | null, selected?: any | null): DiffEntry[] {
    if (arr?.length === 0) return [];

    const a = actions.DELETE === action ? {} : flattenObject(arr?.[0]?.objectData ?? {});
    const b = actions.DELETE === action
        ? flattenObject(arr?.[0]?.objectData ?? {})
        : selected ? flattenObject(selected) : arr?.[1] ? flattenObject(arr?.[1]?.objectData ?? {}) : {};

    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    const topLevelKeys = new Set(Array.from(allKeys).map(k => k.split('.')[0]));

    return Array.from(topLevelKeys).sort().map((topKey): DiffEntry => {
        const beforeValue = topKey in b ? reconstructNested(b, topKey) : undefined;
        const afterValue = topKey in a ? reconstructNested(a, topKey) : undefined;

        const before = beforeValue !== undefined ? serialize(beforeValue) : '—';
        const after = afterValue !== undefined ? serialize(afterValue) : '—';

        return { field: topKey, before, after, changed: before !== after };
    });
}