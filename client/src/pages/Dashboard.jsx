import { useDashboard } from '../hooks/useDashboard';

import StateSelector from '../components/StateSelector';
import DateRangeFilter from '../components/DateRangeFilter';
import MetricSwitcher from '../components/MetricSwitcher';
import ComparisonChart from '../components/ComparisonChart';
import SummaryCards from '../components/SummaryCards';
import InsightsPanel from '../components/InsightsPanel';
import RankingsTable from '../components/RankingsTable';

export default function Dashboard() {
  const d = useDashboard();

  if (!d.states.length) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <StateSelector
        states={d.states}
        selectedStates={d.selectedStates}
        setSelectedStates={d.setSelectedStates}
      />

      <DateRangeFilter
        dateRange={d.dateRange}
        setDateRange={d.setDateRange}
      />

      <MetricSwitcher
        metric={d.metric}
        setMetric={d.setMetric}
      />

      {d.loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <SummaryCards data={d.data} />
          <ComparisonChart data={d.data} metric={d.metric} />
          <InsightsPanel data={d.data} national={d.summary} />
          <RankingsTable rankings={d.rankings} />
        </>
      )}
    </div>
  );
}