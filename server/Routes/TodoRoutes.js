const express = require("express");
const { GetAll, Update, Delete, Post, EditTask, GetOne } = require("../Controllers/TodoListController");

const todoRoutes=express.Router();

todoRoutes.get("/get",GetAll);
todoRoutes.get("/getOne/:id",GetOne);
todoRoutes.put("/update/:id",Update)
todoRoutes.put("/edit/:id",EditTask)
todoRoutes.delete("/delete/:id",Delete)
todoRoutes.post("/add",Post)

module.exports=todoRoutes;