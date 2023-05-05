import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = ({ setHasLogin }) => {
  return (
    <div>
        <Header setHasLogin={setHasLogin}/>
        <Outlet />
    </div>
  )
}

export default Layout