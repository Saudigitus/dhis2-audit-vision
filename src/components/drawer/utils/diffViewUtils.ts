import { ArrayPair } from "../../../types/diffTypes/diffTypes";

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

export function displayValue(val: unknown): string {
    if (val === null || val === undefined) return "—";
    if (typeof val === "boolean") return String(val);
    if (typeof val === "number") return String(val);
    if (typeof val === "string") return val;
    if (Array.isArray(val)) {
        if (val.length === 0) return "[]";
        return JSON.stringify(val, null, 2);
    }
    if (typeof val === "object") {
        return JSON.stringify(val, null, 2);
    }
    return String(val);
}

export function isArrayOfObjects(val: unknown): val is Record<string, unknown>[] {
    return Array.isArray(val) && val.length > 0 && typeof val[0] === "object" && val[0] !== null;
}

export function isPlainObject(val: unknown): val is Record<string, unknown> {
    return typeof val === "object" && val !== null && !Array.isArray(val);
}

export function valuesEqual(a: unknown, b: unknown): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function getPreferredKeyOrder(key: string): number {
    const normalized = key.toLowerCase();
    if (normalized === "id") return 0;
    if (normalized.endsWith("id")) return 1;
    if (normalized === "name" || normalized === "displayname") return 2;
    if (normalized === "code") return 3;
    if (normalized === "sortorder") return 4;
    return 10;
}

export function sortKeysWithIdentityFirst(keys: string[]): string[] {
    return [...keys].sort((a, b) => {
        const orderDiff = getPreferredKeyOrder(a) - getPreferredKeyOrder(b);
        if (orderDiff !== 0) return orderDiff;
        return a.localeCompare(b);
    });
}

export function getItemIdentity(item: Record<string, unknown> | undefined): string | undefined {
    if (!item) return undefined;
    if (typeof item.id === "string") return item.id;
    if (typeof item.uid === "string") return item.uid;
    if (typeof item.code === "string") return item.code;

    for (const [key, value] of Object.entries(item)) {
        const lower = key.toLowerCase();
        if ((lower === "userid" || lower.endsWith("uid") || lower.endsWith("id")) && typeof value === "string") {
            return value;
        }
        if (isPlainObject(value) && typeof value.id === "string") {
            return `${key}:${value.id}`;
        }
    }

    return undefined;
}

export function pairArrayItems(before: Record<string, unknown>[], after: Record<string, unknown>[]): ArrayPair[] | undefined {
    const beforeById = new Map<string, Record<string, unknown>>();
    const afterById = new Map<string, Record<string, unknown>>();
    const orderedIds: string[] = [];

    for (const item of before) {
        const id = getItemIdentity(item);
        if (!id) return undefined;
        beforeById.set(id, item);
        orderedIds.push(id);
    }

    for (const item of after) {
        const id = getItemIdentity(item);
        if (!id) return undefined;
        afterById.set(id, item);
        if (!orderedIds.includes(id)) orderedIds.push(id);
    }

    return orderedIds.map((id, index): ArrayPair => ({
        index,
        identity: id,
        before: beforeById.get(id),
        after: afterById.get(id),
    }));
}