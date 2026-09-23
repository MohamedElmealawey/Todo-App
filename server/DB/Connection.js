const mongoose=require('mongoose');

exports.connectDB=()=>{
    try{
        mongoose.connect(process.env.DB_URL).then((res)=>{
            console.log("connected to database")
        }).catch((e)=>{
            console.log(e.message);
        })
    }catch(e){
        console.log(e.message);
    }
}