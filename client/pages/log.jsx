import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Api from '../utils/Api'

import Header from '../containers/Header.jsx';
import Content from '../containers/Content.jsx';

import { Icon, Table } from 'antd';

function ColumnFactory(title, dataIndex) {
    if( !(this instanceof ColumnFactory) ) {
        return new ColumnFactory(title, dataIndex);
    }

    return {
        title: title,
        dataIndex: dataIndex,
        key: dataIndex
    }
}

function DataSourceFactory(key, project, version, branch, timestamp) {
    if( !(this instanceof DataSourceFactory) ) {
        return new DataSourceFactory(key, project, version, branch, timestamp);
    }

    const formatTime = (timestamp) => {
        const time = new Date(timestamp);
        const dateString = [
            time.getFullYear(),
            time.getMonth(),
            time.getDay()
        ].join('-');

        const timeString = [
            time.getHours(),
            time.getMinutes(),
            time.getSeconds()
        ].join(':')

        return dateString + ' ' + timeString;
    }

    return {
        key: key+'',
        project: project,
        version: version,
        branch: branch,
        timestamp: formatTime(timestamp)
    }
}

const columns = [
    ColumnFactory('项目', 'project'),
    ColumnFactory('版本号', 'version'),
    ColumnFactory('分支', 'branch'),
    ColumnFactory('发布时间', 'timestamp')
]

const dataSource = [
    DataSourceFactory(0, 'test-project', 'test-version-01', 'master', +new Date)
]

class Log extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content>
                    <h2 className="title">
                        <Icon type="book" />
                        项目部署日志
                    </h2>
                    <Table dataSource={ dataSource } columns={ columns } />
                </Content>
            </div>
        )
    }
}

ReactDOM.render(
    <Log />,
    document.getElementById('root')
)
