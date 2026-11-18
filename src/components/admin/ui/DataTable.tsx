"use client";


export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "Aucune donnée.",
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
        <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3.5 text-[11px] font-bold tracking-wider text-ink-400 uppercase"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-16 text-center text-sm text-ink-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} onClick={() => onRowClick?.(row)} className={`${`border-b border-ink-100 transition-colors last:border-0 ${
                    onRowClick
                      ? "cursor-pointer hover:bg-tracoli-50/40"
                      : "hover:bg-ink-50/50"
                  }`} anim-in`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {data.length === 0 ? (
          <div className="rounded-2xl border border-ink-200 bg-white px-5 py-16 text-center text-sm text-ink-400">
            {emptyMessage}
          </div>
        ) : (
          data.map((row, i) => (
            <div key={i} onClick={() => onRowClick?.(row)} className={`${`rounded-2xl border border-ink-200 bg-white p-4 shadow-sm ${
                onRowClick ? "cursor-pointer active:bg-ink-50" : ""
              }`} anim-in`}>
              <div className="space-y-2">
                {columns
                  .filter((col) => !col.hideOnMobile)
                  .map((col) => (
                    <div
                      key={col.key}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">
                        {col.label}
                      </span>
                      <span className="text-right text-sm">{col.render(row)}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
