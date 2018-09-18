import React from "react";
import classnames from "classnames";
import { Slider } from 'antd';
 
export default (props) => {
	var v = props.v ? props.v : props.defaultV;

	return <div>
		<Slider 
			range 
			value={v} 
			onChange={(v)=>{props.onChange(v)}}
			onAfterChange={(v)=>{props.onChoose(v)}}
		/>
	</div>
}