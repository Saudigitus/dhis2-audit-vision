import { cn } from '../utils/cn';
import { useEffect, useMemo, useState } from 'react';
import { Layers, Filter, X, ChevronDown } from 'lucide-react';
import { useParams } from '../hooks/common/useQueryParams';
import { format, subDays } from 'date-fns';

export type AuditDomain = 'metadata' | 'tracker';
export type AuditPeriod = 'today' | '7d' | '30d' | '90d' | 'custom';

export interface AuditFilterState {
  // domain: AuditDomain;
  // objectType: string;
  // period: AuditPeriod;
  customFrom: string;
  customTo: string;
}

interface GlobalAuditFilterProps {
  value: AuditFilterState;
  onChange: (value: AuditFilterState) => void;
  className?: string;
}

const metadataTypes = [
  'All',
  'dataSet',
  'dataElement',
  'indicator',
  'categoryCombo',
  'program',
  'trackedEntityType',
  'organisationUnit',
  'optionSet',
];

const trackerTypes = [
  'All',
  'trackedEntity',
  'enrollment',
  'event',
  'programStage',
  'programRule',
  'relationship',
  'attribute',
];

const periodLabels: Record<AuditPeriod, string> = {
  today: 'Today',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  custom: 'Custom range',
};

const defaultFilter: AuditFilterState = {
  // domain: 'metadata',
  // objectType: 'All',
  // period: '30d',
  customFrom: '',
  customTo: '',
};

const periods: AuditPeriod[] = ['today', '7d', '30d', '90d', 'custom'];

export default function GlobalAuditFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const { add, startDate, endDate } = useParams();
  const [draft, setDraft] = useState<AuditFilterState>({ customFrom: startDate!, customTo: endDate || '' });

  // const objectTypes = useMemo(
  //   () => (draft.domain === 'metadata' ? metadataTypes : trackerTypes),
  //   [draft.domain],
  // );

  useEffect(() => {
    if (!startDate || !endDate) {
      add("startDate", format(subDays(new Date(), 365), "yyyy-MM-dd"));
      add("endDate", format(new Date(), "yyyy-MM-dd"));
    }
  }, [startDate, endDate])

  // const triggerDomainLabel = value.domain === 'metadata' ? 'Metadata' : 'Tracker Domain';
  // const triggerPeriodLabel = periodLabels[value.period];

  const openModal = () => {
    setDraft({ customFrom: startDate!, customTo: endDate || '' });
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const resetDraft = () => setDraft(defaultFilter);

  const applyFilters = () => {
    add("startDate", format(new Date(draft.customFrom), "yyyy-MM-dd"));
    add("endDate", format(new Date(draft.customTo), "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const handleDomainChange = (domain: AuditDomain) => {
    setDraft((current) => ({
      ...current,
      domain,
      objectType: 'All',
    }));
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={cn(
          'flex items-center gap-2 rounded-xl border border-[#dbe4f0] bg-white px-3 py-2 text-xs font-medium text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:bg-[#f8fafc] cursor-pointer',
        )}
      >
        <Filter size={15} className="text-[#0f172a]" />
        {/* <span>{triggerDomainLabel}</span>*/}
        <span className="text-[#94a3b8]">·</span>
        <span className="text-[#0f172a] text-xs">{format(new Date(startDate), "dd MMM yyyy")} - {format(new Date(endDate), "dd MMM yyyy")}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/55 px-4" onClick={closeModal}>
          <div
            className="w-full max-w-[640px] rounded-2xl border border-[#dbe4f0] bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-[#2563eb]" />
                <h2 className="text-[18px] font-bold text-[#1e293b]">Filter</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1 text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#334155] cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-2">
              {/* <div>
                <label className="mb-3 block text-sm font-medium text-[#0f172a]">Audit Domain</label>
                <div className="grid grid-cols-2 gap-2.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => handleDomainChange('metadata')}
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-base font-medium transition cursor-pointer',
                      draft.domain === 'metadata'
                        ? 'border-[#3b82f6] bg-[#dbeafe] text-[#2563eb]'
                        : 'border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]',
                    )}
                  >
                    Metadata
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDomainChange('tracker')}
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-base font-medium transition cursor-pointer',
                      draft.domain === 'tracker'
                        ? 'border-[#3b82f6] bg-[#dbeafe] text-[#2563eb]'
                        : 'border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]',
                    )}
                  >
                    Tracker Domain
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-[#0f172a]">Object Type</label>
                <div className="relative">
                  <select
                    value={draft.objectType}
                    onChange={(event) => setDraft((current) => ({ ...current, objectType: event.target.value }))}
                    className="h-44px w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-4 pr-11 text-base text-[#334155] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#bfdbfe]"
                  >
                    {objectTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                </div>
              </div> */}

              <div>
                <label className="mb-3 block text-sm font-medium text-[#0f172a]">Period</label>
                {/* <div className="flex flex-wrap gap-2.5">
                  {periods.map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setDraft((current) => ({ ...current, period }))}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer',
                        draft.period === period
                          ? 'border-[#3b82f6] bg-[#eff6ff] text-[#2563eb]'
                          : 'border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]',
                      )}
                    >
                      {periodLabels[period]}
                    </button>
                  ))}
                </div> */}
              </div>

              {
                // draft.period === 'custom' && 
                (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0f172a]">From</label>
                      <input
                        type="date"
                        value={draft.customFrom}
                        onChange={(event) => setDraft((current) => ({ ...current, customFrom: event.target.value }))}
                        className="h-11 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 text-sm text-[#334155] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#bfdbfe]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#0f172a]">To</label>
                      <input
                        type="date"
                        value={draft.customTo}
                        onChange={(event) => setDraft((current) => ({ ...current, customTo: event.target.value }))}
                        className="h-11 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 text-sm text-[#334155] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#bfdbfe]"
                      />
                    </div>
                  </div>
                )}
            </div>

            <div className="mt-9 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={resetDraft}
                className="px-4 py-2 text-xs font-medium text-[#1e293b] transition hover:text-[#0f172a] cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="rounded-xl bg-[#2563eb] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8] cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
