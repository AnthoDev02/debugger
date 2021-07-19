const express = require('express');
const urlController = require('../controller/urlController')

const router = express.Router();

router.post('/', urlController.getHeadersByUrl);

module.exports = router;