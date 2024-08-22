import express from "express";
import { createTodo,getTodo,updateTodo,deleteTodo, getTodoById} from '../controller/todo.js'
import {checkTodo,checkToken} from '../utils/checkToken.js'

const router = express.Router()

router.post('/create',checkToken,createTodo)
router.get('/create',checkToken,getTodo)
router.put('/update/:id',checkTodo,updateTodo)
router.delete('/update/:id',checkTodo,deleteTodo)
// router.put('/updateUser',checkToken,updateUserTodo)
router.get('/create/:id',checkToken,getTodoById)

export default router