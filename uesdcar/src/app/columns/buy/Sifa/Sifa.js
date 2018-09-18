import React from 'react';

import Buy from "../../../containers/Buy.js";

export default class Sifa extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Buy k="sifa" c="司法拍卖">
				<div>
					<h1>我是司法栏目</h1>
				</div>
			</Buy>
		);
	}
}
