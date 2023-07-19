import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './modles/Todo.js';
import dotenv from 'dotenv'
dotenv.config()

const app=express();
app.use(express.json());
app.use(cors());
const username=process.env.user;

const password=process.env.pass;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.oow4vgx.mongodb.net/`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to DB");
}).catch((error)=>{
    console.log("error while connectiog to DB");
})

app.get('/todos',async(req,res)=>{
    const todos=await Todo.find();
    res.json(todos);
    console.log("giving all todos")
    console.log(todos)
});

app.post('/todo/new',async (req,res)=>{
    
    const todo=new Todo({
        text:req.body.text,
    });
    await todo.save();
    res.json(todo);
 
});

app.delete('/todo/delete/:id',async(req,res)=>{
   console.log('delete query')
   const result=await Todo.findByIdAndDelete(req.params.id);
   res.json(result);
   console.log(result);
   
});

app.get('/todo/complete/:id',async(req,res)=>{
    
    const todo=await Todo.findById(req.params.id);
    
    todo.complete=!todo.complete;
    

    todo.save();
    res.json(todo);
})




const PORT=4000;
app.listen(PORT,()=>{
console.log("server started");
})

