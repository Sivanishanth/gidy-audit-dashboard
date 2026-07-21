const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  actor: String,
  role: String,
  action: String,
  resource: String,
  resourceType: String,
  ipAddress: String,
  region: String,
  severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
  status: { type: String, enum: ['Resolved', 'Unresolved'] },
  timestamp: { type: Date }
}, { timestamps: true });

logSchema.index({ severity: 1 });
logSchema.index({ status: 1 });
logSchema.index({ actor: 1 });
logSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Log', logSchema);