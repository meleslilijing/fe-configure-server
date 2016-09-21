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
        this.insertVersion = this.insertVersion.bind(this);
    }

    insertProject() {
        var name = ReactDOM.findDOMNode(doc.id('insert-project-name')).value;
        var branch = ReactDOM.findDOMNode(doc.id('insert-project-branch')).value;
        
        if(!name || !branch) {
            alert('项目名称，分支不能为空')
            return;
        }

        Api.insertProject(name, branch)
            .end((err, res) => {
                if(err || !res.ok) {
                    console.log('insertProject error')
                    console.error(err);
                    return
                }

                res = res.body;

                const { rtnCode, rtnMsg } = res;
                alert(rtnMsg)
            })
    }

    insertVersion() {
        var name = ReactDOM.findDOMNode(doc.id('insert-version-name')).value;
        var branch = ReactDOM.findDOMNode(doc.id('insert-version-branch')).value;
        var currentVersion = ReactDOM.findDOMNode(doc.id('insert-version-current-version')).value;

        if(!name || !branch || !currentVersion) {
            alert('项目名称，分支，当前项目版本不能为空');
            return;
        }

        Api.insertVersion(name, branch, currentVersion)
            .end((err, res) => {
                if(err || !res.ok) {
                    console.log('insertProject error')
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
                        <Input addonBefore="当前版本" id="insert-version-current-version" />
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