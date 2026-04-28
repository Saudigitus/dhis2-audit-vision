export type DiffStatus = "changed" | "same" | "added" | "removed";

export interface DiffEntry {
    path: string;
    leftValue: unknown;
    rightValue: unknown;
    status: DiffStatus;
}

function stringify(val: unknown): string {
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    if (typeof val === "object") return JSON.stringify(val, null, 2);
    return String(val);
}

export function formatValue(val: unknown): string {
    return stringify(val);
}

function flattenObject(
    obj: Record<string, unknown>,
    prefix = "",
    result: Record<string, unknown> = {}
): Record<string, unknown> {
    for (const key of Object.keys(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            Object.keys(value as object).length > 0
        ) {
            flattenObject(value as Record<string, unknown>, fullKey, result);
        } else {
            result[fullKey] = value;
        }
    }
    return result;
}

export function diffObjects(
    left: Record<string, unknown>,
    right: Record<string, unknown>
): DiffEntry[] {
    const flatLeft = flattenObject(left);
    const flatRight = flattenObject(right);

    const allKeys = new Set([...Object.keys(flatLeft), ...Object.keys(flatRight)]);
    const entries: DiffEntry[] = [];

    for (const key of allKeys) {
        const lv = flatLeft[key];
        const rv = flatRight[key];
        const leftStr = stringify(lv);
        const rightStr = stringify(rv);

        let status: DiffStatus;
        if (!(key in flatLeft)) {
            status = "added";
        } else if (!(key in flatRight)) {
            status = "removed";
        } else if (leftStr !== rightStr) {
            status = "changed";
        } else {
            status = "same";
        }

        entries.push({ path: key, leftValue: lv, rightValue: rv, status });
    }

    return entries.sort((a, b) => {
        const order: Record<DiffStatus, number> = { changed: 0, added: 1, removed: 2, same: 3 };
        return order[a.status] - order[b.status] || a.path.localeCompare(b.path);
    });
}
