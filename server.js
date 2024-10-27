const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Serve static files from the project directory
app.use(express.static(path.join(__dirname)));

// Define Task schema and model
const taskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});
const Task = mongoose.model('Task', taskSchema);

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task({ title: req.body.title, completed: false });
    await task.save();
    res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = req.body.completed;
    await task.save();
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Endpoint to add multiple tasks from AI
app.post('/add-ai-tasks', async (req, res) => {
    const tasks = req.body.tasks; // Expecting an array of task titles
    const taskObjects = tasks.map(title => ({ title, completed: false }));
    
    // Insert all tasks into MongoDB
    await Task.insertMany(taskObjects);
    
    res.json({ message: 'AI tasks added successfully' });
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = req.body.completed;
    await task.save();
    res.json(task);
});
