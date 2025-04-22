import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
export default function MainPage() {
  const isAuth = !!localStorage.getItem("token"); // чуть яснее — логическое значение
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const token = localStorage.getItem('token')
  
  const createTodo = async () => {
    try {
      const { data } = await axios.post('https://todo-back-y91r.onrender.com/api/todo/add', { title: todo }, { headers: { Authorization: `Bearer ${token}` } })
      if (!todo.trim()) {
        toast.error("Нельзя добавить пустую задачу!");
        return;
      }
      if (data.message) toast(data.message)
      getTodos()
      setTodo('')
    } catch (err) {
      console.log(err)
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        alert('Произошла ошибка при create');
      }
    }
  }
  const getTodos = async () => {
    try {
      const { data } = await axios.get('https://todo-back-y91r.onrender.com/api/todo/getAll', { headers: { Authorization: `Bearer ${token}` } })
      setTodos(data.todos)
    } catch (err) {
      console.log(err);
      toast.error("Не удалось получить список задач");
    }
  }
  const removeTodo = async (id) => {
    try {
      const {data} = await axios.delete(`https://todo-back-y91r.onrender.com/api/todo/delete/${id}`, {headers: { Authorization: `Bearer ${token}`}})
      toast(data.message)
      getTodos()
    } catch(err) {
      toast.error("Ошибка при удалении");
    }
  }
  const completed = async (id) => {
    try {
      const { data } = await axios.patch(`https://todo-back-y91r.onrender.com/api/todo/complited/${id}`, {}, {headers: { Authorization: `Bearer ${token}` }});
      toast(data.message);
      getTodos(); // <--- Важно!
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };
  const importantt = async (id) => {
    try {
      const { data } = await axios.patch(`https://todo-back-y91r.onrender.com/api/todo/important/${id}`, {}, {headers: { Authorization: `Bearer ${token}` }});
      toast(data.message);
      getTodos(); // <--- Важно!
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) getTodos()
  }, [token])
  return (
    <div className="max-w-4xl mx-auto px-4">
      {isAuth ? (
        <>
          {/* Блок добавления новой задачи */}
          <div className="mt-10">
            <h1 className="text-4xl font-semibold mb-4">Add todo:</h1>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Todo text"
                onChange={e => setTodo(e.target.value)}
                value={todo}
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg mb-3"
              />
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl py-3 rounded transition"
                onClick={createTodo}>
                Create todo
              </button>
            </form>
          </div>

          {/* Блок активных задач */}
          <div className="mt-12">
            <h1 className="text-4xl font-semibold mb-4">Active todos:</h1>
            {todos.length > 0 ? (
              todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} onImportant={importantt} onComplete={completed} onDelete={removeTodo}/>
              ))
            ) : (
              <p className="text-gray-500">No tasks yet.</p>
            )}
            {/* Здесь можешь мапить массив todos */}
          </div>
        </>
      ) : (
        // Блок, если не авторизован
        <div className="w-fit border py-6 px-6 text-2xl font-semibold mx-auto mt-20 rounded shadow">
          Please login
          <Link
            to="/login"
            className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-xl ml-6 border-x-4 border-y-2 inline-block transition"
          >
            Go to login
          </Link>
        </div>
      )}
    </div>
  );
}
