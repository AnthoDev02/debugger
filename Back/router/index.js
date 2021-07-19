const express = require('express');
const urlController = require('../controller/urlController');
const jsonController = require('../controller/jsonController')

const router = express.Router();

router.post('/', urlController.getHeadersByUrl);
router.get('/airport', jsonController.getAirport);

module.exports = router;