export default function Filters({ filters, setFilters, search, setSearch }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => {
      const updated = { ...prev }
      if (value === '') {
        delete updated[name]
      } else {
        updated[name] = value
      }
      return updated
    })
  }

  const handleClear = () => {
    setFilters({})
    setSearch('')
  }

  const selectClass = "bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border border-gray-700 focus:outline-none"

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border border-gray-700 focus:outline-none w-48"
      />
      <select name="severity" value={filters.severity || ''} onChange={handleChange} className={selectClass}>
        <option value="">All Severity</option>
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
        <option>CRITICAL</option>
      </select>
      <select name="status" value={filters.status || ''} onChange={handleChange} className={selectClass}>
        <option value="">All Status</option>
        <option>Resolved</option>
        <option>Unresolved</option>
      </select>
      <select name="role" value={filters.role || ''} onChange={handleChange} className={selectClass}>
        <option value="">All Roles</option>
        <option>admin</option>
        <option>engineer</option>
        <option>viewer</option>
      </select>
      <select name="region" value={filters.region || ''} onChange={handleChange} className={selectClass}>
        <option value="">All Regions</option>
        <option>ap-south-1</option>
        <option>us-east-1</option>
        <option>eu-west-1</option>
      </select>
      <button
        onClick={handleClear}
        className="bg-red-700 hover:bg-red-800 text-white text-sm px-3 py-2 rounded-lg"
      >
        Clear All
      </button>
    </div>
  )
}