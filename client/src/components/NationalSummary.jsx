import { computeMetrics } from '../utils/metrics';

export default function NationalSummary({ data }) {
  const m = computeMetrics(data || {});

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card title="Confirmed" value={m.confirmed} />
      <Card title="Deaths" value={m.deaths} />
      <Card title="Recovered" value={m.recovered} />
      <Card title="Active" value={m.active} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-bold">{value ?? 0}</p>
    </div>
  );
}