const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const CONFIRMED_CASES_BASE = path.join(__dirname, '../data/Datasets/India Statewise Confirmed Cases');
const DEATH_CASES_BASE = path.join(__dirname, '../data/Datasets/India Statewise Death Cases');
const RECOVERY_CASES_BASE = path.join(__dirname, '../data/Datasets/India Statewise Recovery Cases');

function parseCSV(base, filename) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(path.join(base, filename))
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

async function loadAll() {
  const [confirmed, deaths, recovered] = await Promise.all([
    parseCSV(CONFIRMED_CASES_BASE, 'COVID19_INDIA_STATEWISE_TIME_SERIES_CONFIRMED.csv'),
    parseCSV(DEATH_CASES_BASE, 'COVID19_INDIA_STATEWISE_TIME_SERIES_DEATH.csv'),
    parseCSV(RECOVERY_CASES_BASE, 'COVID19_INDIA_STATEWISE_TIME_SERIES_RECOVERy.csv'),
  ]);

  return { confirmed, deaths, recovered };
}

module.exports = { loadAll };