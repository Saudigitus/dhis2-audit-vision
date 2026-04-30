import { Button } from '@dhis2/ui'
import { RotateCcw } from 'lucide-react'

interface TableFilterProps {
    filters: Record<string, { values?: string[], inputType: string, label: string }>
    setFilteQuery: (query: string | null) => void,
    query: Record<string, string> | null,
    setQuery: (query: Record<string, string> | null) => void,
}

const TableFilter = (props: TableFilterProps) => {
    const { filters, setFilteQuery, setQuery, query } = props

    const handleFilter = () => {
        if (query) {
            const cleanQuery = Object.fromEntries(
                Object.entries(query).filter(([_, value]) => {
                    if (Array.isArray(value)) return value.length > 0;
                    return value !== "" && value !== null && value !== undefined;
                })
            );

            const queryStr = new URLSearchParams(cleanQuery)?.toString();
            setFilteQuery(queryStr)
        }
    }

    const handleChange = (e: any) => {
        setQuery({ ...query, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-[260px] shrink-0 bg-white rounded-xl border border-[#e2e8f0] p-5 h-fit">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-sm text-[#0f172a] uppercase tracking-wide">Filters</h3>
                <button disabled={!query} onClick={() => { setQuery(null), setFilteQuery(null) }} className="flex items-center gap-1 text-sm text-[#64748b] hover:text-[#0f172a] cursor-pointer">
                    <RotateCcw size={14} />
                    Reset
                </button>
            </div>

            <div className="space-y-4 mb-2">
                {
                    Object.entries(filters).map(([key, item]) => (
                        <div>
                            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">{item.label}</label>
                            {
                                item.inputType === 'select' ?
                                    <select value={query?.[key] || ''} name={key} onChange={handleChange} className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                                        <option value=''>All</option>
                                        {
                                            item?.values?.map((item) => (
                                                <option value={item} key={item}>{item}</option>
                                            ))
                                        }
                                    </select> :
                                    <input value={query?.[key] || ''} onChange={handleChange} className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" name={key} type={item.inputType} />

                            }

                        </div>
                    ))
                }
            </div>
            <Button disabled={!query} onClick={handleFilter}>Filter</Button>
        </div>
    )
}

export default TableFilter