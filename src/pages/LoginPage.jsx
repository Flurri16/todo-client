import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const loginUser = async () => {
    try {
      const { data } = await axios.post('https://todo-back-y91r.onrender.com/api/auth/login', {
        username,
        password,
      });
  
      if (data.message) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        toast(data.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      // Обработка ошибки от сервера
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        alert('Произошла ошибка при авторизации');
      }
    } finally {
      setUsername('');
      setPassword('');
    }
  };
  
    return (
        <div className="flex justify-center items-center mt-[200px]">
          <form onSubmit={e => e.preventDefault()} className="w-full max-w-xs bg-white bg-opacity-35 p-6 rounded shadow-md">
          <h1 className='text-2xl text-black text-center pb-5'>Authorization</h1>
            <input 
              type="text" 
              value={username} 
              name="username" 
              onChange={e => setUsername(e.target.value)}
              placeholder="Username" 
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="password" 
              onChange={e => setPassword(e.target.value)}
              value={password} 
              name="password" 
              placeholder="Password" 
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-center gap-4 items-center">
            <button 
              type="submit" 
              onClick={loginUser}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
            <Link to='/register' className='bg-gray-300'>Don't have an account?</Link>
            </div>
          </form>
        </div>
    );
}

export default LoginPage;
