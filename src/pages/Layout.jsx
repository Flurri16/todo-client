import React from 'react'
import Navbar from './Navbar'

export default function Layout({children}) {
  return (
    <div>
        <Navbar></Navbar>
        {children}
    </div>
  )
}
