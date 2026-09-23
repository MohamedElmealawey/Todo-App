import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState('create');
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET /get - fetch all todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/get');
      setTodos(res.data.list);
      setError(null);
      return res.data.list;
    } catch (err) {
      console.log(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // GET /getOne/:id - fetch a single task
  const getOneTask = useCallback(async (id) => {
    try {
      const res = await api.get(`/getOne/${id}`);
      return res.data.task;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  // POST /add - create a new task
  const addTask = useCallback(async (taskText) => {
    try {
      const res = await api.post('/add', { task: taskText });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  // PUT /edit/:id - edit an existing task's text
  const editTask = useCallback(async (id, taskText) => {
    try {
      const res = await api.put(`/edit/${id}`, { task: taskText });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  // PUT /update/:id - toggle a task's completed state
  const updateTask = useCallback(async (id) => {
    try {
      const res = await api.put(`/update/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  // DELETE /delete/:id - delete a task
  const deleteTask = useCallback(async (id) => {
    try {
      const res = await api.delete(`/delete/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  // Convenience: switch between create/edit modes, refreshing the list on create
  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
    if (newMode === 'create') {
      setTask({});
      fetchTodos();
    }
  }, [fetchTodos]);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    // state
    todos,
    mode,
    task,
    loading,
    error,
    // setters
    setMode,
    setTask,
    // api actions
    fetchTodos,
    getOneTask,
    addTask,
    editTask,
    updateTask,
    deleteTask,
    handleModeChange,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return ctx;
};

export default TodoContext;
