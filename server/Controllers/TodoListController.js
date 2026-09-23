const TodoModel = require("../Models/Todo")

exports.GetAll=(async(req,res)=>{
    try{
        const list=await TodoModel.find({});
        if(!list){
            req.status(400).send({
                success:false,
                message:"There is no data to show"
            })
        }else{
            res.status(200).send({
                success:true,
                list
            })
        }
    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
})

exports.GetOne=(async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await TodoModel.findById({_id:id});
        if(!task){
            req.status(400).send({
                success:false,
                message:"There is no task for this id"
            })
        }else{
            res.status(200).send({
                success:true,
                task
            })
        }
    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
})

exports.Update=(async(req,res)=>{
    try{
        const {id}=req.params;

        const updatedTask=await TodoModel.findByIdAndUpdate({_id:id},{completed:true});

    if(updatedTask){
        res.status(200).send({
            success:true,
            message:"task updated successfully"
        })
    }else{
        res.status(400).send({
            success:false,
            message:"error occured"
        })
    }

    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
})

exports.EditTask=(async(req,res)=>{
    try{
        const {task}=req.body;
        const {id}=req.params;
        const taskEdited=await TodoModel.findByIdAndUpdate({_id:id},{task});

        if(!taskEdited){
            return res.status(400).json({
                success:false,
                message:"NO Record for this ID"
            })
        }

        return res.status(200).json({
            success:true,
        })

    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
})

exports.Delete=(async(req,res)=>{
    try{
        const {id}=req.params;

        const deletedTask=await TodoModel.findByIdAndDelete({_id:id});
        if(deletedTask){
            res.status(200).send({
                success:true,
                message:"task deleted successfully"
            })
        }else{
            res.status(400).send({
                success:false,
                message:"error occured"
            })
        }
    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
})

exports.Post=(async(req,res)=>{
    try{
        const {task,completed}=req.body;

        if(!task){
            res.status(400).send({
                success:false,
                message:"task must not be empty"
            })
        }else{
            await TodoModel.create({
                task,
                completed
            })
            res.status(200).send({
                success:true,
                message:"task created successfully"
            })
        }
    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
})