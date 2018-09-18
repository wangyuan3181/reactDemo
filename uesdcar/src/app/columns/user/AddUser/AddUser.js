import React from 'react';

import User from "../../../containers/User.js";

export default class AddUser extends React.Component {
	 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<User k="adduser" c="添加用户">
				<div>
					<h1>添加用户</h1>
				</div>
			</User>
		);
	}
}
