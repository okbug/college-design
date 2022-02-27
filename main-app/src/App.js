import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Layout/Header.jsx'
import PlayGround from './Layout/PlayGround.jsx'

export default () => (<>
    <Header />
    <PlayGround></PlayGround>
    <Outlet />
</>)