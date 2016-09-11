import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../containers/Header.jsx';
import Content from '../containers/Content.jsx';

import { Icon } from 'antd';

class Index extends Component {
    render() {
        return (
             <div>
                <Header />
                <Content>
                    <h2 className="title">
                        首页: 没想好放什么内容
                    </h2>
                </Content>
            </div>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)
