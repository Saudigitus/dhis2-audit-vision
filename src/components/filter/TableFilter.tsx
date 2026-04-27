import { RotateCcw } from 'lucide-react'

const TableFilter = () => {
    return (
        <div className="w-[260px] shrink-0 bg-white rounded-xl border border-[#e2e8f0] p-5 h-fit">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-sm text-[#0f172a] uppercase tracking-wide">Filters</h3>
                <button className="flex items-center gap-1 text-sm text-[#64748b] hover:text-[#0f172a] cursor-pointer">
                    <RotateCcw size={14} />
                    Reset
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">View Group</label>
                    <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                        <option>All Groups</option>
                        <option>HIV/SIDA</option>
                        <option>Malaria</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Metadata Type</label>
                    <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                        <option>All</option>
                        <option>dataSet</option>
                        <option>dataElement</option>
                        <option>indicator</option>
                        <option>categoryCombo</option>
                        <option>program</option>
                        <option>trackedEntityType</option>
                        <option>organisationUnit</option>
                        <option>optionSet</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">User</label>
                    <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                        <option>All</option>
                        <option>admin</option>
                        <option>jdoe</option>
                        <option>kchan</option>
                        <option>rbrown</option>
                        <option>asmith</option>
                        <option>mwilson</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Audit Type</label>
                    <select className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                        <option>All</option>
                        <option>CREATE</option>
                        <option>UPDATE</option>
                        <option>DELETE</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Date From</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Date To</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                    />
                </div>
            </div>
        </div>
    )
}

export default TableFilter