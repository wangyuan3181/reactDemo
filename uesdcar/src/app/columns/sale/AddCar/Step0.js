import React from 'react';
import {connect} from "dva";
import {Row , Col , Input , Form , Button} from "antd";
import moment from "moment";
import WrappedStep0Form from "./WrappedStep0Form.js";

import Step0Form from "./Step0Form.js";

class Step0 extends React.Component {
	constructor(props) {
		super(props);

		//state值
		this.state = {
			form0 : {
				km : {},
				price1 : {},
				price2 : {},
				seat : {},
				fuel : {},
				gearbox : {},
				exhaust : {},
				brandandseries : {},
				buydate : {}
			}
		}
	}

	//当任何表单元素被更改的时候做的事情
	handleFormChange(changedFields){
		this.setState({
			form0: { ...this.state.form0, ...changedFields }
		});
	}

	render() {
		//检查下一步按钮是否能够被点击
		const checkdisable = () => {
			//什么是合法，同时满足下面2点：
			//所有的state值都必须有value属性。
			//所有的state值的errors属性不能有值。
			for(var k in this.state.form0){
				if(this.state.form0[k].value === undefined || this.state.form0[k].errors){
					return true;		//true表示不能点击
				}
			}
			 
			return false;		//false表示能够点击
		};

		return ( 
		 	<div>
		 		<WrappedStep0Form 
					{...this.state.form0} 
					onChange={this.handleFormChange.bind(this)}
				>
				</WrappedStep0Form>
				<Button 
					type="primary" 
					onClick={()=>{
						this.props.dispatch({"type":"addCar/changeStep" , "step" : 1})
						this.props.dispatch({"type":"addCar/changeForm0" , "form0" : this.state.form0})
					}}
					disabled={checkdisable()}
				>
					下一步
				</Button>
		 	</div>
		);
	}
}

export default connect()(Step0);