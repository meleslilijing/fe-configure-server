import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const content = document.getElementById('content');

class App extends Component {
  render() {
    return (
      <div>
        Hello react-koa-webpack
      </div>
    )
  }
}

ReactDOM.render(<App />, content);
