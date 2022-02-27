import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Layout/Header.jsx'

export default () => (<>
    <Header />
    <Outlet />
</>)