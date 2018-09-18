import React from 'react';
import {connect} from 'dva';
import {Divider , Steps , Button} from "antd";
const Step = Steps.Step;

import Step0 from "./Step0.js";
import Step1 from "./Step1.js";
import Step2 from "./Step2.js";

import Sale from "../../../containers/Sale.js";
 

import "./AddCar.less";
 
class AddCar extends React.Component {
	constructor(props) {
		super(props);
	}
 
	render() {
		const showStep = (n) => {
			var arr = [
				<Step0></Step0> , 
				<Step1></Step1> , 
				<Step2></Step2>
			];
			return arr[n];
		}

		return (
		 		<Sale k="addcar" c="信息添加">
					<div>
						<h1>增加车辆</h1>
						<Divider></Divider>
						<Steps current={this.props.step}>
							<Step title="车辆基本信息" description="车型、车主、公里数等" />
							<Step title="车辆的图片" description="外观、内饰、结构及发动机、更多细节图片" />
							<Step title="车辆的其他文件" description="行驶证照片、汽车大本照片等" />
						</Steps>
						<div className="steps-content">
							{showStep(this.props.step)}
						</div>
					</div>
				</Sale>
			 
		);
	}
}

export default connect(
	({addCar}) => ({
		step : addCar.step ,
		carbrand : addCar.carbrand
	})
)(AddCar);