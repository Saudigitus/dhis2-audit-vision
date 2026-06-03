import { ArrayPair, DiffArrayItem, DiffNode, DiffNodeType } from "../../../types/diffTypes/diffTypes";

export function buildDiff(
    before: Record<string, unknown>,
    after: Record<string, unknown>,
    isCreate = false,
    parentPath = ""
): DiffNode[] {
    const allKeys = sortKeysWithIdentityFirst(
        Array.from(new Set([...Object.keys(before), ...Object.keys(after)]))
    );

    return allKeys.map((key) => {
        const path = parentPath ? `${parentPath}.${key}` : key;
        const bVal = before[key];
        const aVal = after[key];
        // For CREATE operations, everything is considered "changed" (new)
        const changed = isCreate || !valuesEqual(bVal, aVal);

        if (isArrayOfObjects(bVal) || isArrayOfObjects(aVal)) {
            const bArr = (isArrayOfObjects(bVal) ? bVal : []) as Record<string, unknown>[];
            const aArr = (isArrayOfObjects(aVal) ? aVal : []) as Record<string, unknown>[];
            const pairedItems: ArrayPair[] = pairArrayItems(bArr, aArr) ?? Array.from(
                { length: Math.max(bArr.length, aArr.length) },
                (_, index): ArrayPair => ({
                    index,
                    before: bArr[index],
                    after: aArr[index],
                })
            );
            const items: DiffArrayItem[] = [];

            for (const pair of pairedItems) {
                const itemPath = `${path}[${pair.identity ?? pair.index}]`;
                const bItem = pair.before as Record<string, unknown> | undefined;
                const aItem = pair.after as Record<string, unknown> | undefined;
                const itemChanged = !valuesEqual(bItem, aItem);
                const allItemKeys = sortKeysWithIdentityFirst(
                    Array.from(new Set([...Object.keys(bItem ?? {}), ...Object.keys(aItem ?? {})]))
                );

                const fields: DiffNode[] = allItemKeys.map((ik) => {
                    const childPath = `${itemPath}.${ik}`;
                    const ibVal = bItem?.[ik];
                    const iaVal = aItem?.[ik];
                    const fieldChanged = !valuesEqual(ibVal, iaVal);

                    if (isPlainObject(ibVal) || isPlainObject(iaVal)) {
                        const children = buildDiff(
                            (isPlainObject(ibVal) ? ibVal : {}) as Record<string, unknown>,
                            (isPlainObject(iaVal) ? iaVal : {}) as Record<string, unknown>,
                            isCreate,
                            childPath
                        );
                        return {
                            key: ik,
                            path: childPath,
                            type: "object" as DiffNodeType,
                            before: ibVal,
                            after: iaVal,
                            changed: isCreate || fieldChanged,
                            children,
                            arrayItemCount: { before: 0, after: 0 },
                        };
                    }

                    return {
                        key: ik,
                        path: childPath,
                        type: "primitive" as DiffNodeType,
                        before: ibVal,
                        after: iaVal,
                        changed: isCreate || fieldChanged,
                        arrayItemCount: { before: 0, after: 0 },
                    };
                });

                items.push({
                    index: pair.index,
                    path: itemPath,
                    identity: pair.identity,
                    fields,
                    changed: isCreate || itemChanged,
                    beforeExists: isCreate ? false : !!bItem,
                    afterExists: !!aItem,
                });
            }

            return {
                key,
                path,
                type: "array",
                before: bVal,
                after: aVal,
                changed,
                items,
                arrayItemCount: { before: bArr.length, after: aArr.length },
            };
        }

        if (isPlainObject(bVal) || isPlainObject(aVal)) {
            const children = buildDiff(
                (isPlainObject(bVal) ? bVal : {}) as Record<string, unknown>,
                (isPlainObject(aVal) ? aVal : {}) as Record<string, unknown>,
                isCreate,
                path
            );
            return {
                key,
                path,
                type: "object",
                before: bVal,
                after: aVal,
                changed,
                children,
                arrayItemCount: { before: 0, after: 0 },
            };
        }

        return {
            key,
            path,
            type: "primitive",
            before: bVal,
            after: aVal,
            changed,
            arrayItemCount: { before: 0, after: 0 },
        };
    });
}

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