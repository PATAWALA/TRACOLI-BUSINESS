export default function QuickStats() {
  const stats = [
    { value: "5", label: "Pays desservis" },
    { value: "14", label: "Villes couvertes" },
    { value: "Guangzhou", label: "Hub principal" },
    { value: "24h", label: "Réponse max" },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-200 bg-ink-200 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white px-5 py-6 sm:px-6">
          <dd className="text-2xl leading-none font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            {s.value}
          </dd>
          <dt className="mt-2 text-sm font-semibold text-ink-700">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
