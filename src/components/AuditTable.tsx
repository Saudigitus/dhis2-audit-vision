import type { ReactNode } from 'react';

export interface AuditTableColumn<T> {
  header: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => ReactNode;
}

export interface AuditTableProps<T> {
  title: string;
  data: T[];
  columns: AuditTableColumn<T>[];
  actions?: ReactNode;
}

export default function AuditTable<T>({ title, data, columns, actions }: AuditTableProps<T>) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
        <h3 className="font-bold text-[15px] text-[#0f172a]">{title}</h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`text-left px-6 py-3 text-[11px] font-semibold tracking-wider text-[#64748b] uppercase ${column.headerClassName ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]">
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className={column.cellClassName ?? 'px-6 py-3.5'}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
