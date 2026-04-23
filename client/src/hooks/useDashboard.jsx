import { useState, useEffect } from 'react';
import { getStates, getDates, compareStates, getNationalSummary, getRankings } from '../api/client';

export function useDashboard() {
  const [states, setStates] = useState([]);
  const [dates, setDates] = useState({});
  const [selectedStates, setSelectedStates] = useState([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [metric, setMetric] = useState('confirmed');
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([getStates(), getDates(), getNationalSummary()])
      .then(([s, d, nat]) => {
        setStates(s);
        setDates(d);
        setDateRange({ from: d.first, to: d.last });
        setSummary(nat);
        setSelectedStates([s[0]]);
      });
  }, []);

  useEffect(() => {
    if (!selectedStates.length) return;
    setLoading(true);
    compareStates(selectedStates, dateRange.from, dateRange.to)
      .then(setData)
      .finally(() => setLoading(false));
  }, [selectedStates, dateRange]);

  useEffect(() => {
    getRankings(metric === 'confirmed' ? 'totalConfirmed'
      : metric === 'deaths' ? 'totalDeaths' : 'totalRecovered')
      .then(setRankings);
  }, [metric]);

  return { states, dates, selectedStates, setSelectedStates, dateRange, setDateRange,
           metric, setMetric, data, summary, rankings, loading };
}