import {
  BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { computeDaily, movingAverage } from '../utils/metrics';

export default function MovingAverageChart({ series }) {
  const daily = computeDaily(series);

  const ma = movingAverage(daily, 'dailyConfirmed');

  const final = daily.map((d, i) => ({
    ...d,
    ma: ma[i]
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={final}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="dailyConfirmed" />
        <Line dataKey="ma" />
      </BarChart>
    </ResponsiveContainer>
  );
}