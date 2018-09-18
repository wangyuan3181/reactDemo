import React from 'react';
import Step0Form from "./Step0Form.js";
import {Form} from "antd";

export default Form.create({
		//当表单元素更改的做的事情
		onFieldsChange(props, changedFields) {
			// console.log(props , changedFields);
			props.onChange(changedFields);
		},
		//映射，实现state的默认数据的填写
		mapPropsToFields(props) {
			return {
				km: Form.createFormField({
					...props.km,
					value: props.km.value
				}),
				price1 : Form.createFormField({
					...props.price1,
					value: props.price1.value
				}),
				price2 : Form.createFormField({
					...props.price2,
					value: props.price2.value
				}),
				seat : Form.createFormField({
					...props.seat,
					value: props.seat.value
				}),
				fuel : Form.createFormField({
					...props.fuel,
					value: props.fuel.value
				}),
				exhaust : Form.createFormField({
					...props.exhaust,
					value: props.exhaust.value
				}),
				gearbox : Form.createFormField({
					...props.gearbox,
					value: props.gearbox.value
				}),
				brandandseries : Form.createFormField({
					...props.brandandseries,
					value: props.brandandseries.value
				}),
				buydate : Form.createFormField({
					...props.buydate,
					value: props.buydate.value
				})
			};
		}
})(Step0Form);