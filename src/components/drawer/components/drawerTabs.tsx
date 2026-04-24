type DetailTab = 'diff' | 'dependencies' | 'raw';

export default function DrawerTabs({ selectedChange, detailTab, setDetailTab }: { selectedChange: any, detailTab: string, setDetailTab: (args: DetailTab) => void }) {
    return (
        <div className="flex bg-[#f1f5f9] rounded-lg p-1 mb-5">
            <button
                onClick={() => setDetailTab('diff')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${detailTab === 'diff' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'
                    }`}
            >
                Diff View
            </button>
            {selectedChange?.dependencies && selectedChange.dependencies.length > 0 && (
                <button
                    onClick={() => setDetailTab('dependencies')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2 ${detailTab === 'dependencies' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'
                        }`}
                >
                    Dependencies
                    <span className="bg-[#e2e8f0] text-[#475569] text-[10px] px-1.5 py-0.5 rounded-full">{selectedChange.dependencies.length}</span>
                </button>
            )}
            <button
                onClick={() => setDetailTab('raw')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${detailTab === 'raw' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'
                    }`}
            >
                Raw JSON
            </button>
        </div>
    )
}