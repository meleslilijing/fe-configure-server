import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Api from '../utils/Api'

import Header from '../containers/Header.jsx';
import Content from '../containers/Content.jsx';

import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

var formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }    
}

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
                    {...formItemLayout}
                    hasFeedback
                >
                    <Input 
                        name={id}
                        {...getFieldProps(id, {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: id+'不能为空',
                                }
                            ] 
                        })}
                    />
                </FormItem>
            )
        })
    }

   

    handleSubmit(event) {
        event.preventDefault();

        const { form } = this.props;

        // 表单校验和获取值
        form.validateFields(function(errors, values) {
            if (errors) {
                console.log(errors);
                return ;
            }
            const {name, branch} = form.getFieldsValue();

            Api.queryCurrentVersion(name, branch)
            .end((error, res) => {
                if(error) {
                    var msg =  error['message'] || error
                    console.error(msg)
                    alert(msg)
                }

                const { data } = res.body;
                const url = data.versionUrl;

                form.setFieldsValue({
                    'result' : url
                })
                
                const { result } = values;
                document.getElementById('result').value = result;
            })
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
        ];

        const { form } = this.props;

        form.getFieldProps('result', {
            initialValue: ''
        });

        return (

            <Form horizontal onSubmit={this.handleSubmit}>
                { this.createFormItemsDOM(formItems) }
                <FormItem
                    label="结果"
                    {...formItemLayout}
                >
                    <Input id="result" />
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 16, offset: 6 }}
                >
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
