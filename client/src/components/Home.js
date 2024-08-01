import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import Swal from 'sweetalert2'
import {BiTrash} from 'react-icons/bi'
import {AiOutlineWarning} from 'react-icons/ai'
import {BsCircleFill} from 'react-icons/bs'
import {BsFillCheckCircleFill} from 'react-icons/bs'

const Home = () => {
    const [todos,setTodos]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/get")
        .then((res)=>setTodos(res.data))
        .catch((err)=>console.log(err))
    })

    const handleDelete=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/delete/`+id)
                .catch(err=>console.log(err))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }

    const handleUpdate=(id)=>{
        axios.put(`http://localhost:8000/update/`+id)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }

    const completedTasksCount = todos.filter(task => task.completed).length;
    const uncompletedTasksCount = todos.length - completedTasksCount;
    
  return (
    <div>
        <h2>Todo List</h2>
        <p className='mess'><AiOutlineWarning className='icon'/> Slide down to show more</p>
        <Create/>
        <ul>
        {
            todos.length===0?
            <h2>No Record</h2>
            :todos.map((todo)=>{
                return(
                    <li key={todo.id}>
                        <div className='content'>
                            {todo.completed?<BsFillCheckCircleFill className='icon2' />
                            :<BsCircleFill className='icon' onClick={()=>handleUpdate(todo._id)}/>}
                            {todo.completed?<p className='checked'>{todo.task}</p>
                            :<p>{todo.task}</p>}
                        </div>
                        <div className='actions'>
                            <BiTrash className='icon' onClick={()=>handleDelete(todo._id)}/>
                        </div>
                    </li>)
                })
            }
        </ul>
        <div className='tasks-state'>
            <p>Completed Tasks: {completedTasksCount}</p>
            <p>UnCompleted Tasks: {uncompletedTasksCount}</p>
        </div>
        <div className="task-bar">
            <div className="completed-bar" style={{ width: `${(completedTasksCount / todos.length) * 100}%` }} />
            <div className="uncompleted-bar" style={{ width: `${(uncompletedTasksCount / todos.length) * 100}%` }} />
        </div>
    </div>
  )
}

export default Home