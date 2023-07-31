const Todo = require('../models/todo')
const User = require("../models/user")
const { z } = require("zod")
const JSONAPISerializer = require('jsonapi-serializer').Serializer
require("dotenv").config()
const getCurrentUser = require("../utils/currentUser")

const serializeTodo = (todo) => {
    return {
        _id: todo._id,
        title: todo.title,
        body: todo.body,
        completedStatus: todo.completedStatus
    }
}

const index = async (req, res) => {
    
    try {
        const _id = getCurrentUser(req)

        const todos = await User.findById(_id).populate('todoList')

        const serializedTodos =  todos.todoList.map((todo) => {
            return {
                _id: todo._id,
                title: todo.title,
                body: todo.body,
                completedStatus: todo.completedStatus
            }
        })
        
        res.json( { todos: serializedTodos } ).status(200)
    }
    catch(err){
        res.status(422).json({ message: err.message, stack: err.stack })
    }
}

const createTodoParams = z.strictObject({
    todo : z.strictObject({
        title: z.string().min(1).max(100),
        body: z.string().min(1).max(100),
        completedStatus: z.boolean().optional()
    })
})

const create = async (req, res) => {
    try{
        const id = getCurrentUser(req);
        const user = await User.findById(id)
        const sanitizeParams = createTodoParams.safeParse(req.body)
        
        if(!sanitizeParams.success) return res.json({ error: sanitizeParams.error }).status(422)
    

        const todo = await Todo.create({ ...sanitizeParams.data.todo, user: id })
        // const temp = await User.findByIdAndUpdate(
        //     id,
        //     { $push: { todoList: todo._id } },
        //     { new: true, useFindAndModify: false }
        // )
        user.todoList.push(todo._id)
        await user.save()

        const serializedTodo = serializeTodo(todo)

        res.status(201).json({todo: serializedTodo})
    }
    catch(err){
        res.status(422).json( { message: err.message, stack: err.stack } )
    }
}

const show = async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id)

        const serializedTodo = serializeTodo(todo)

        res.json( { todo: serializedTodo } ).status(200)
    }
    catch(err){
        res.status(422).json( { message: err.message, stack: err.stack })
    }
}

const updateTodoParams = z.strictObject({
    todo : z.strictObject({
        title: z.string().min(1).max(50).optional(),
        body: z.string().min(1).max(100).optional(),
        completedStatus: z.boolean().optional()
    })
})

const update = async (req, res) => {
    try{
        const sanitizeParams = updateTodoParams.safeParse(req.body)
        
        if(!sanitizeParams.success) return res.json({ error: sanitizeParams.error }).status(422)

        const todo = await Todo.findByIdAndUpdate(req.params.id, {...sanitizeParams.data.todo}, {new: true})
        res.status(200).json({ status: todo})
    }
    catch(err){
        res.status(422).json({ message: err.message, stack: err.stack })
    }
}

const destroy = async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: "Successfully deleted" })
    }
    catch(err){
        res.status(422).json({ message: err.message, stack: err.stack })
    }
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy
}
