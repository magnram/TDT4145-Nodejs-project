const express = require('express');
const router = express.Router();
var controller = require("../controller/appController");

//Definerer /group
router.route('/groups')
.get(controller.list_all_groups)
.post(controller.create_a_group)

router.route('/workouts/:amount/:page/')
.get(controller.list_n_last_workouts)
.post(controller.update_a_workout)
.put(controller.update_a_workout)
// .delete(controller.delete_a_task)

/*
router.route('/tasks/:taskId')
.get(todoList.read_a_task)
.put(todoList.update_a_task)
.delete(todoList.delete_a_task);
*/

//Exports
module.exports = router;
