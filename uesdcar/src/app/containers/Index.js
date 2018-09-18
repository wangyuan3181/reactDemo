import React from 'react';
import { Layout, Menu, Breadcrumb , Row , Col} from 'antd';
const { Header, Content, Footer } = Layout;

import App from "./App.js";

import Tu1 from "../columns/index/Tu1.js";

export default class Index extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<App k="index">
				<Content style={{ padding: '0 50px' }}>
			      	<div style={{padding: 24, minHeight: 280 }}>
			      		<Row gutter={16} >
							<Col span={6} className="w">
								<h1>123043万元</h1>
							</Col>
							<Col span={6} className="w">
							2
							</Col>
							<Col span={6} className="w">
							3
							</Col>
							<Col span={6} className="w">
								
							</Col>
			      		</Row>
			      		<Row style={{"marginTop":"20px"}}>
			      			<Col style={{"height":"460px"}} className="w">
			      				<Tu1></Tu1>
			      			</Col>
			      		</Row>
			      	</div>
			    </Content>
			</App>
		);
	}
}
