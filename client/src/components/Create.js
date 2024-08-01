import React, { useRef, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
const Create = () => {
    const [task,setTask]=useState("");
    
    const handleErease=()=>{
        setTask("");
    }
    const handleAdd=(e)=>{
        e.preventDefault();
        if(task!==""){
            axios.post("http://localhost:8000/add",{
                id:new Date(),
                task:task,
                completed:false
            })
            .catch(err=>console.log(err))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Input must not be empty!',
              })
        }
        handleErease();
    }
  return (
    <div className='inp'>
        <input 
        type='text' 
        value={task} 
        placeholder='Enter task...'
        onChange={(e)=>setTask(e.target.value)}/>
        <button type='button' onClick={(e)=>handleAdd(e)}>Add</button>
    </div>
  )
}

export default Create