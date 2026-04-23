export default function RankingsTable({ rankings }) {
  if (!rankings || rankings.length === 0) return null;

  return (
    <div className="h-[400px] bg-gray-800 rounded-xl border border-gray-700 flex flex-col">

      {}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
            <th className="p-4 font-medium border-b border-gray-700">Rank</th>
            <th className="p-4 font-medium border-b border-gray-700">State</th>
            <th className="p-4 font-medium border-b border-gray-700">Value</th>
          </tr>
        </thead>
      </table>

      {}
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left border-collapse">
          <tbody className="text-gray-200">
            {rankings.map((r, i) => (
              <tr
                key={r.state}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="p-4 text-gray-500 font-medium w-[80px]">#{i + 1}</td>
                <td className="p-4 font-semibold">{r.state}</td>
                <td className="p-4">
                  {typeof r.value === 'number'
                    ? r.value.toLocaleString()
                    : r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}