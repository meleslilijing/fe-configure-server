import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.jsx';

const content = document.getElementById('content');

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <ul>
                    <li>
                        <a href="/project_list">项目列表</a>
                    </li>
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<App />, content);
