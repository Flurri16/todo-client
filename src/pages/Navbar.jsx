import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Navbar() {
    const token = localStorage.getItem('token')
    const isAuth = !!token
    const nickName = localStorage.getItem('username') || null
    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if(!token) navigate('/login')
    // })
    const navigate = useNavigate()
    const logOutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login')
        toast('You was logined out.')
    }
  return (
    <div>
        <nav className='flex justify-between py-5 px-5 items-center bg-blue-500'>
            <div className="flex items-center text-white">
            <div className="text-white text-4xl">MERN</div>
            <div className="text-white pl-5">{nickName}</div>
                
            </div>
            <ul>
                {
                    isAuth ? 
                    <li><button className='text-white text-2xl bg-slate-500 py-2 px-4 bg-opacity-50 hover:bg-red-500' onClick={logOutHandler}>Log out</button></li> : 
                    <li><NavLink className='text-white text-2xl bg-slate-500 py-2 px-4 bg-opacity-50 hover:bg-lime-500' to='/login'>Login</NavLink></li>
                }
            </ul>
        </nav>
    </div>
  )
}
