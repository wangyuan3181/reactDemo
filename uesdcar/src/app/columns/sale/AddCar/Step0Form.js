import React from 'react';
import {Form , Select , AutoComplete , Input , DatePicker , Cascader  } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {connect} from "dva";
import carBrandAndSeries from "../../../api/carBrandAndSeries.js";

class Step0Form extends React.Component {
	constructor(props) {
		super(props);
	}

 

	render() {
		//表单布局：
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 11 },
			}
		};

		//得到表单域的装饰器，这个从父亲中传入，父亲是用Form.create()(Step0Form)装饰的。
		const { getFieldDecorator , getFieldsError , validateFields} = this.props.form;
 		
 		//品牌和车系的option，这里写一个形式转换代码
		const options = (function(){
			var arr = [];
			for(let k in carBrandAndSeries){
				arr.push({
					"value" : k ,
					"label" : k ,
					"children" : (function(){
						var arr = [];
						for(let i = 0 ; i < carBrandAndSeries[k].length ; i++){
							arr.push({
								"value" : carBrandAndSeries[k][i].name,
								"label" : carBrandAndSeries[k][i].name,
								"children" : (function(){
									var arr = [];
									for(let j = 0 ; j < carBrandAndSeries[k][i].series.length ; j++){
										arr.push({
											"value" : carBrandAndSeries[k][i].series[j],
											"label" : carBrandAndSeries[k][i].series[j],
										})
									}
									return arr;
								})()
							})
						}
						return arr;
					})()
				})
			}
			return arr;
		})();


		return (
			<Form>
				<FormItem
					{...formItemLayout}
					label="品牌和车系"
				>
					{
						getFieldDecorator('brandandseries', {
							rules: [
								{
									required: true , message: '请输入本项！',
								}
							]
						}
						)(<Cascader options={options} />)
					}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="购买时间"
				>
					{
						getFieldDecorator('buydate', {
							rules: [
								{
									required: true , message: '请输入本项！',
								}
							]
						}
						)(<DatePicker />)
					}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="里程表读数（公里）"
					extra="公司规定：如果虚假填写里程表度数，报警处理！一经发现，绝不姑息！"
				>
					{
						getFieldDecorator('km', {
							rules: [
								{
									pattern : /^\d+$/, message: '请输入数字！',
								}, 
								{
									required: true, message: '请输入本项！',
								}
							],
						}
						)(<Input />)
					}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="卖家意向售价最低（万元）"
					extra="请填写卖家的意向售价最低承受价格"
				>
					{
						getFieldDecorator('price1', {
							rules: [
								{
									pattern : /^\d+$/, message: '请输入数字！',
								}, 
								{
									required: true, message: '请输入本项！',
								}
							],
						}
						)(<Input />)
					}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="卖家意向售价最高（万元）"
					extra="请填写卖家的意向售价最高承受价格"
				>
					{
						getFieldDecorator('price2', {
							rules: [
								{
									pattern : /^\d+$/, message: '请输入数字！',
								}, 
								{
									required: true, message: '请输入本项！',
								}
							],
						}
						)(<Input />)
					}
				</FormItem>
				 
				<FormItem
					{...formItemLayout}
					label="座位数"
				>
					{
						getFieldDecorator('seat', {
							rules: [
								{
									pattern : /^\d+$/, message: '请输入数字！',
								}, 
								{
									required: true, message: '请输入本项！',
								}
							],
						}
						)(<Input />)
					}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="燃料"
				>
					{
						getFieldDecorator('fuel', {
							rules: [
								{
									required: true, message: '请输入本项！',
								}
							],
						}
						)( 
							<Select initialValue="汽油" style={{ width: 120 }} onChange={()=>{}}>
								<Option value="汽油">汽油</Option>
								<Option value="柴油">柴油</Option>
								<Option value="油电混合">油电混合</Option>
								<Option value="纯电动">纯电动</Option>
							</Select>
    					)
					}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="排放标准"
				>
					{
						getFieldDecorator('exhaust', {
							rules: [
								{
									required: true, message: '请输入本项！',
								}
							],
						}
						)( 
							<Select initialValue="国三" style={{ width: 120 }} onChange={()=>{}}>
								<Option value="国一">国一</Option>
								<Option value="国二">国二</Option>
								<Option value="国三">国三</Option>
								<Option value="国四">国四</Option>
								<Option value="国五">国五</Option>
								<Option value="国六">国六</Option>
							</Select>
    					)
					}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="变速箱"
				>
					{
						getFieldDecorator('gearbox', {
							rules: [
								{
									required: true, message: '请输入本项！',
								}
							],
						}
						)( 
							<Select initialValue="自动" style={{ width: 120 }} onChange={()=>{}}>
								<Option value="自动">自动</Option>
								<Option value="手动">手动</Option>
							</Select>
    					)
					}
				</FormItem>
			</Form>

		);
	}
}


export default connect()(Step0Form);