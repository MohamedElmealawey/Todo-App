import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTodo } from '../context/TodoContext';

const Edit = ({ task, setTask, onModeChange }) => {
  const [newTask, setNewTask] = useState('');
  const { editTask } = useTodo();

  useEffect(() => {
    if (task && task.task) {
      setNewTask(task.task);
    }
  }, [task]);

  const handleErease = () => {
    setTask('');
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!newTask.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Input must not be empty!',
      });
      return;
    }

    if (task && task._id) {
      try {
        await editTask(task._id, newTask);

        Swal.fire({
          icon: 'success',
          title: 'Task Updated'
        });

        handleErease();
        onModeChange('create');
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update task. Please try again.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No task selected for editing!',
      });
    }
  };

  if (!task) {
    return null;
  }

  return (
    <div className='inp'>
      <input
        type='text'
        value={newTask}
        placeholder='Enter task...'
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type='button' onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default Edit;
