import React from 'react';
import {connect} from "dva";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import {push} from "react-router-redux";
 
import "./App.less";
 
class App extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<Layout>
					<Header className="header">
						<div className="logo"></div>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={[this.props.k]}
							style={{ lineHeight: '64px' }}
							onClick={(e)=>{
								this.props.dispatch(push(e.item.props.root))
							}}
						>
							<Menu.Item key="index" root="/">首页</Menu.Item>
							<Menu.Item key="buy"   root="/buy/carlist">买车</Menu.Item>
							<Menu.Item key="sale"  root="/sale/addcar">卖车</Menu.Item>
							<Menu.Item key="user"  root="/user/userlist">用户</Menu.Item>
							<Menu.Item key="admin" root="/admin/profile">管理员</Menu.Item>
							<Menu.Item key="tingchechang" root="/tingchechang">停车场</Menu.Item>
						</Menu>
					</Header>
	  			</Layout>
				{
					this.props.children
				}
			</div>
		);
	}
}

export default connect()(App);