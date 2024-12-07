const express = require('express');
const{
    createTask,
    getTasks,
}=require('../controllers/tasksController')

const router = express.Router();

router.post('/createTask', createTask);
router.post('/getTasks', getTasks);

module.exports = router;