import React from "react";
import classnames from "classnames";

import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default (props) => {
	return <div>
		<CheckboxGroup 
			options={props.options} 
			value={props.v}  
			onChange={(v)=>{props.onChoose(v)}}
		/>
		
	</div>
}