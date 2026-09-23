import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useTodo } from '../context/TodoContext';

const Create = () => {
  const [task, setTask] = useState('');
  const { addTask, fetchTodos } = useTodo();

  const handleErease = () => {
    setTask('');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (task !== '') {
      addTask(task)
        .then(() => fetchTodos())
        .catch((err) => console.log(err));
      Swal.fire({
        icon: 'success',
        title: 'Task Added'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Input must not be empty!',
      });
    }
    handleErease();
  };

  return (
    <div className='inp'>
      <input
        type='text'
        value={task}
        placeholder='Enter task...'
        onChange={(e) => setTask(e.target.value)} />
      <button type='button' onClick={(e) => handleAdd(e)}>Add</button>
    </div>
  );
};

export default Create;
