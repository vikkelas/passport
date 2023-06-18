const express = require('express');
const router = express.Router();
const api = require('./api')
router.use('/user', api);
module.exports = router;