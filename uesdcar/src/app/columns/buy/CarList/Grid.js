import React from 'react';
import { Select, Radio , Row , Col , Pagination } from 'antd';
const Option = Select.Option;
import {connect} from "dva";

class Grid extends React.Component {
	 
	constructor(props) {
		super(props);

		this.state = {
			"value" : "A",
			"col" : 4 , 
			"row" : 5   //网格形式
		}
 

		//直接派遣一个更改页面pagesize的动作
		props.dispatch({"type" : "carlist/changePage" , pagesize : this.state.col * this.state.row})
	}

	render() {
		//显示小格内容
		const showGridContent = (n) => {
			const thecar = this.props.cars[n];
			if(!thecar) return null;
			return <div>
				<Row>
					<Col span={18} offset={3}>
						<img className="zhongtu" src={`/carimages_small/${thecar.id}/view/${thecar.avatar}`} alt=""/>
					</Col>
				</Row>
				<Row>
					<Col span={18} offset={3}>
						<h4>{thecar.brand}</h4>
						<h4>{thecar.series}</h4>
						<h4>{thecar.km}</h4>
						<h4>{thecar.price}</h4>
					</Col>
				</Row>
			</div>
		}

		//放二维数组
		var ARR = [];
		for(var i = 0 ; i < this.state.row ; i++){
			var temp = [];
			for(var j = 0 ; j < this.state.col ; j++){
				temp.push(
					<Col key={j} className="grid" span={24 / this.state.col}>
						{showGridContent(i * this.state.col + j)}
					</Col>
				)
			}
			ARR.push(<Row key={i}>{temp}</Row>)
		}



		return (
			<div>
				<Radio.Group value={this.state.value} onChange={(e)=>{
					this.setState({
						col : e.target.col,
						row : e.target.row,
						value : e.target.value
					});

					//派遣一个action
					this.props.dispatch({"type" : "carlist/changePage" , pagesize :  e.target.col *  e.target.row})
				}}>
					<Radio.Button value="A" col="4" row="5">4 * 5</Radio.Button>
					<Radio.Button value="B" col="3" row="5">3 * 5</Radio.Button>
					<Radio.Button value="C" col="2" row="5">2 * 5</Radio.Button>
				</Radio.Group>
				<div className="h20"></div>

				{ARR}

				<Pagination 
					current={this.props.pagination.page} 
					total={this.props.pagination.total} 
					pageSize={this.props.pagination.pagesize}
					onChange={(page)=>{
						this.props.dispatch({"type" : "carlist/changePage" , page : page , pagesize : this.state.row * this.state.col})
					}}
				/>
			</div>
		);
	}
}

export default connect(
	({carlist}) => ({
		"pagination" : carlist.pagination,
		"cars" : carlist.cars
	})
)(Grid);