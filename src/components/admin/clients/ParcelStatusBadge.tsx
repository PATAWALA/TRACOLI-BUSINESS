import { statusInfo } from "@/lib/parcels";

export default function ParcelStatusBadge({ status }: { status: string }) {
  const s = statusInfo(status);
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold ${s.badge}`}
    >
      {s.label}
    </span>
  );
}
