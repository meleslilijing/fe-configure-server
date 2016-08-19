import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const content = document.getElementById('content');

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>
                    项目部署列表
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, content);
