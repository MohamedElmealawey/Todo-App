import React from 'react';
import Create from './Create';
import Swal from 'sweetalert2';
import { BiTrash, BiSolidEdit } from 'react-icons/bi';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import Edit from './Edit';
import { useTodo } from '../context/TodoContext';

const Home = () => {
  const { todos, mode, task, setTask, updateTask, deleteTask, getOneTask, setMode, fetchTodos, handleModeChange } = useTodo();

  const handleDelete = (id) => {
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
        deleteTask(id)
          .then(() => fetchTodos())
          .catch((err) => console.log(err));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  };

  const handleUpdate = (id) => {
    updateTask(id)
      .then((data) => {
        console.log(data.message);
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    setMode('edit');
    getOneTask(id)
      .then((t) => setTask(t))
      .catch((err) => console.log(err));
  };

  const completedTasksCount = todos.filter((t) => t.completed).length;
  const uncompletedTasksCount = todos.length - completedTasksCount;

  return (
    <div>
      <h2>Todo List</h2>
      <p className='mess'><AiOutlineWarning className='icon' /> Slide down to show more</p>
      {mode === 'create' ? (
        <Create />
      ) : (
        <Edit task={task} setTask={setTask} onModeChange={handleModeChange} />
      )}
      <ul>
        {todos.length === 0 ? (
          <h2>No Record</h2>
        ) : (
          todos.map((todo) => (
            <li key={todo._id}>
              <div className='content'>
                {todo.completed ? (
                  <BsFillCheckCircleFill className='icon2' />
                ) : (
                  <BsCircleFill className='icon' onClick={() => handleUpdate(todo._id)} />
                )}
                {todo.completed ? <p className='checked'>{todo.task}</p> : <p>{todo.task}</p>}
              </div>
              <div className='actions'>
                <BiSolidEdit className='icon' onClick={() => handleEdit(todo._id)} />
                <BiTrash className='icon' onClick={() => handleDelete(todo._id)} />
              </div>
            </li>
          ))
        )}
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
  );
};

export default Home;
