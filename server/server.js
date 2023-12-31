
import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import config from './config.json' assert { type: 'json' };
import Todo from "./models/Todo.js";

const app = express();
app.use(express.json());
app.use(cors());

// Database configuration
const uri = config.database.uri;
const connectToDatabase = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB Atlas');

    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
    }
};

connectToDatabase();
// get all todos
app.get('/todos', async (req, res) => {
    const todoList = await Todo.find();
    res.json(todoList);
});

// create new todo
app.post('/todo/new', async (req, res) => {
  const text = req.body.text;
  if (!text || text.trim()===''){
    return res.status(400).json({error:'Text field is empty.'})
  }
  try {
    const todo = new Todo({
        text,
    });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error:' An error occured when saving the todo'});
  }
});

// delete todo
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

// update completion state
app.put('/todo/complete/:id', async (req, res) => {
    const todoToUpdate = await Todo.findById(req.params.id);
    todoToUpdate.complete = !todoToUpdate.complete;
    todoToUpdate.save();
    res.json(todoToUpdate);
    
})

app.listen(3001, ()=>console.log("App started on port 3001"));