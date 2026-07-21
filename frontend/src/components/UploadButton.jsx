import { useState } from 'react'
import axios from 'axios'

export default function UploadButton({ onUpload, apiUrl }) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      const logs = Array.isArray(parsed) ? parsed : parsed.logs
      setLoading(true)
      await axios.post(`${apiUrl}/api/logs/upload`, { logs })
      alert('Uploaded successfully!')
      onUpload()
    } catch (err) {
      alert('Upload failed: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
      {loading ? 'Uploading...' : '⬆ Upload Logs (JSON)'}
      <input type="file" accept=".json" onChange={handleUpload} className="hidden" />
    </label>
  )
}