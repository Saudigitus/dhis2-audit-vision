
export interface ArrayPair {
    index: number;
    identity?: string;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
}

// ─── Build structured diff ──────────────────────────────────────────────────

export type DiffNodeType = "primitive" | "object" | "array";

export interface DiffNode {
    key: string;
    path: string;
    type: DiffNodeType;
    before: unknown;
    after: unknown;
    changed: boolean;
    children?: DiffNode[];
    items?: DiffArrayItem[];
    arrayItemCount: { before: number; after: number };
}

export interface DiffArrayItem {
    index: number;
    path: string;
    identity?: string;
    fields: DiffNode[];
    changed: boolean;
    beforeExists: boolean;
    afterExists: boolean;
}