import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'antd';

class ToolBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="toolbar">
                <Button>添加项目</Button>
            </div>
        )
    }
}

export default ToolBar;
