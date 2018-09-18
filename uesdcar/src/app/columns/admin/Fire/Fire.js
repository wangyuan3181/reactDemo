import React from 'react';

import Admin from "../../../containers/Admin.js";

export default class Fire extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Admin k="fire" v="开除员工">
				<div><h1>开除员工</h1></div>
			</Admin>
		);
	}
}
