const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
}

exports.getTodosById = async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.Todo(404).json({ message: 'Todo not found' });
    res.json(todo);
}

exports.createTodo = async (req, res) => {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
};

exports.updateTodo = async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Todo not found' });
    res.json(updated);
}

exports.deleteTodo = async (req, res) => {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
}