import React from 'react';
import Select from 'react-select';

export default function DateRangeFilter({ dateRange, setDateRange }) {
  return (
    <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-xl border border-gray-700 w-fit shadow-sm">
      <div className="flex flex-col">
        <label className="text-xs text-gray-400 mb-1 font-medium">From</label>
        <input
          type="date"
          value={dateRange?.from || ''}
          onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
          className="bg-gray-900 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-400 mb-1 font-medium">To</label>
        <input
          type="date"
          value={dateRange?.to || ''}
          onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
          className="bg-gray-900 text-white border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}