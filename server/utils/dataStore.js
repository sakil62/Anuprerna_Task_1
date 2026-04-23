const { loadAll } = require('./loadData');
const { computeStateStats, safeNum } = require('./compute');

let store = null;

async function getStore() {
  if (store) return store;

  const { confirmed, deaths, recovered } = await loadAll();
  const firstRow = confirmed[0];

  // The actual state key in the CSV
  const stateKey = 'STATE/UT';

  // 1. Identify only valid date columns (e.g., '1/30/2020') using regex
  const rawKeys = Object.keys(firstRow);
  const dateKeys = rawKeys.filter(k => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(k.trim()));

  // 2. Convert CSV 'M/D/YYYY' to ISO 'YYYY-MM-DD' for correct API string comparison
  const normalizedDates = dateKeys.map(d => {
    const [m, day, y] = d.trim().split('/');
    return `${y}-${m.padStart(2, '0')}-${day.padStart(2, '0')}`;
  });

  const stateMap = {};

  for (const row of confirmed) {
    const state = row[stateKey]?.trim();
    if (!state) continue;

    // Use a loose match just in case headers have trailing spaces like in the death CSV
    const deathRow = deaths.find(r => r[stateKey]?.trim() === state) || {};
    const recRow = recovered.find(r => r[stateKey]?.trim() === state) || {};

    // Pull data using the original CSV keys, but map it against our normalized dates
    const conf = dateKeys.map(k => row[k] ?? 0);
    const death = dateKeys.map(k => deathRow[k] ?? 0);
    const rec = dateKeys.map(k => recRow[k] ?? 0);

    stateMap[state] = computeStateStats(state, normalizedDates, conf, death, rec);
  }

  store = { stateMap, dates: normalizedDates };
  return store;
}

module.exports = { getStore };