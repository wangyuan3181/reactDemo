import React from 'react';

import Sale from "../../../containers/Sale.js";

export default class Gujia extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Sale k="gujia" c="估价卖车">
					<h1>我是股价栏目</h1>
				</Sale>
			</div>
		);
	}
}
