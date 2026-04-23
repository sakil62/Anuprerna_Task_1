import { computeDaily } from '../utils/metrics';

export default function InsightsPanel({ data, national }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(state => {
        const series = state.series || [];
        if (!series.length) return null;

        const daily = computeDaily(series);
        if (!daily || !daily.length) return null;

        // Find the peak day cleanly
        const peak = daily.reduce((max, d) => 
          (d.dailyConfirmed || 0) > (max.dailyConfirmed || 0) ? d : max, daily[0]);

        const latest = daily[daily.length - 1];
        
        const confirmed = latest.confirmed || 0;
        const cfr = confirmed > 0 ? (latest.deaths || 0) / confirmed : 0;
        const rr = confirmed > 0 ? (latest.recovered || 0) / confirmed : 0;
        
        const nationalCFR = national?.cfr || 0;
        const nationalRR = national?.recoveryRate || 0;

        return (
          <div key={state.state} className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-sm">
            <h4 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">{state.state} Insights</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center">
                <span className="text-gray-400">Peak Daily Cases</span>
                <div className="text-right">
                  <span className="block text-white font-medium">{peak.dailyConfirmed?.toLocaleString() || 0}</span>
                  <span className="block text-xs text-gray-500">{peak.date}</span>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-400">Fatality vs National</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${cfr > nationalCFR ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                  {cfr > nationalCFR ? 'Higher' : 'Lower'}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-400">Recovery vs National</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${rr > nationalRR ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {rr > nationalRR ? 'Higher' : 'Lower'}
                </span>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}