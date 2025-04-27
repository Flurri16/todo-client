import React from 'react'
import { BiCheck } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";

export default function TodoItem({ todo, onDelete, onComplete, onImportant }) {
  // Преобразуем createdAt в объект Date
  const formattedDate = new Date(todo.createdAt).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });


  return (
    <div>
      <div className="flex justify-between py-4 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[2px] before:bg-blue-500 mt-10 hover:bg-slate-200 pr-2">
        <h2
          className={`pl-4 text-3xl
    ${todo.complited ? 'text-green-600 line-through' : ''} 
    ${todo.important ? 'text-yellow-500 font-semibold' : ''}`}
        >
          {todo.title}
        </h2>
        <div >
          <ul className="flex gap-1 items-center">
            <li>{formattedDate}</li> {/* Отображаем отформатированную дату */}
            <li><BiCheck className=' text-4xl text-green-600' onClick={() => onComplete(todo._id)}></BiCheck></li>
            <li><FaExclamation className='text-3xl text-yellow-500' onClick={() => onImportant(todo._id)}></FaExclamation></li>
            <li><MdDeleteForever className='text-3xl text-red-600' onClick={() => onDelete(todo._id)}></MdDeleteForever></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
