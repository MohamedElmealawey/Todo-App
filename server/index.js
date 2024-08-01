const experss=require('express');
const cors=require('cors');
const connection=require("./DB/Connection");
const todoRoutes = require('./Routes/TodoRoutes');

const app=experss();
app.use(cors())
app.use(experss.json())

app.use("/",todoRoutes);


connection();
app.listen("8000",()=>{
    console.log("server is Running")
})