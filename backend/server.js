const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { MongoMemoryServer } = require('mongodb-memory-server')

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/logs', require('./routes/logs'))

const PORT = 5000

async function startServer() {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  
  await mongoose.connect(uri)
  console.log('MongoDB Memory Server connected')
  
  app.listen(PORT, () => console.log('Server running on port ' + PORT))
}

startServer()