import React from 'react';
import {Table , Input , Divider , Button} from "antd";
import {connect} from "dva";

import User from "../../../containers/User.js";

class UserList extends React.Component {
	constructor(props) {
		super(props);

		props.dispatch({"type":"userlist/init"});
	}

	render() {
		const columns = [
			{
				title: '编号',
				dataIndex: 'id',
				key: 'id',
				sorter : true
			},
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
				sorter : true
			},
			{
				title: '手机号',
				dataIndex: 'mobile',
				key: 'mobile',
				sorter : true
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				sorter : true
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
				sorter : true
			},
			{
				title: '城市',
				dataIndex: 'city',
				key: 'city',
				sorter : true
			},
			{
				title: '身份证',
				dataIndex: 'idcard',
				key: 'idcard',
				sorter : true
			},
			{
				title: '更多',
				render : () => {
					return <div>
						<Button>查看更多</Button>
					</div>
				}
			}
		];

		return (
			<User k="userlist" v="用户大表">
				<div>
					<h1>用户信息（内部机密）</h1>
					<Divider></Divider>

					<Input onChange={(e)=>{
						this.props.dispatch({"type" : "userlist/changeKeyword" , "keyword" : e.target.value})
					}}></Input>

					<div style={{"height" : "10px"}}></div>

					<b>共{this.props.pagination.total}条</b>
					<Table 
						rowKey="id" 
						dataSource={this.props.users} 
						columns={columns} 
						pagination={{
							current : this.props.pagination.page,
							total : this.props.pagination.total ,
							pageSize : this.props.pagination.pagesize,
							showSizeChanger : true,
							pageSizeOptions : ["5" , "10" , "20" , "50" , "100"]
						}}
						onChange={(pagination, filters, sorter)=>{
							this.props.dispatch({
								"type" : "userlist/changePage" , 
								"page" : pagination.current , 
								"pagesize" : pagination.pageSize
							});
							this.props.dispatch({
								"type" : "userlist/changeSort" , 
								"sortby" :  sorter.field || "id", 
								"sortdirection" : sorter.order || "ascend"
							});
						}}
					/>
				</div>
			</User>
		);
	}
}


export default connect(
	({userlist}) => ({
		users : userlist.users,
		pagination : userlist.pagination
	})
)(UserList);