const express = require('express');
const router = express.Router();
const { sendHtml, sendResult } = require('../controller/registerController');

router.get('/', sendHtml)
      .post('/', sendResult);

module.exports = router;