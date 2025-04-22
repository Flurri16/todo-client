import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const registerUser = async () => {
    try {
      const { data } = await axios.post('https://todo-back-y91r.onrender.com/api/auth/register', {
        username,
        password,
      });
  
      if (data.message) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.newUser.username);
        toast(data.message)
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(data.message || 'Ошибка регистрации');
      }
    } catch (err) {
      console.error(err);
      alert('Произошла ошибка при регистрации');
    } finally {
      setUsername('');
      setPassword('');
    }
  };
  
  
    return (
        <div className="flex justify-center items-center mt-[200px]">
          <form className="w-full max-w-xs  bg-white bg-opacity-35  p-6 rounded shadow-md" onSubmit={e => e.preventDefault()}>
          <h1 className='text-2xl text-black text-center pb-5'>Registration</h1>
            <input 
              type="text" 
              name="username" 
              value={username} 
              placeholder="Username"
              onChange={e => setUsername(e.target.value)} 
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password" 
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-center gap-4 items-center">
            <button 
              type="button" 
              onClick={registerUser}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Register
            </button>
            <Link to='/login' className='bg-gray-300'>Already have an account?</Link>
            </div>
          </form>
        </div>
      );
}

export default RegisterPage;
