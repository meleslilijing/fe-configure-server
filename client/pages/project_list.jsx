import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Api from '../utils/Api'

import Header from '../containers/Header.jsx';
import Content from '../containers/Content.jsx';
import ProjectList from  '../containers/ProjectList.jsx';

import ToolBar from '../components/ToolBar.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectList: {
                test: {
                    currentVersion: 'test-01',
                    versions: [
                        'test-01',
                        'test-02',
                        'test-03',
                    ]
                }
            }
        }   // end of this.state
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
                    <ToolBar />
                    <ProjectList list={ this.state.projectList } />
                </Content>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
