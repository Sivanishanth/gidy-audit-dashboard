import { useState, useEffect } from "react";
import axios from "axios";
import LogTable from "./components/LogTable";
import Filters from "./components/Filters";
import UploadButton from "./components/UploadButton";

const API_URL = "https://gidy-audit-dashboard-koyh.onrender.com"

export default function App() {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('timestamp')
  const [sortOrder, setSortOrder] = useState('desc')
  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const params = { page, limit: 20, sortBy, sortOrder, search, ...filters }
      const res = await axios.get(`${API_URL}/api/logs`, { params })
      setLogs(res.data.logs)
      setTotal(res.data.total)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    setPage(1)
  }, [filters, search, sortBy, sortOrder])

  useEffect(() => {
    fetchLogs()
  }, [page, filters, search, sortBy, sortOrder])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">🔐 Security Audit Dashboard</h1>
          <UploadButton onUpload={fetchLogs} apiUrl={API_URL} />
        </div>
        <Filters
          filters={filters} setFilters={setFilters}
          search={search} setSearch={setSearch}
        />
        {loading ? (
          <div className="text-center py-10 text-gray-400">
            Loading logs...
          </div>
        ) : (
          <LogTable
            logs={logs} total={total} page={page}
            totalPages={totalPages} setPage={setPage}
            setSortBy={setSortBy} setSortOrder={setSortOrder}
          />
        )}
      </div>
    </div>
  )
}