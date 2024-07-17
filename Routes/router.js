const express = require('express')
const taskController = require('../Controllers/taskController')

const router = new express.Router();

// 1) add tasks
router.post('/addtasks',taskController.addTask)

// get all tasks
router.get('/alltasks',taskController.getAllTask)

// delete task
router.delete('/delete/:id', taskController.deleteTask);


router.get('/gettask/:id', taskController.getTaskById);


router.put('/updatetask/:id', taskController.updateTask);


module.exports = router;