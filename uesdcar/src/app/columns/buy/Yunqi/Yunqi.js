import React from 'react';

import Buy from "../../../containers/Buy.js";

export default class Yunqi extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Buy k="yunqi" c="运气选车">
				<div>
					<h1>我是运气栏目</h1>
				</div>
			</Buy>
		);
	}
}
