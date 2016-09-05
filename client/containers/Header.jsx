import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Header.css';

import { Menu, Icon } from 'antd';

function NavItemFactory(text='', href='#', iconType='') {
    'use stric'
    if( !(this instanceof NavItemFactory) ) {
        return new NavItemFactory(text, href, iconType);
    }

    return {
        text: text,
        href: href,
        iconType: iconType
    }
}

const NavList = [
    NavItemFactory('首页', '/index', 'home'),
    NavItemFactory('项目列表', '/project_list', 'setting'),
    NavItemFactory('日志', '/log', 'book')
];

class Nav extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {

        const selectedKeys = window.location.pathname;

        return (
            <Menu
                id="nav"
                theme="dark"
                mode="horizontal"
                selectedKeys={[ selectedKeys ]}
            >
                {
                    NavList.map(function(NavItem, index) {
                        const { href, text, iconType } = NavItem;
                        return (
                            <Menu.Item key={ href }>
                                <a href={ href }>
                                    <Icon type={ iconType }></Icon>
                                    { text }
                                </a>
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div id="Header">
                <h1>小米移动前端配置平台</h1>
                <Nav />
            </div>
        )
    }
}

export default Header
