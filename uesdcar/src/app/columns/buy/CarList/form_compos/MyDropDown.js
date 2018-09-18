import React from "react";
import classnames from "classnames";

import { Menu, Dropdown, Button } from 'antd';

 

export default (props) => {
	const menu = (
		<Menu  onClick={(v)=>{props.onChoose(v.key)}}>
			{
				props.options.map(item=>{
					return <Menu.Item key={item}>{item}</Menu.Item>
				})
			}
		</Menu>
	);


	return <div className="MyDropDown">
		{props.title}
		{" "}
		<Dropdown.Button overlay={menu}>
			{props.v || "不限"}
	    </Dropdown.Button>
	</div>
}