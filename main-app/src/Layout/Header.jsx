import React from 'react'
import { Button } from 'antd'

import './header.css'

const Header = () => {
    return (
        <header>
            <div className="login">
                <Button type="primary">登录</Button>
                <Button>注册</Button>
            </div>
        </header>
    )
}

export default Header