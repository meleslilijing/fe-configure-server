import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Api from '../utils/Api'

import Header from '../containers/Header.jsx';
import Content from '../containers/Content.jsx';

import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;


class ProjectTestForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createFormItemsDOM(formItems) {
        const { getFieldProps } = this.props.form;

        return formItems.map((items) => {
            const { label, id } = items;
            return (
                <FormItem
                    key={id}
                    label={ label }
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input id={id} name={id} {...getFieldProps(id)}/>
                </FormItem>
            )
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('表单数据: ', this.props.form.getFieldsValue());

        const {name, branch} = this.props.form.getFieldsValue();

        Api.queryCurrentVersion(name, branch)
            .end((error, res) => {
                if(error) {

                }

                res = res.body;

                console.log(res)
            })
    }

    render() {
        const formItems = [
            {
                label: '项目名称',
                id: 'name'
            },
            {
                label: '分支',
                id: 'branch'
            }
        ]

        const { getFieldProps } = this.props.form;

        return (

            <Form horizontal onSubmit={this.handleSubmit}>
                { this.createFormItemsDOM(formItems) }
                <FormItem
                    label="结果"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input id="result" disabled {...getFieldProps('result')} />
                    <Button htmlType="submit">查询</Button>
                </FormItem>
            </Form>

        );
    }
}

ProjectTestForm = Form.create()(ProjectTestForm);

class Test extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content>
                    <ProjectTestForm />
                </Content>
            </div>
        )
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('root')
)
