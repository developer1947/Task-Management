import express from "express";
import { createTask, deleteTask, getTaskDetailById, getTasks, updateTask } from "../controller/task.controller.js";


const router = express.Router();

router.post('/createtask',createTask);
router.get('/gettask',getTasks);
router.get('/gettaskbyid/:id',getTaskDetailById);
router.put('/updatetask',updateTask);
router.delete('/deletetask/:id',deleteTask);

export default router;