import Select from 'react-select';

export default function StateSelector({ states, selectedStates, setSelectedStates }) {
  // Defensive check for empty states
  const options = (states || []).map(s => ({ label: s, value: s }));

  return (
    <div className="w-full max-w-md text-gray-900">
      <Select
        isMulti
        options={options}
        value={options.filter(o => (selectedStates || []).includes(o.value))}
        onChange={(vals) => setSelectedStates(vals ? vals.map(v => v.value) : [])}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Compare states..."
      />
    </div>
  );
}