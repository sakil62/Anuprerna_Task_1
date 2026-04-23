const router = require('express').Router();
const { getStore } = require('../utils/dataStore');

/* -------------------- STATES -------------------- */
router.get('/states', async (req, res) => {
  const { stateMap } = await getStore();
  res.json(Object.keys(stateMap).sort());
});

/* -------------------- DATES -------------------- */
router.get('/dates', async (req, res) => {
  const { dates } = await getStore();
  res.json({
    first: dates[0],
    last: dates[dates.length - 1],
    total: dates.length
  });
});

/* -------------------- SINGLE STATE -------------------- */
router.get('/state/:name', async (req, res) => {
  const { stateMap } = await getStore();
  const state = decodeURIComponent(req.params.name);

  const data = stateMap[state];
  if (!data) {
    return res.status(404).json({ error: 'State not found' });
  }

  let series = data.timeseries;
  const { from, to } = req.query;

  // Now properly compares YYYY-MM-DD formats
  if (from || to) {
    series = series.filter(t => 
      (!from || t.date >= from) && 
      (!to || t.date <= to)
    );
  }

  res.json({
    state,
    summary: {
      confirmed: data.summary.totalConfirmed,
      deaths: data.summary.totalDeaths,
      recovered: data.summary.totalRecovered,
      active: data.summary.activeNow
    },
    insights: data.insights,
    series
  });
});

/* -------------------- COMPARE STATES -------------------- */
router.get('/compare', async (req, res) => {
  const { stateMap } = await getStore();

  const stateNames = (req.query.states || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const { from, to } = req.query;

  const result = stateNames.map(name => {
    const data = stateMap[name];

    if (!data) {
      return {
        state: name,
        summary: {},
        insights: {},
        series: []
      };
    }

    let series = data.timeseries;

    if (from || to) {
      series = series.filter(t => 
        (!from || t.date >= from) && 
        (!to || t.date <= to)
      );
    }

    return {
      state: name,
      summary: {
        confirmed: data.summary.totalConfirmed,
        deaths: data.summary.totalDeaths,
        recovered: data.summary.totalRecovered,
        active: data.summary.activeNow
      },
      insights: data.insights,
      series
    };
  });

  res.json(result);
});

/* -------------------- RANKINGS -------------------- */
router.get('/rankings', async (req, res) => {
  const { stateMap } = await getStore();
  const { metric = 'totalConfirmed', limit = 10 } = req.query;

  const rankings = Object.values(stateMap)
    .map(d => ({
      state: d.state,
      value: d.summary[metric] ?? 0
    }))
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, Number(limit));

  res.json(rankings);
});

/* -------------------- NATIONAL SUMMARY -------------------- */
router.get('/insights/summary', async (req, res) => {
  const { stateMap } = await getStore();
  const all = Object.values(stateMap);

  const national = all.reduce((acc, d) => {
    acc.confirmed += d.summary.totalConfirmed || 0;
    acc.deaths += d.summary.totalDeaths || 0;
    acc.recovered += d.summary.totalRecovered || 0;
    acc.active += d.summary.activeNow || 0;
    return acc;
  }, {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    active: 0
  });

  national.recoveryRate = national.confirmed > 0 
    ? +(national.recovered / national.confirmed).toFixed(4) 
    : 0;

  national.cfr = national.confirmed > 0 
    ? +(national.deaths / national.confirmed).toFixed(4) 
    : 0;

  const topStates = all
    .sort((a, b) => (b.summary.totalConfirmed || 0) - (a.summary.totalConfirmed || 0))
    .slice(0, 5)
    .map(d => ({
      state: d.state,
      confirmed: d.summary.totalConfirmed,
      deaths: d.summary.totalDeaths,
      recovered: d.summary.totalRecovered,
      active: d.summary.activeNow
    }));

  res.json({
    ...national, 
    topStates
  });
});

module.exports = router;