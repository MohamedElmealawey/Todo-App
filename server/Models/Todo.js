const mongoose=require("mongoose")

const TodoSchema=new mongoose.Schema({
    id:String,
    task:String,
    completed:Boolean,
})

const TodoModel=mongoose.model("Tasks",TodoSchema);

module.exports=TodoModel;