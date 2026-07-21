import { useState } from 'react'

export default function LogTable({ logs, total, page, totalPages, setPage, setSortBy, setSortOrder }) {
  const [activeSortBy, setActiveSortBy] = useState('timestamp')
  const [activeSortOrder, setActiveSortOrder] = useState('desc')

  const severityColor = {
    LOW: 'bg-green-800 text-green-200',
    MEDIUM: 'bg-yellow-800 text-yellow-200',
    HIGH: 'bg-orange-800 text-orange-200',
    CRITICAL: 'bg-red-800 text-red-200'
  }

  const handleSort = (field) => {
    const newOrder = activeSortBy === field && activeSortOrder === 'asc' ? 'desc' : 'asc'
    setActiveSortBy(field)
    setActiveSortOrder(newOrder)
    setSortBy(field)
    setSortOrder(newOrder)
  }

  const SortIcon = ({ field }) => {
    if (activeSortBy !== field) return <span className="text-gray-600 ml-1">↕</span>
    return <span className="text-blue-400 ml-1">{activeSortOrder === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div>
      <p className="text-gray-400 text-sm mb-3">Total: {total} logs</p>
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('actor')}>
                Actor <SortIcon field="actor" />
              </th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('action')}>
                Action <SortIcon field="action" />
              </th>
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('severity')}>
                Severity <SortIcon field="severity" />
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('status')}>
                Status <SortIcon field="status" />
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('timestamp')}>
                Timestamp <SortIcon field="timestamp" />
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-10 text-gray-500">No logs found</td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log._id} className="border-t border-gray-800 hover:bg-gray-950">
                  <td className="px-4 py-3 text-blue-400">{log.actor}</td>
                  <td className="px-4 py-3 text-gray-300">{log.role}</td>
                  <td className="px-4 py-3 text-yellow-400">{log.action}</td>
                  <td className="px-4 py-3 text-gray-400">{log.resource}</td>
                  <td className="px-4 py-3 text-gray-400">{log.ipAddress}</td>
                  <td className="px-4 py-3 text-gray-400">{log.region}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${severityColor[log.severity]}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${log.status === 'Resolved' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-700"
        >← Prev</button>
        <span className="text-gray-400 text-sm">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-700"
        >Next →</button>
      </div>
    </div>
  )
}