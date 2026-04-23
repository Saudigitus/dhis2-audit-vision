export interface DatasetCompletenessRow {
  datasetName: string;
  period: string;
  expected: number;
  actual: number;
  completeness: number;
}

export interface DatasetCompletenessTableProps {
  title: string;
  data: DatasetCompletenessRow[];
}

const getProgressColor = (completeness: number) => {
  if (completeness >= 90) return 'bg-[#3b82f6] text-[#3b82f6]';
  if (completeness >= 75) return 'bg-[#f59e0b] text-[#f59e0b]';
  return 'bg-[#ef4444] text-[#ef4444]';
};

export default function DatasetCompletenessTable({ title, data }: DatasetCompletenessTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e2e8f0]">
        <h3 className="font-bold text-[15px] text-[#0f172a]">{title}</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
            <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Dataset Name</th>
            <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Period</th>
            <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Expected</th>
            <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Actual</th>
            <th className="text-left px-6 py-3 font-semibold text-[#64748b] uppercase tracking-wider text-[11px]">Completeness</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {data.map((row, index) => {
            const progressColor = getProgressColor(row.completeness);
            return (
              <tr key={index}>
                <td className="px-6 py-4 font-medium text-[#0f172a]">{row.datasetName}</td>
                <td className="px-6 py-4 text-[#64748b]">{row.period}</td>
                <td className="px-6 py-4 text-[#64748b]">{row.expected}</td>
                <td className="px-6 py-4 text-[#64748b]">{row.actual}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full max-w-[100px]">
                      <div className={`h-full rounded-full ${progressColor}`} style={{ width: `${row.completeness}%` }} />
                    </div>
                    <span className={`font-bold ${progressColor}`}>{row.completeness}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
