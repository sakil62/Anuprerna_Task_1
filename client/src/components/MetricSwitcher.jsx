const metrics = [
  'confirmed',
  'deaths',
  'recovered',
  'active',
  'cfr',
  'recoveryRate'
];

export default function MetricSwitcher({ metric, setMetric }) {
  const metrics = [
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'deaths', label: 'Deaths' },
    { id: 'recovered', label: 'Recovered' },
    { id: 'active', label: 'Active Cases' },
    { id: 'cfr', label: 'CFR (%)' },
    { id: 'recoveryRate', label: 'Recovery Rate (%)' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {metrics.map(m => (
        <button
          key={m.id}
          onClick={() => setMetric(m.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            metric === m.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}