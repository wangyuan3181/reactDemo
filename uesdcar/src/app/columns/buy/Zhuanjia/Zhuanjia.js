import React from 'react';

import Buy from "../../../containers/Buy.js";

export default class Zhuanjia extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Buy k="zhuanjia" c="专家荐车">
				<div>
					<h1>我是专家栏目</h1>
				</div>
			</Buy>
		);
	}
}
