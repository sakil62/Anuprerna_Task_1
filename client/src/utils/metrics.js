export const computeMetrics = (row = {}) => {
  const confirmed = row.confirmed || 0;
  const deaths = row.deaths || 0;
  const recovered = row.recovered || 0;

  return {
    ...row,
    confirmed,
    deaths,
    recovered,
    active: confirmed - deaths - recovered,
    recoveryRate: confirmed ? recovered / confirmed : 0,
    cfr: confirmed ? deaths / confirmed : 0
  };
};

export const computeDaily = (data = []) => {
  return data.map((curr, i) => {
    if (i === 0) return { ...curr, dailyConfirmed: 0 };

    const prev = data[i - 1];

    return {
      ...curr,
      dailyConfirmed: (curr.confirmed || 0) - (prev.confirmed || 0)
    };
  });
};

export const movingAverage = (data = [], key, window = 7) => {
  return data.map((_, i, arr) => {
    const slice = arr.slice(Math.max(0, i - window + 1), i + 1);
    return slice.reduce((s, d) => s + (d[key] || 0), 0) / slice.length;
  });
};