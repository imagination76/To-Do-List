const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a To-Do App', completed: false }
];

// Get all tasks




app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.status(200).json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).send('Task title is required');
  
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed || false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  
  const { title, completed } = req.body;
  if (title) task.title = title;
  if (completed !== undefined) task.completed = completed;
  
  res.status(200).json(task);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');
  
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port, () => {
  console.log(`To-Do List API running at http://localhost:${port}`);
});
