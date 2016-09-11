import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Api from '../utils/Api'

import Header from '../containers/Header.jsx';
import Content from '../containers/Content.jsx';
import ProjectList from  '../containers/ProjectList.jsx';

import ToolBar from '../components/ToolBar.jsx';

import { Input, Button } from 'antd';

var doc = document;
doc.id = document.getElementById;

class ProjectListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectList: []
        }   // end of this.state

        this.insertProject = this.insertProject.bind(this);
    }

    insertProject() {
        var name = ReactDOM.findDOMNode(doc.id('insert-project-name')).value;
        var branch = ReactDOM.findDOMNode(doc.id('insert-project-branch')).value;
        
        Api.insertProject(name, branch)
        .end((err, res) => {
            if(err) {
                console.error(err);
                return
            }

            res = res.body;

            const { rtnCode, rtnMsg } = res;
            alert(rtnMsg)
        })
    }

    componentDidMount() {
        Api.getProjectList()
        .end((err, res) => {
            if(err) {
                console.error(err);
            }

            res = res.body;

            const { rtnCode, rtnMsg } = res;

            console.log('response: ', res)

            if( rtnCode != 0 ) {
                return console.error(rtnMsg)
            }

            const { data } = res;

            this.setState({
                projectList: data
            })
        })
    }

    render() {
        return (
            <div>
                <Header />
                <Content>
                    <div>
                        <h2>添加项目</h2>
                        <Input addonBefore="项目名称" id="insert-project-name" />
                        <Input addonBefore="分支" id="insert-project-branch" />
                        <Button onClick={ this.insertProject }>添加</Button>
                    </div>

                    <div>
                        <h2>添加版本</h2>
                        <Input addonBefore="项目名称" id="insert-version-name" />
                        <Input addonBefore="分支" id="insert-version-branch" />
                        <Button onClick={ this.insertVersion }>添加</Button>
                    </div>

                    <ProjectList list={ this.state.projectList } />
                </Content>
            </div>
        )
    }
}

ReactDOM.render(
    <ProjectListPage />,
    document.getElementById('root')
)