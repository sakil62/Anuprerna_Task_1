import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { computeMetrics } from '../utils/metrics';

export default function ComparisonChart({ data, metric }) {
  const processed = (data || []).map(s => {
    const cleanSeries = (s.series || [])
      .filter(Boolean)
      .map(computeMetrics);

    return { ...s, series: cleanSeries };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        {processed.map(state => (
          <Line
            key={state.state}
            data={state.series}
            dataKey={metric}
            name={state.state}
            dot={false}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}