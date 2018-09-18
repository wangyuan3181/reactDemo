import React from 'react';
import { DatePicker } from 'antd'; 
const {RangePicker} = DatePicker;
import moment from "moment";

export default class MyCanlendar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<RangePicker 
					value={this.props.buydate}
					onChange={(v)=>{this.props.onChoose(v)}} 
					allowClear={false}
				/>
			</div>
		);
	}
}
