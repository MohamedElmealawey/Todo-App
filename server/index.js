const experss=require('express');
const cors=require('cors');
const todoRoutes = require('./Routes/TodoRoutes');
const { connectDB } = require('./DB/Connection');
require('dotenv').config()

const app=experss();
app.use(cors())
app.use(experss.json())

const PORT=process.env.PORT || 8000;

app.use("/",todoRoutes);

app.get("/",(req,res)=>{
    res.send("Api is working")
})


connectDB();
app.listen(PORT,()=>{
    console.log("server is Running at port "+PORT)
})