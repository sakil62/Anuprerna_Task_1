# 🇮🇳 COVID-19 India Insights Dashboard

A full-stack data analytics dashboard that visualizes COVID-19 trends across Indian states using real-world time-series datasets. The application processes raw CSV data, computes meaningful metrics, and presents insights through an interactive and responsive UI.

---

## 📌 Overview

This project enables users to explore COVID-19 data across India with dynamic filters, comparative visualizations, and calculated insights such as active cases, recovery rate, and growth trends.

The system is designed to handle inconsistent datasets and transform them into reliable, structured information for analysis.

---

## 🚀 Features

### 🔍 Data Exploration

* State selection (single and multi-state comparison)
* Date range filtering
* Metric selection (Confirmed, Deaths, Recovered, Active)

### 📊 Visualization

* Time-series trend charts
* Multi-state comparison charts
* Moving average analysis (7-day smoothing)

### 📈 Insights Panel

* Peak day and peak week detection
* Fastest growth period identification
* State rankings based on selected metrics
* National summary overview

### ⚙️ Data Handling

* CSV parsing and normalization
* Missing value handling
* Consistent time-series alignment

---

## 🧮 Key Metrics

* Daily New Cases
* Daily Deaths
* Daily Recoveries

**Active Cases**

```
Active = Confirmed − Recovered − Deaths
```

**Recovery Rate**

```
Recovery Rate = Recovered / Confirmed
```

**Case Fatality Ratio (CFR)**

```
CFR = Deaths / Confirmed
```

* 7-Day Moving Average
* Peak Day / Peak Week
* Growth Trends

---

## 🗂️ Dataset

Source:
University of Kalyani COVID-19 Dataset
https://github.com/kalyaniuniversity/COVID-19-Datasets

### Files Used

* Confirmed Cases
* Death Cases
* Recovered Cases

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Recharts / Chart.js
* Tailwind CSS (or standard CSS)

### Backend

* Node.js
* Express.js
* CSV parsing (csv-parser)

---

## 📁 Project Structure

### Frontend

```
client/
├── public/
├── src/
│   ├── api/
│   │   └── client.js
│   ├── assets/
│   ├── components/
│   │   ├── ComparisonChart.jsx
│   │   ├── DateRangeFilter.jsx
│   │   ├── InsightsPanel.jsx
│   │   ├── MetricSwitcher.jsx
│   │   ├── MovingAverageChart.jsx
│   │   ├── NationalSummary.jsx
│   │   ├── RankingsTable.jsx
│   │   ├── StateSelector.jsx
│   │   └── SummaryCards.jsx
│   ├── hooks/
│   │   └── useDashboard.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── utils/
│   │   └── metrics.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

### Backend

```
server/
├── data/
│   └── Datasets/
│       ├── India Statewise Confirmed Cases/
│       ├── India Statewise Death Cases/
│       └── India Statewise Recovered Cases/
├── routes/
│   └── api.js
├── utils/
│   └── dataLoader.js
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 📦 Setup Instructions

### Frontend

```
cd client
npm install
npm run dev
```

---

### Backend

```
cd server
npm install
npm start
```

If using nodemon or a development script:

```
npm run dev
```

---

## 🔄 Data Flow

1. Backend reads CSV datasets and processes them into structured JSON.
2. APIs expose processed data to the frontend.
3. Frontend fetches data via API client.
4. Custom hooks manage state and transformations.
5. Components render charts, summaries, and insights dynamically.

---

## ⚠️ Challenges

* Handling inconsistent and missing dataset values
* Aligning time-series data across multiple states
* Efficient computation of derived metrics
* Maintaining performance with large datasets

---