import React from 'react';

import Sale from "../../../containers/Sale.js";

export default class Zhuanrang extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Sale k="zhuanrang" c="车牌转让">
				<div>
					<h1>我是Zhuanrang栏目</h1>
				</div>
			</Sale>
		);
	}
}
