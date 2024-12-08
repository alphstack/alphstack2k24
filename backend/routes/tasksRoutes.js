const express = require('express');
const{
    createTask,
    getTasks,
    markTaskAsDone,
    markTaskAsUndone,
    deleteTask,
    countPoints
}=require('../controllers/tasksController')

const router = express.Router();

router.post('/createTask', createTask);
router.post('/getTasks', getTasks);
router.post('/markTaskAsDone', markTaskAsDone);
router.post('/markTaskAsUndone', markTaskAsUndone);
router.post('/deleteTask', deleteTask);
router.post('/countPoints', countPoints);

module.exports = router;