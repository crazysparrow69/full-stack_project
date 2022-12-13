const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const { sendHtml, verificate, createNewNote } = require('../controller/rootController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/', sendHtml)
      .post('/', verificate)
      .put('/', verifyJWT, createNewNote);

module.exports = router;