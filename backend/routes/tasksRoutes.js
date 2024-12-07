const express = require('express');
const{
    createTask,
    getTasks,
    markTaskAsDone,
    markTaskAsUndone,
    deleteTask
}=require('../controllers/tasksController')

const router = express.Router();

router.post('/createTask', createTask);
router.post('/getTasks', getTasks);
router.post('/markTaskAsDone', markTaskAsDone);
router.post('/markTaskAsUndone', markTaskAsUndone);
router.post('/deleteTask', deleteTask);

module.exports = router;