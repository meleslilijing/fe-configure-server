// TODO
// 未使用

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Collapse } from 'antd';
const Panel = Collapse.Panel;

class ToolBar extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        console.log('handleChange')
    }

    render() {
        return (
            <Collapse
                onChange={this.handleChange}
            >
                <Panel header="添加项目" key="1">
                    TODO
                </Panel>
            </Collapse>
        )
    }
}

export default ToolBar;
