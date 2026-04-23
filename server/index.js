const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const { getStore } = require('./utils/dataStore');
getStore().then(() => console.log('✅ Data loaded and cached'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(5000, () => console.log('🚀 API running on http://localhost:5000'));