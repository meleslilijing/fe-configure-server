import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Api from '../utils/Api.js';

import { Button, Select, Modal, Alert, Input } from 'antd';

import './ProjectList.css';

class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.currentVersion
        }

        this.applyNewVersion = this.applyNewVersion.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    applyNewVersion(name) {
        var self = this;

        const { showModal } = this.props;

        return function (event) {
            const version = self.state.value;

            showModal(name, version);
        }

    }

    handleChange(value) {
        this.setState({
            value: value
        })
    }

    render() {
        const { name, versions, currentVersion } = this.props;
        const versionsStr = versions.join(', ');

        const options = versions.map((version) => {
            return <Option value={version}>{version}</Option>;
        })

        return (
            <div className={this.props.className}>
                <h3>项目名称：{ name }</h3>
                <p>当前项目版本：{ currentVersion }</p>
                <Select
                    className="Select"
                    defaultValue={ currentVersion }
                    onChange={ this.handleChange }
                    >
                    { options }
                </Select>
                <Button type="primary" onClick={ this.applyNewVersion(name) }>应用</Button>
            </div>
        );
    }
}

class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModalVisible: false,
            ModalText: '',
            bufferName: '',
            bufferVersion: '',
            hasAlert: false,
            AlertMessage: '',
            AlertType: 'success'
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
        this.handleModalOk = this.handleModalOk.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.handleAlertClosed = this.handleAlertClosed.bind(this);
    }

    showModal(name, version) {
        const modalText = `将项目 ${name} 的当前版本变更为 ${version}`

        this.setState({
            ModalVisible: true,
            ModalText: modalText,
            bufferName: name,
            bufferVersion: version
        })
    }

    hideModal() {
        this.setState({
            ModalVisible: false
        })
    }

    handleModalCancel() {
        this.hideModal();
    }

    handleModalOk() {

        const self = this;

        const showAlert = this.showAlert;

        const projectName = this.state.bufferName,
            version = this.state.bufferVersion;

        this.hideModal();

        Api.setProjectVersion(projectName, version)
            .end((error, response) => {

                if (error) {
                    showAlert('error', error.toString())
                }

                response = response.body;

                const { rtnCode, rtnMsg } = response;

                if (rtnCode == 0) {
                    showAlert('success', response.rtnMsg)
                }
                else {
                    showAlert('warning', response.rtnMsg)
                }

            })
    }

    showAlert(type, message) {
        if (
            type !== 'success' &&
            type !== 'info' &&
            type !== 'warning' &&
            type !== 'error'
        ) {
            throw new TypeError('Ant Desing Alert type was wrong!');
            return;
        }

        this.setState({
            hasAlert: true,
            AlertMessage: message,
            AlertType: type
        })
    }

    handleAlertClosed() {
        this.setState({
            hasAlert: false
        })
    }

    createAlertDOM() {
        if (!this.state.hasAlert) {
            return '';
        }

        return (
            <Alert
                message={this.state.AlertMessage}
                type={this.state.AlertType}
                showIcon
                closable
                onClose={this.handleAlertClosed}
            />
        )
    }

    createProjectListDOM() {
        const self = this;
        
        const { list } = this.props;
        const projectList = [];

        // for (var key in list) {
        //     var versions = list[key]['versions'];
        //     var currentVersion = list[key]['currentVersion'];

        //     projectList.push(
        //         <Project
        //             className="project"
        //             name={ key }
        //             versions={ versions }
        //             currentVersion={ currentVersion }
        //             showModal={ self.showModal }
        //         />
        //     );
        // }

        console.log('list: ', list)

        return list.map(function(project) {
            const { currentVersion, project_name, branch } = project;

            return (
                <Project
                    className="project"
                    name={ project_name+'_'+branch }
                    versions={[]}
                    currentVersion={currentVersion}
                    showModal={ self.showModal }
                />
            )
        })
    }

    render() {
        return (
            <div id="project-list">
                <h2>项目列表</h2>
                { this.createAlertDOM() }
                { this.createProjectListDOM() }
                <Modal title="对话框标题"
                    visible={ this.state.ModalVisible }
                    onOk={this.handleModalOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleModalCancel}
                    >
                    <p>{ this.state.ModalText }</p>
                </Modal>
            </div>
        )
    }
}

export default ProjectList;
