import { useDashboard } from "./hooks/useDashboard";

import NationalSummary from "./components/NationalSummary";
import StateSelector from "./components/StateSelector";
import DateRangeFilter from "./components/DateRangeFilter";
import MetricSwitcher from "./components/MetricSwitcher";
import ComparisonChart from "./components/ComparisonChart";
import SummaryCards from "./components/SummaryCards";
import InsightsPanel from "./components/InsightsPanel";
import RankingsTable from "./components/RankingsTable";

export default function App() {
  const dash = useDashboard();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-10">

      {}
      <h1 className="text-3xl font-bold text-emerald-400">
        🇮🇳 COVID-19 India Dashboard
      </h1>

      {}
      {dash.summary && <NationalSummary data={dash.summary} />}

      {}
      <div className="flex flex-wrap gap-4">
        <StateSelector
          states={dash.states}
          selectedStates={dash.selectedStates}
          setSelectedStates={dash.setSelectedStates}
        />

        <DateRangeFilter
          dateRange={dash.dateRange}
          setDateRange={dash.setDateRange}
        />

        <MetricSwitcher
          metric={dash.metric}
          setMetric={dash.setMetric}
        />
      </div>

      {}
      <main className="space-y-10">

        {}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {}
          <div className="lg:col-span-3 bg-gray-900/50 border border-gray-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Trend Comparison:
                <span className="text-emerald-400 ml-2">
                  {dash.metric}
                </span>
              </h3>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {!dash.loading && dash.data.length > 0 ? (
              <div className="h-[400px]">
                <ComparisonChart
                  data={dash.data}
                  metric={dash.metric}
                />
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-gray-800 rounded-2xl text-gray-600">
                Select states to generate comparison chart
              </div>
            )}

          </div>

          {/* Rankings */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">
              Leaderboard
            </h3>

            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
              <RankingsTable rankings={dash.rankings} />
            </div>
          </div>

        </section>

        {/* Detailed Section */}
        {!dash.loading && dash.data.length > 0 && (
          <section className="space-y-8">

            {/* Summary Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  State Snapshots
                </h3>
                <div className="h-px flex-1 bg-gray-800" />
              </div>

              <SummaryCards data={dash.data} />
            </div>

            {/* Insights */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Pattern Analysis
                </h3>
                <div className="h-px flex-1 bg-gray-800" />
              </div>

              <InsightsPanel
                data={dash.data}
                national={dash.summary}
              />
            </div>

          </section>
        )}

      </main>
    </div>
  );
}