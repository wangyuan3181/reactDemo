import React from 'react';
import { Divider , Row , Col ,  Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button, AutoComplete  } from "antd";
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

class MyForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};

		return (
			<Form onSubmit={()=>{}}>
				<FormItem
					label="Email"
					{...formItemLayout}
		        >
					{
						getFieldDecorator('email', {
							rules: [
								{
									type: 'email', message: '请输入正确的Email地址',
								}, 
								{
									required: true, message: '本项为必填项，请完成',
								}
							]
						})(<Input />)
					}
		        </FormItem>
		        <FormItem
					label="员工编号"
					{...formItemLayout}
		        >
					{
						getFieldDecorator('adminid', {
							rules: [
								{
									pattern:/^\d{5}$/ , message: '请输入正确的员工编号',
								}, 
								{
									required: true, message: '本项为必填项，请完成',
								}
							]
						})(<Input />)
					}
		        </FormItem>
		        <FormItem
					label="真实姓名"
					{...formItemLayout}
		        >
					{
						getFieldDecorator('name', {
							rules: [
								{
									pattern:/^([\u4e00-\u9fa5]){2,7}$/ , message: '请输入正确的中文姓名',
								}, 
								{
									required: true, message: '本项为必填项，请完成',
								}
							]
						})(<Input />)
					}
		        </FormItem>

		        <Button type="primary">提交</Button>
			</Form>
		);
	}
}


const WrappedRegistrationForm = Form.create()(MyForm);

export default WrappedRegistrationForm;