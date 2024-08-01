const express = require("express");
const { GetAll, Update, Delete, Post } = require("../Controllers/TodoListController");

const todoRoutes=express.Router();

todoRoutes.get("/get",GetAll);
todoRoutes.put("/update/:id",Update)
todoRoutes.delete("/delete/:id",Delete)
todoRoutes.post("/add",Post)

module.exports=todoRoutes;