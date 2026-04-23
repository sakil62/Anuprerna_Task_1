import axios from 'axios';

const api = axios.create({
  // Ensure this matches your server port
  baseURL: 'https://anuprerna-task-1-7kfz.vercel.app/api'
});

/**
 * Universal handler to extract data or log detailed errors
 */
const handle = async (req) => {
  try {
    const res = await req;
    return res.data;
  } catch (err) {
    const errorMsg = err?.response?.data?.error || err.message;
    console.error('API Error:', errorMsg);
    throw new Error(errorMsg);
  }
};

export const getStates = () => handle(api.get('/states'));

export const getDates = () => handle(api.get('/dates'));

/**
 * Fetches data for a single state. 
 * Note: 'from' and 'to' should be in YYYY-MM-DD format (standard for <input type="date">)
 */
export const getState = (name, from, to) =>
  handle(api.get(`/state/${encodeURIComponent(name)}`, { params: { from, to } }));

/**
 * Fetches comparison data for multiple states.
 */
export const compareStates = (states, from, to) => {
  if (!states || states.length === 0) return Promise.resolve([]);

  return handle(api.get('/compare', {
    params: { 
      states: states.join(','), 
      from, 
      to 
    }
  }));
};

const metricMap = {
  confirmed: 'totalConfirmed',
  deaths: 'totalDeaths',
  recovered: 'totalRecovered',
  active: 'activeNow',
  cfr: 'cfr',
  recoveryRate: 'recoveryRate'
};

export const getRankings = (metric = 'confirmed', limit = 10) => {
  const backendMetric = metricMap[metric] || metric;
  
  return handle(api.get('/rankings', {
    params: { 
      metric: backendMetric, 
      limit 
    }
  }));
};

export const getNationalSummary = () =>
  handle(api.get('/insights/summary'));