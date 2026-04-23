import { computeMetrics } from '../utils/metrics';

export default function SummaryCards({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 italic p-4">Select states to view summaries.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map(state => {
        const series = state.series || [];
        const latest = series.length > 0 ? series[series.length - 1] : {};
        const confirmed = latest.confirmed || 0;
        const deaths = latest.deaths || 0;
        const recovered = latest.recovered || 0;
        
        const active = Math.max(0, confirmed - recovered - deaths); 
        const cfr = confirmed > 0 ? (deaths / confirmed) : 0;
        const recoveryRate = confirmed > 0 ? (recovered / confirmed) : 0;

        return (
          <div key={state.state} className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg">
            <h4 className="text-xl font-bold text-white mb-4">{state.state}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Confirmed</span>
                <span className="text-xl font-semibold text-white">{confirmed.toLocaleString()}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Active</span>
                <span className="text-xl font-semibold text-yellow-400">{active.toLocaleString()}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Recovered</span>
                <span className="text-xl font-semibold text-green-400">{recovered.toLocaleString()}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Deaths</span>
                <span className="text-xl font-semibold text-red-400">{deaths.toLocaleString()}</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Recovery Rate</span>
                <span className="text-lg font-semibold text-blue-400">{(recoveryRate * 100).toFixed(1)}%</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="block text-gray-400 text-xs uppercase tracking-wider">Fatality (CFR)</span>
                <span className="text-lg font-semibold text-purple-400">{(cfr * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}