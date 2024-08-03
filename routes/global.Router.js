const express = require('express')
const router = express.Router()

const {
    ConnTest
} = require ('../controllers/global.Controller');

router.get('/',ConnTest);

module.exports = router;