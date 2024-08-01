const TodoModel = require("../Models/Todo")

exports.GetAll=((req,res)=>{
    TodoModel.find({})
    .then((result)=>res.json(result))
    .catch((err)=>console.log(err))
})

exports.Update=((req,res)=>{
    const {id}=req.params;

    TodoModel.findByIdAndUpdate({_id:id},{completed:true})
    .then(result=>res.json(result))
    .then(err=>console.log(err))
})

exports.Delete=((req,res)=>{
    const {id}=req.params;

    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .then(err=>console.log(err))
})

exports.Post=((req,res)=>{
    const id=req.body.id;
    const task=req.body.task;
    const completed=req.body.completed;

    TodoModel.create({
        id:id,
        task:task,
        completed:completed
    }).then(result=>res.json(result))
    .catch(err=>console.log(err))
})