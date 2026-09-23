const mongoose=require("mongoose")

const TodoSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
},{timestamps:true})

const TodoModel=mongoose.model("Tasks",TodoSchema);

module.exports=TodoModel;