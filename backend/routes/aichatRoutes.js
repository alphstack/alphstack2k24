const express = require('express');
const {
    sendNewMessage,
    filterByDate
}=require('../controllers/aichatController')

const router = express.Router();

router.post('/sendNewMessage', sendNewMessage);
router.post('/filterByDate', filterByDate);

module.exports = router;