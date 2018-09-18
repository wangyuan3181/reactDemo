import React from 'react';

import Sale from "../../../containers/Sale.js";

export default class Yijian extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<Sale k="yijian" c="一键卖车">
					<h1>我是一键栏目</h1>
				</Sale>
			 
		);
	}
}
