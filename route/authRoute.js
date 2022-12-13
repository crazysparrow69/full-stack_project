const express = require('express');
const router = express.Router();
const { sendHtml, sendResult } = require('../controller/authController');

router.get('/', sendHtml)
      .post('/', sendResult);

module.exports = router;