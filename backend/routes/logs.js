const express = require('express');
const router = express.Router();
const { bulkUpload, getLogs } = require('../controllers/logController');

router.post('/upload', bulkUpload);
router.get('/', getLogs);

module.exports = router;