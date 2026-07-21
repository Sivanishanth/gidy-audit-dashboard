const Log = require('../models/Log');

exports.bulkUpload = async (req, res) => {
  try {
    const logs = req.body.logs;
    if (!Array.isArray(logs) || logs.length === 0)
      return res.status(400).json({ message: 'No logs provided' });

    await Log.insertMany(logs, { ordered: false });
    res.status(201).json({ message: `${logs.length} logs uploaded successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      severity,
      status,
      role,
      region,
      resourceType,
      search,
      sortBy = 'timestamp',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    if (severity) query.severity = severity;
    if (status) query.status = status;
    if (role) query.role = role;
    if (region) query.region = region;
    if (resourceType) query.resourceType = resourceType;

    if (search) {
      query.$or = [
        { actor: { $regex: search, $options: 'i' } },
        { action: { $regex: search, $options: 'i' } },
        { resource: { $regex: search, $options: 'i' } },
        { ipAddress: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { region: { $regex: search, $options: 'i' } },
        { resourceType: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [logs, total] = await Promise.all([
      Log.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
      Log.countDocuments(query)
    ]);

    res.json({
      logs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};