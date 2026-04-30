import { useState, useMemo, useEffect } from "react";
import { displayValue, formatDate, isArrayOfObjects, isPlainObject, pairArrayItems, sortKeysWithIdentityFirst, valuesEqual } from "./utils/diffViewUtils";
import { ArrayPair, DiffArrayItem, DiffNode, DiffNodeType } from "../../types/diffTypes/diffTypes";
import { ActionIcon, BoxIcon, CalendarIcon, CollapseIcon, DocIcon, ExpandIcon, EyeIcon, EyeOffIcon, HashIcon, ResetExpandIcon, UserIcon } from "./components/icons";
import UpdateHistory from "./components/updateHistory";
import { format } from "date-fns";
import { RotateCcw } from "lucide-react";
import useRollback from "../../hooks/rollback/rollback";
import { CircularLoader } from "@dhis2/ui";
import ConfirmDialog from "../confirm/confirmDialog";

function buildDiff(
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

// ─── Component ──────────────────────────────────────────────────────────────

type Tab = "diff" | "raw";
type ExpandMode = "changed" | "all" | "none" | "manual";

export default function AuditDiffViewer({ auditDetails, selectedChange, onClose, setRefecth }: { setRefecth: (args: any) => void, onClose: () => void, selectedChange: any, auditDetails: any, }) {
    const [tab, setTab] = useState<Tab>("diff");
    const [showAll, setShowAll] = useState(false);
    const [expandMode, setExpandMode] = useState<ExpandMode>("none");
    const switchToManual = () => setExpandMode("manual");
    const [selected, setSelected] = useState<any>(null)
    const { rollback, loading } = useRollback()
    const [open, setOpen] = useState<boolean>(false)

    const after = auditDetails?.[0]?.objectData ?? {}
    const before = auditDetails?.[1]?.objectData ?? {}
    const createMode = !before
    const disabled = (Object?.keys(before)?.length === 0 && !selected) || loading

    const diffTree = useMemo(
        () =>
            buildDiff(
                selected ? selected?.objectData : before,
                after,
                createMode
            ),
        [createMode, selected]
    );

    const totalFields = countNodes(diffTree);
    const changedFields = countChanged(diffTree);

    const onConfirmRestore = async () => {
        setOpen(false); setSelected(null)
        const { lastUpdated, lastUpdatedBy, ...data } = selected ? selected?.objectData : before
        const resource = selectedChange?.object.charAt(0).toLowerCase() + selectedChange?.object.slice(1) + 's';
        await rollback({ [resource]: [data] })
        setRefecth((prev: boolean) => !prev)
    }

    const getMessage = () => {
        const { lastUpdated, lastUpdatedBy } = selected?.objectData ?? before ?? {};
        return (
            <span>
                Are you sure you want to restore the version from{" "}
                <strong>{lastUpdated ? format(lastUpdated, 'yyyy-MM-dd HH:mm:ss') : 'unknown date'}</strong>
                {" "}by{" "}
                <strong>{lastUpdatedBy?.displayName ?? 'Unknown User'}</strong>?
            </span>
        );
    };

    return (
        <div className="w-full bg-white overflow-auto">
            {open && <ConfirmDialog
                message={getMessage()}
                onConfirm={onConfirmRestore}
                title="Confirm restore"
                open={open}
                onCancel={() => setOpen(false)}
            />}

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-8 pt-7 pb-2">
                <h2 className="text-2xl font-bold text-slate-900">Change Detail</h2>
                <button onClick={() => onClose()} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* ── Meta grid ── */}
            <div className="px-8 py-5 grid grid-cols-2 gap-x-10 gap-y-3 border-b border-slate-100">
                <div className="space-y-3">
                    <MetaRow icon={<UserIcon />} label="User:" value={<span className="font-bold text-slate-800">{selectedChange?.user ?? "system"}</span>} />
                    <MetaRow icon={<CalendarIcon />} label="Date:" value={<span className="font-bold text-slate-800">{formatDate(selectedChange?.date)}</span>} />
                    <MetaRow icon={<DocIcon />} label="Type:" value={<span className="inline-flex px-3 py-0.5 bg-slate-100 text-slate-600 text-sm rounded font-medium">{selectedChange?.type}</span>} />
                </div>
                <div className="space-y-3">
                    <MetaRow icon={<ActionIcon />} label="Action:" value={<span className={`inline-flex px-3 py-0.5 text-sm rounded font-bold border ${createMode ? "bg-green-100 text-green-700 border-green-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}>{selectedChange?.action}</span>} />
                    <MetaRow icon={<BoxIcon />} label="Object name:" value={<span className="font-bold text-slate-800">{selectedChange?.object}</span>} />
                    <MetaRow icon={<HashIcon />} label="ID:" value={<span className="font-mono text-slate-700 font-semibold">{selectedChange?.id}</span>} />
                </div>
            </div>

            {/* ── Tab switcher ── */}
            <div className="px-8 pt-5 pb-0">
                <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-1 gap-1">
                    <TabBtn active={tab === "diff"} onClick={() => setTab("diff")}>Diff View</TabBtn>
                    <TabBtn active={tab === "raw"} onClick={() => setTab("raw")}>Raw JSON</TabBtn>
                </div>
            </div>

            {/* ── Content ── */}
            {
                tab === "diff" ? (
                    <div className="px-8 py-5">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => setShowAll((p) => !p)}
                                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${showAll
                                        ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                        }`}
                                >
                                    {showAll ? <EyeOffIcon /> : <EyeIcon />}
                                    {showAll ? "Show only differences" : "Showing only differences"}
                                </button>
                                <button
                                    onClick={() => setExpandMode("all")}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <ExpandIcon />
                                    Expand all
                                </button>
                                <button
                                    onClick={() => setExpandMode("none")}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <CollapseIcon />
                                    Collapse all
                                </button>
                            </div>
                            <span className="text-sm text-slate-500">
                                <span className="font-semibold text-amber-600">{changedFields} changed</span>
                                {" "}of <span className="font-semibold text-slate-700">{totalFields}</span> total fields
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-0 mb-3 items-center">
                            <div className="flex items-center justify-between pr-4 border-r border-slate-200 min-h-[32px]">
                                <span className={`text-[14px] font-bold tracking-widest uppercase ${selected?.auditType ? "text-amber-700 bg-amber-50 px-2 py-0.5" : createMode ? "text-slate-300" : "text-red-500 bg-red-50 px-2 py-0.5"}`}>
                                    {selected?.auditType ? `${selected?.auditType} - ${format(selected?.created_at, 'yyyy-MM-dd HH:mm:ss')}` : createMode ? "—" : "Before"}
                                </span>
                                <button
                                    disabled={disabled}
                                    onClick={() => setOpen(true)}
                                    className={`inline-flex items-center gap-1.5 rounded-[5px] border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all shadow-sm active:scale-95 ${disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
                                >
                                    {loading ? <CircularLoader small /> : <RotateCcw size={12} />}
                                    Restore
                                </button>
                            </div>
                            <div className="pl-4">
                                <span className="text-[14px] font-bold tracking-widest uppercase text-green-600 bg-green-50 px-2 py-0.5">
                                    {createMode ? "New Object" : "Current"}
                                </span>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <DiffTreeRenderer nodes={diffTree} showAll={showAll} depth={0} expandMode={expandMode} isCreate={createMode} onUserToggle={switchToManual} />
                        </div>
                    </div>
                ) : (
                    <RawJSON beforeData={before} afterData={after} isCreate={createMode} />
                )
            }
            <UpdateHistory loading={loading} selected={selected} auditDetails={auditDetails} setSelected={setSelected} />
        </div >
    );
}

// ─── Recursive Diff Tree Renderer ───────────────────────────────────────────

function DiffTreeRenderer({ nodes, showAll, depth, expandMode, insideCollapsible = false, isCreate = false, onUserToggle }: { nodes: DiffNode[]; showAll: boolean; depth: number; expandMode: ExpandMode; insideCollapsible?: boolean; isCreate?: boolean; onUserToggle?: () => void }) {
    // Inside collapsible sections: always show all fields (highlight changed ones)
    // At top level: respect the showAll toggle
    const filtered = insideCollapsible ? nodes : (showAll ? nodes : nodes.filter((n) => n.changed));

    if (filtered.length === 0) {
        return (
            <div className="text-center py-10 text-slate-400 text-sm">
                {depth === 0 ? (isCreate ? "New object created." : "No differences found between the two versions.") : "No differences in this section."}
            </div>
        );
    }

    return (
        <>
            {filtered.map((node) => (
                <DiffNodeRow key={node.path} node={node} showAll={showAll} depth={depth} expandMode={expandMode} insideCollapsible={insideCollapsible} isCreate={isCreate} onUserToggle={onUserToggle} />
            ))}
        </>
    );
}

function DiffNodeRow({ node, showAll, depth, expandMode, insideCollapsible = false, isCreate = false, onUserToggle }: { node: DiffNode; showAll: boolean; depth: number; expandMode: ExpandMode; insideCollapsible?: boolean; isCreate?: boolean; onUserToggle?: () => void }) {
    if (node.type === "object" && node.children) {
        return <CollapsibleObjectRow node={node} showAll={showAll} depth={depth} expandMode={expandMode} isCreate={isCreate} onUserToggle={onUserToggle} />;
    }

    if (node.type === "array" && node.items) {
        return <CollapsibleArrayRow node={node} showAll={showAll} depth={depth} expandMode={expandMode} isCreate={isCreate} onUserToggle={onUserToggle} />;
    }

    return <PrimitiveRow node={node} depth={depth} insideCollapsible={insideCollapsible} isCreate={isCreate} />;
}

// ─── Primitive Row ──────────────────────────────────────────────────────────

function PrimitiveRow({ node, depth, insideCollapsible = false, isCreate = false }: { node: DiffNode; depth: number; insideCollapsible?: boolean; isCreate?: boolean }) {
    const beforeStr = isCreate ? "—" : displayValue(node.before);
    const afterStr = displayValue(node.after);
    const beforeEmpty = beforeStr === "—";
    const afterEmpty = afterStr === "—";
    const isRemoved = !isCreate && node.changed && node.before !== undefined && node.after === undefined;
    const isAdded = !isCreate && node.changed && node.before === undefined && node.after !== undefined;
    const badgeLabel = isCreate ? "New" : isRemoved ? "Removed" : isAdded ? "Added" : "Changed";
    const badgeClass = isCreate || isAdded
        ? "bg-green-100 text-green-800"
        : isRemoved
            ? "bg-red-100 text-red-800"
            : "bg-amber-100 text-amber-800";
    const showBadge = node.changed && (insideCollapsible || isRemoved || isAdded || isCreate);

    // When inside a collapsible section, highlight the entire row if changed
    const rowHighlight = insideCollapsible && node.changed
        ? isCreate || isAdded
            ? "bg-green-50/60 border-l-4 border-l-green-400"
            : isRemoved
                ? "bg-red-50/60 border-l-4 border-l-red-400"
                : "bg-amber-50/60 border-l-4 border-l-amber-400"
        : "";

    // Labels always black, values keep their styling
    const keyClass = insideCollapsible
        ? "text-xs font-medium mb-1 font-mono text-slate-900"
        : "text-xs text-slate-400 font-medium mb-1 font-mono";

    return (
        <div className={`grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100 last:border-b-0 ${rowHighlight}`}>
            {/* Before */}
            <div className="p-4" style={{ paddingLeft: `${16 + depth * 20}px` }}>
                <p className={keyClass}>{node.key}{showBadge && <span className={`ml-2 inline-flex items-center px-1.5 py-0 rounded text-[10px] font-bold leading-tight uppercase tracking-wide ${badgeClass}`}>{badgeLabel}</span>}</p>
                <div className={`text-sm font-mono break-all ${beforeEmpty ? "text-slate-300" : "text-slate-600"} ${node.changed && !beforeEmpty ? "bg-red-50 border border-red-200 rounded px-2 py-1 inline-block" : ""}`}>
                    {beforeStr.includes("\n") ? <pre className="whitespace-pre-wrap text-xs">{beforeStr}</pre> : beforeStr}
                </div>
            </div>
            {/* After */}
            <div className="p-4" style={{ paddingLeft: `${16 + depth * 20}px` }}>
                <p className={keyClass}>{node.key}{showBadge && <span className={`ml-2 inline-flex items-center px-1.5 py-0 rounded text-[10px] font-bold leading-tight uppercase tracking-wide ${badgeClass}`}>{badgeLabel}</span>}</p>
                <div className={`text-sm font-mono break-all ${afterEmpty ? "text-slate-300" : "text-slate-600"} ${node.changed && !afterEmpty ? "bg-green-50 border border-green-200 rounded px-2 py-1 inline-block" : ""}`}>
                    {afterStr.includes("\n") ? <pre className="whitespace-pre-wrap text-xs">{afterStr}</pre> : afterStr}
                </div>
            </div>
        </div>
    );
}

function CollapsibleObjectRow({
    node,
    showAll,
    depth,
    expandMode,
    isCreate = false,
    onUserToggle,
}: {
    node: DiffNode;
    showAll: boolean;
    depth: number;
    expandMode: ExpandMode;
    isCreate?: boolean;
    onUserToggle?: () => void;
}) {
    const [manualOpen, setManualOpen] = useState(node.changed);

    const open = expandMode === "all" ? true : expandMode === "none" ? false : expandMode === "changed" ? node.changed : manualOpen;

    useEffect(() => {
        if (expandMode === "all") setManualOpen(true);
        else if (expandMode === "none") setManualOpen(false);
        else if (expandMode === "changed") setManualOpen(node.changed);
    }, [expandMode, node.changed]);

    const handleToggle = () => {
        setManualOpen(!open);
        onUserToggle?.();
    };

    const childChanged = node.children ? countChanged(node.children) : 0;
    const childTotal = node.children ? countNodes(node.children) : 0;

    const isAdded = !isCreate && node.before === undefined && node.after !== undefined;
    const isRemoved = !isCreate && node.before !== undefined && node.after === undefined;

    const headerHighlight = node.changed
        ? isCreate || isAdded
            ? "bg-green-50/40"
            : isRemoved
                ? "bg-red-50/40"
                : childChanged > 0
                    ? "bg-amber-50/30"
                    : ""
        : "";

    const statusBadge = isCreate || isAdded ? (
        <span className="inline-flex items-center px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">
            {isCreate ? "New" : "Added"}
        </span>
    ) : isRemoved ? (
        <span className="inline-flex items-center px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold uppercase">
            Removed
        </span>
    ) : null;

    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={handleToggle}
                className={`w-full grid grid-cols-2 divide-x divide-slate-100 hover:bg-slate-50/60 transition-colors ${headerHighlight}`}
                style={{ paddingLeft: `${depth * 20}px` }}
            >
                <div className="p-4 flex items-center gap-2 text-left" style={{ paddingLeft: `${16}px` }}>
                    <ChevronIcon open={open} />
                    <span className="text-xs font-mono font-semibold text-slate-600">{node.key}</span>
                    <span className="text-xs text-slate-400 font-medium">object</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">
                        {isRemoved ? `${childTotal} fields` : isAdded ? "—" : `${childTotal} fields`}
                    </span>
                    {statusBadge}
                    {!statusBadge && childChanged > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                            {childChanged} changed
                        </span>
                    )}
                </div>

                <div className="p-4 flex items-center gap-2 text-left" style={{ paddingLeft: `${16}px` }}>
                    <span className="text-xs font-mono font-semibold text-slate-600">{node.key}</span>
                    <span className="text-xs text-slate-400 font-medium">object</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">
                        {isRemoved ? "—" : `${childTotal} fields`}
                    </span>
                    {statusBadge}
                </div>
            </button>

            {node.children && (
                <div
                    hidden={!open}
                    className="bg-slate-50/40 border-t border-slate-100"
                >
                    <DiffTreeRenderer
                        nodes={node.children}
                        showAll={showAll}
                        depth={depth + 1}
                        expandMode={expandMode}
                        insideCollapsible={true}
                        isCreate={isCreate}
                        onUserToggle={onUserToggle}
                    />
                </div>
            )}
        </div>
    );
}

// ─── Collapsible Array ──────────────────────────────────────────────────────

function CollapsibleArrayRow({ node, showAll, depth, expandMode, isCreate = false, onUserToggle }: { node: DiffNode; showAll: boolean; depth: number; expandMode: ExpandMode; isCreate?: boolean; onUserToggle?: () => void }) {
    const [manualOpen, setManualOpen] = useState(node.changed);
    const open = expandMode === "all" ? true : expandMode === "none" ? false : expandMode === "changed" ? node.changed : manualOpen;

    useEffect(() => {
        if (expandMode === "all") setManualOpen(true);
        else if (expandMode === "none") setManualOpen(false);
        else if (expandMode === "changed") setManualOpen(node.changed);
    }, [expandMode, node.changed]);

    const handleToggle = () => {
        setManualOpen(!open);
        onUserToggle?.();
    };

    const items = node.items ?? [];
    const changedItems = items.filter((it) => it.changed).length;
    const addedItems = items.filter((it) => !it.beforeExists && it.afterExists).length;
    const removedItems = items.filter((it) => it.beforeExists && !it.afterExists).length;

    // Header background tint based on the dominant change type
    const headerHighlight = node.changed
        ? isCreate
            ? "bg-green-50/40"
            : addedItems > 0 && removedItems === 0
                ? "bg-green-50/30"
                : removedItems > 0 && addedItems === 0
                    ? "bg-red-50/30"
                    : "bg-amber-50/30"
        : "";

    return (
        <div className="border-b border-slate-100 last:border-b-0">
            {/* Array header */}
            <button
                onClick={handleToggle}
                className={`w-full grid grid-cols-2 divide-x divide-slate-100 hover:bg-slate-50/60 transition-colors ${headerHighlight}`}
                style={{ paddingLeft: `${depth * 20}px` }}
            >
                <div className="w-[100%] p-4 flex items-center gap-2 text-left" style={{ paddingLeft: `${16}px` }}>
                    <ChevronIcon open={open} />
                    <span className="text-xs font-mono font-semibold text-slate-600">{node.key}</span>
                    <span className="text-xs text-slate-400 font-medium">array</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{node.arrayItemCount.before} items</span>
                    {changedItems > 0 && addedItems === 0 && removedItems === 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                            {changedItems} changed
                        </span>
                    )}
                    {removedItems > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold uppercase">
                            {removedItems} removed
                        </span>
                    )}
                </div>
                <div className="p-4 flex items-center gap-2 text-left" style={{ paddingLeft: `${16}px` }}>
                    <span className="text-xs font-mono font-semibold text-slate-600">{node.key}</span>
                    <span className="text-xs text-slate-400 font-medium">array</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{node.arrayItemCount.after} items</span>
                    {addedItems > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">
                            +{addedItems} {isCreate ? "new" : "added"}
                        </span>
                    )}
                </div>
            </button>

            {/* Array items */}
            {open && (
                <div className="bg-slate-50/40 border-t border-slate-100">
                    {items.map((item) => {
                        return (
                            <ArrayItemRow
                                key={item.path}
                                item={item}
                                parentKey={node.key}
                                showAll={showAll}
                                depth={depth + 1}
                                expandMode={expandMode}
                                isCreate={isCreate}
                                onUserToggle={onUserToggle}
                            />
                        );
                    })}
                    {items.length === 0 && (
                        <div className="text-center py-6 text-slate-400 text-sm">
                            No items in this array.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ArrayItemRow({ item, parentKey, showAll, depth, expandMode, isCreate = false, onUserToggle }: { item: DiffArrayItem; parentKey: string; showAll: boolean; depth: number; expandMode: ExpandMode; isCreate?: boolean; onUserToggle?: () => void }) {
    const [manualOpen, setManualOpen] = useState(item.changed);
    const open = expandMode === "all" ? true : expandMode === "none" ? false : expandMode === "changed" ? item.changed : manualOpen;

    useEffect(() => {
        if (expandMode === "all") setManualOpen(true);
        else if (expandMode === "none") setManualOpen(false);
        else if (expandMode === "changed") setManualOpen(item.changed);
    }, [expandMode, item.changed]);

    const handleToggle = () => {
        setManualOpen(!open);
        onUserToggle?.();
    };

    const changedFieldCount = item.fields.filter((f) => f.changed).length;

    const headerHighlight = item.changed
        ? isCreate || !item.beforeExists
            ? "bg-green-50/40"
            : !item.afterExists
                ? "bg-red-50/40"
                : "bg-amber-50/40"
        : "";
    const itemLabel = item.identity ? `${parentKey}[${item.identity}]` : `${parentKey}[${item.index}]`;

    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={handleToggle}
                className={`w-full grid grid-cols-2 divide-x divide-slate-100 hover:bg-slate-50/60 transition-colors ${headerHighlight}`}
                style={{ paddingLeft: `${depth * 20}px` }}
            >
                <div className="p-3 flex items-center gap-2 text-left" style={{ paddingLeft: `${16}px` }}>
                    <ChevronIcon open={open} />
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-200 text-slate-600 text-xs font-bold">{item.index}</span>
                    <span className="text-xs font-mono text-slate-500">{itemLabel}</span>
                    {!item.beforeExists && (
                        <span className="inline-flex px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">{isCreate ? "New" : "Added"}</span>
                    )}
                    {!item.afterExists && (
                        <span className="inline-flex px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">Removed</span>
                    )}
                    {item.changed && item.beforeExists && item.afterExists && changedFieldCount > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                            {changedFieldCount} changed
                        </span>
                    )}
                </div>
                <div className="p-3 flex items-center gap-2 text-left" style={{ paddingLeft: `${16}px` }}>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-200 text-slate-600 text-xs font-bold">{item.index}</span>
                    <span className="text-xs font-mono text-slate-500">{itemLabel}</span>
                    <span className="text-xs text-slate-400">{item.fields.length} fields</span>
                </div>
            </button>

            {open && (
                <div className="bg-white/60 border-t border-slate-100">
                    <DiffTreeRenderer nodes={item.fields} showAll={showAll} depth={depth + 1} expandMode={expandMode} insideCollapsible={true} isCreate={isCreate} onUserToggle={onUserToggle} />
                </div>
            )}
        </div>
    );
}

// ─── Count helpers ──────────────────────────────────────────────────────────

function countNodes(nodes: DiffNode[]): number {
    let c = 0;
    for (const n of nodes) {
        if (n.type === "primitive") c++;
        else if (n.type === "object" && n.children) c += countNodes(n.children);
        else if (n.type === "array" && n.items) {
            for (const it of n.items) c += countNodes(it.fields);
        }
    }
    return c;
}

function countChanged(nodes: DiffNode[]): number {
    let c = 0;
    for (const n of nodes) {
        if (n.type === "primitive" && n.changed) c++;
        else if (n.type === "object" && n.children) c += countChanged(n.children);
        else if (n.type === "array" && n.items) {
            for (const it of n.items) c += countChanged(it.fields);
        }
    }
    return c;
}

// ─── Raw JSON ───────────────────────────────────────────────────────────────

function RawJSON({ beforeData, afterData, isCreate }: { beforeData: Record<string, unknown>; afterData: Record<string, unknown>; isCreate: boolean }) {
    const [which, setWhich] = useState<"before" | "after">("before");
    const data = which === "before" ? beforeData : afterData;

    return (
        <div className="px-8 py-5">
            <div className="flex gap-2 mb-4">
                <button onClick={() => setWhich("before")} className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${which === "before" ? "bg-red-50 border-red-300 text-red-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                    {isCreate ? "Before (empty)" : "Before (Version A)"}
                </button>
                <button onClick={() => setWhich("after")} className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${which === "after" ? "bg-green-50 border-green-300 text-green-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                    {isCreate ? "New Object" : "After (Version B)"}
                </button>
            </div>
            <pre className="bg-slate-900 text-green-300 text-xs rounded-xl p-5 overflow-auto max-h-[500px] leading-relaxed">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

// ─── Small UI helpers ───────────────────────────────────────────────────────

function MetaRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="text-slate-400 flex-shrink-0">{icon}</span>
            <span className="text-slate-500 text-sm">{label}</span>
            <span className="text-sm">{value}</span>
        </div>
    );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 ${active ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700"
                }`}
        >
            {children}
        </button>
    );
}

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-90" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
    );
}