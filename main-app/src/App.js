import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Layout/Header.jsx'
import PlayGround from './Layout/PlayGround.jsx'

export default () => (<>
    <Header />
    <Link to="/doc" className='toDoc'>在线文档</Link>
    <Link to="/ppt" className='toPPT'>在线演示文稿</Link>
    <PlayGround />
</>)