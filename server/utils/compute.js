const _ = require('lodash');

// Parse value safely (handle nulls, empty, "-")
function safeNum(val) {
  const n = Number(val);
  return isNaN(n) || val === '' || val === '-' ? 0 : n;
}

function toDailySeries(cumulativeArr) {
  return cumulativeArr.map((val, i) =>
    i === 0 ? safeNum(val) : Math.max(0, safeNum(val) - safeNum(cumulativeArr[i - 1]))
  );
}

function movingAverage(arr, window = 7) {
  return arr.map((_, i) => {
    const slice = arr.slice(Math.max(0, i - window + 1), i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

function peakDay(dates, dailyArr) {
  const maxIdx = dailyArr.indexOf(Math.max(...dailyArr));
  return { date: dates[maxIdx], value: dailyArr[maxIdx] };
}

function peakWeek(dates, dailyArr) {
  const weeks = {};
  dates.forEach((d, i) => {
    const date = new Date(d);
    const weekKey = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
    weeks[weekKey] = (weeks[weekKey] || 0) + dailyArr[i];
  });
  const maxEntry = Object.entries(weeks).sort((a, b) => b[1] - a[1])[0];
  return { week: maxEntry?.[0], value: maxEntry?.[1] };
}

function fastestGrowthPeriod(dates, dailyArr) {
  let maxGrowth = 0, startIdx = 0;
  for (let i = 6; i < dailyArr.length; i++) {
    const windowSum = dailyArr.slice(i - 6, i + 1).reduce((a, b) => a + b, 0);
    if (windowSum > maxGrowth) { maxGrowth = windowSum; startIdx = i - 6; }
  }
  return { start: dates[startIdx], end: dates[startIdx + 6], totalCases: maxGrowth };
}

function computeStateStats(state, dates, conf, death, rec) {
  const dailyConf = toDailySeries(conf);
  const dailyDeath = toDailySeries(death);
  const dailyRec = toDailySeries(rec);

  const timeseries = dates.map((date, i) => {
    const c = safeNum(conf[i]), d = safeNum(death[i]), r = safeNum(rec[i]);
    return {
      date,
      confirmed: c,
      deaths: d,
      recovered: r,
      active: Math.max(0, c - r - d),
      dailyConfirmed: dailyConf[i],
      dailyDeaths: dailyDeath[i],
      dailyRecovered: dailyRec[i],
      recoveryRate: c > 0 ? +(r / c).toFixed(4) : 0,
      cfr: c > 0 ? +(d / c).toFixed(4) : 0,
    };
  });

  const ma7 = movingAverage(dailyConf);
  timeseries.forEach((t, i) => { t.ma7 = +ma7[i].toFixed(2); });

  const totalConf = safeNum(conf[conf.length - 1]);
  const totalDeath = safeNum(death[death.length - 1]);
  const totalRec = safeNum(rec[rec.length - 1]);

  return {
    state,
    timeseries,
    summary: {
      totalConfirmed: totalConf,
      totalDeaths: totalDeath,
      totalRecovered: totalRec,
      activeNow: Math.max(0, totalConf - totalRec - totalDeath),
      recoveryRate: totalConf > 0 ? +(totalRec / totalConf).toFixed(4) : 0,
      cfr: totalConf > 0 ? +(totalDeath / totalConf).toFixed(4) : 0,
    },
    insights: {
      peakDay: peakDay(dates, dailyConf),
      peakWeek: peakWeek(dates, dailyConf),
      fastestGrowth: fastestGrowthPeriod(dates, dailyConf),
    },
  };
}

module.exports = { computeStateStats, safeNum };