import React from 'react';
import {connect} from "dva";
import {Table , Row , Col , Modal ,Button , Icon , Select, Radio , Menu, Dropdown} from "antd";
import moment from "moment";
import colmuns from "./api/colmuns.js";
import _ from "lodash/fp";
const Option = Select.Option;


import Biaogelieshezhi from "./Biaogelieshezhi.js";
import Grid from "./Grid.js";

class CarTableBox extends React.Component {
	 
	constructor(props) {
		super(props);

		this.state = {
			isShowBiaogelieshezhi : false ,
			cols : (function(){
				if(localStorage.getItem("ershouchecols")){
					return JSON.parse(localStorage.getItem("ershouchecols"));
				}else{
					return ["id" , "avatar" , "brand" , "price" , "km" , "type" , "engine" ]
				}
			})(),
			showtype : "table"
		}
	}

	//组件已经上树
	componentDidMount(){
		var self = this;
		//委托，点击缩略图
		$(this.refs.CarTableBox).delegate(".suoluetu" , "click" , function(){
			self.props.setXuanfu($(this).data("id") , true);
		})
	}

	//设置显示的列
	getCols(cols){
		var ARR = [];
		for(var i = 0 ; i < cols.length ; i++){
			for(var j = 0 ; j < colmuns.length ; j++){
				if(cols[i] == colmuns[j].dataIndex){
					ARR.push(colmuns[j])
				}
			}
		}
		
		//每行尾部的。。。菜单
		const menu = (
		  <Menu>
		    <Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">加入对比</a>
		    </Menu.Item>
		    <Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">查看车主信息</a>
		    </Menu.Item>
		    <Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">查看车辆信息</a>
		    </Menu.Item>
		     <Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">查看网盘信息</a>
		    </Menu.Item>
		  </Menu>
		);

		//查看资料按钮
		ARR.push({
			title: '查看资料',
			dataIndex: 'id',
			key: 'compare',
			render : (text , record) => {
				//查看当前这个id的车在不在已经对比的队列中
				return  <Dropdown overlay={menu} placement="bottomLeft">
			      	<Button><Icon type="ellipsis"></Icon></Button>
			    </Dropdown>
			}
		})
		return ARR;
	}

	render() {

		//临时数组，克隆state中的cols数组，这样才能保证state只读
		var arr = _.clone(this.state.cols);
		//改变临时数组，为什么不直接改变state呢？因为用户可能不点击ok，而是取消
		const setArr = (_arr) => {
			arr = _arr;
		}
		 
		return (
			<div className="CarTableBox" ref="CarTableBox">
				<Row justify={"end"}>
					<Col span={16}>
						<div className="tip">共{this.props.pagination.total}辆车符合要求 当前{this.props.pagination.page} / {Math.ceil(this.props.pagination.total / this.props.pagination.pagesize)}页</div>
					</Col>
					<Col span={8}>

					
						<Radio.Group className="radioGroup"  value={this.state.showtype} onChange={
							(e)=>{
								this.setState({showtype : e.target.value})
							}
						}>
							<Radio.Button value="table">列表视图</Radio.Button>
							<Radio.Button value="grid">网格视图</Radio.Button>
						</Radio.Group>

						<Button 
							className="btnbtn"
							type="primary" 
							icon="setting" 
							shape="circle"
							onClick={()=>{this.setState({isShowBiaogelieshezhi : true})}}
						></Button>
					</Col>
				</Row>

				<Modal
					title="表格列设置"
					visible={this.state.isShowBiaogelieshezhi}
					onOk={()=>{
						console.log(arr)
						this.setState({cols : arr , isShowBiaogelieshezhi : false});
						//在本地存储中持久一份，这种东西不用上数据库，直接上本地即可
						localStorage.setItem("ershouchecols" , JSON.stringify(arr));
					}}
					onCancel={()=>{this.setState({"isShowBiaogelieshezhi" : false})}}
					width={900}
					destroyOnClose={true}
		        >
					<Biaogelieshezhi setArr={setArr} arr={arr}></Biaogelieshezhi>
		        </Modal>
				
				{
					this.state.showtype == "grid"
					?
					<Grid></Grid>
					:
					<Table 
						rowKey="id" 
						dataSource={this.props.cars} 
						columns={this.getCols(this.state.cols)} 
						pagination={{
							current : this.props.pagination.page,
							total : this.props.pagination.total ,
							pageSize : this.props.pagination.pagesize,
							showSizeChanger : true,
							pageSizeOptions : ["5" , "10" , "20" , "50" , "100"]
						}}
						onChange={(pagination, filters, sorter)=>{
							this.props.dispatch({
								"type" : "carlist/changePage" , 
								"page" : pagination.current , 
								"pagesize" : pagination.pageSize
							});
							this.props.dispatch({
								"type" : "carlist/changeSort" , 
								"sortby" :  sorter.field || "id", 
								"sortdirection" : sorter.order || "ascend"
							});
						}}
					/>
				}


				<div className="pkkuang">
					<h1>{this.props.nowincompare.length}</h1>
					<Button>PK</Button>
				</div>
			</div>
		);
	}
}

export default connect(
	({carlist , compare}) => ({
		cars : carlist.cars,
		pagination : carlist.pagination,
		nowincompare : compare.nowincompare
	})
)(CarTableBox);