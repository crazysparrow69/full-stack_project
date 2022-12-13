const express = require('express');
const router = express.Router();
const refreshAccessToken = require('../controller/refreshController');

router.get('/', refreshAccessToken);

module.exports = router;