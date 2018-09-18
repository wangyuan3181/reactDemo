import React from 'react';
import {Row , Col , Tag} from "antd";
import moment from "moment";

import {connect} from "dva";
import MyTab from "./form_compos/MyTab.js";
import MyTag from "./form_compos/MyTag.js";
import Series from "./form_compos/Series.js";
import MyCheckBox from "./form_compos/MyCheckBox.js";
import MyRange from "./form_compos/MyRange.js";
import MyDropDown from "./form_compos/MyDropDown.js";
import MyCanlendar from "./form_compos/MyCanlendar.js";

class CarFilterBox extends React.Component {
	 
	constructor(props) {
		super(props);

		this.state = {
			"char" : "",
			"price" : [0,100],	//受控组件用的
			"km" : [0,100]
		}
	}

	render() {
		//现在props中的nowfilters是一个数组，这个数组的形如:
		//[
			// {"k" : "price" , "v" : [0,100]},
			// {"k" : "km" , "v" : [0,100]},
			// {"k" : "engined" , "v" : ["1.0L","2.0T"]}
		//]
		//我们就要提炼变量，便于使用
		var data = {
			"brand" : "",
			"series" : "",
			"color" : [],
			"seat" : [],
			"engine" : [],
			"exhaust" : [],
			"type" : [],
			"fuel" : "",
			"gearbox" : "",
			"license" : "",
			"buydate" : []
		}
		this.props.nowfilters.forEach(item => {
			data[item.k] = item.v
		});
 

		return (
			<div className="CarFilterBox">
				<Row>
					<Col span={2}>品牌</Col>
					<Col span={22}>
						<MyTab 
							onChoose={(v , char)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "brand" , v});
								this.setState({char});
							}}
							brand={data.brand}
						></MyTab>
					</Col>
				</Row>
				<Row>
					<Col span={2}>车系</Col>
					<Col span={22}>
						<Series 
							brand={data.brand} 
							series={data.series}
							char={this.state.char} 
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "series" , v});
							}}
						></Series>
					</Col>
				</Row>
				<Row>
					<Col span={2}>颜色</Col>
					<Col span={22}>
						<MyCheckBox 
							v={data.color}
							options={["白","红","黑","蓝","绿","香槟","黄","咖啡","银灰","银","灰","粉","橘"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "color" , v});
								if(v.length == 0){
									this.props.dispatch({"type":"carlist/removeFilter" , "k" : "color"});
								}
							}}
						></MyCheckBox>
					</Col>
				</Row>
				<Row>
					<Col span={2}>车型</Col>
					<Col span={22}>
						<MyCheckBox 
							v={data.type}
							options={["A级轿车","B级轿车","C级轿车","大型SUV","中型SUV","小型SUV","面包车"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "type" , v});
								if(v.length == 0){
									this.props.dispatch({"type":"carlist/removeFilter" , "k" : "type"});
								}
							}}
						></MyCheckBox>
					</Col>
				</Row>
				
				<Row>
					<Col span={2}>座位数</Col>
					<Col span={22}>
						<MyCheckBox 
							v={data.seat}
							options={["2","4","5","7","7座以上"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "seat" , v});
								if(v.length == 0){
									this.props.dispatch({"type":"carlist/removeFilter" , "k" : "seat"});
								}
							}}
						></MyCheckBox>
					</Col>
				</Row>
				<Row>
					<Col span={2}>发动机</Col>
					<Col span={22}>
						<MyCheckBox 
							v={data.engine}
							options={["1.0L","1.2L","1.4L","1.6L","1.6T","1.8L","2.0L","3.0L","5.0L"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "engine" , v});
								if(v.length == 0){
									this.props.dispatch({"type":"carlist/removeFilter" , "k" : "engine"});
								}
							}}
						></MyCheckBox>
					</Col>
				</Row>
				<Row>
					<Col span={2}>排量</Col>
					<Col span={22}>
						<MyCheckBox 
							v={data.exhaust}
							options={["国一","国二","国三","国四","国五"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "exhaust" , v});
								if(v.length == 0){
									this.props.dispatch({"type":"carlist/removeFilter" , "k" : "exhaust"});
								}
							}}
						></MyCheckBox>
					</Col>
				</Row>
				<Row>
					<Col span={2}>价格（万元）</Col>
					<Col span={12}>
						<MyRange
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "price" , v}); 
							}}
							onChange={(v)=>{
								this.setState({"price" : v})
							}}
							v={this.state.price}
							defaultV={[0,100]}
						></MyRange>
					</Col>
				</Row>
				<Row>
					<Col span={2}>公里（万km）</Col>
					<Col span={12}>
						<MyRange
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "km" , v}); 
							}}
							onChange={(v)=>{
								this.setState({"km" : v})
							}}
							v={this.state.km}
							defaultV={[0,100]}
						></MyRange>
					</Col>
				</Row>
				<Row>
					<Col span={2}>购车日期</Col>
					<Col span={12}>
						<MyCanlendar 
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "buydate" , "v": [v[0].format("x") , v[1].format("x")]}); 
							}}
							buydate={
								data.buydate[0]								
								?
								[moment(Number(data.buydate[0])) , moment(Number(data.buydate[1]))]
								:
								[]
							}

						></MyCanlendar>
					</Col>
				</Row>
				<Row>
					<Col span={2}>杂项</Col>
					<Col span={12}>
						<MyDropDown 
							title="燃料"
							options = {["汽油","柴油","纯电动","油电混合"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "fuel" , v}); 
							}}
							v={data.fuel}
						></MyDropDown>
						<MyDropDown 
							title="变速箱"
							options = {["手动","自动","手自一体"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "gearbox" , v}); 
							}}
							v={data.gearbox}
						></MyDropDown>
						<MyDropDown 
							title="是否含牌照"
							options = {["是","否"]}
							onChoose={(v)=>{
								this.props.dispatch({"type":"carlist/addOrChangeFilter" , "k" : "license" , v}); 
							}}
							v={data.license}
						></MyDropDown>
					</Col>
				</Row>
				<Row className="lastRow">
					<Col span={2}>当前：</Col>
					<Col span={22}>
						<MyTag 
							nowfilters={this.props.nowfilters}
							onClose={(k)=>{
								this.props.dispatch({"type":"carlist/removeFilter" , k});
								//如果你删除了price，此时要恢复0~100
								if(k == "price"){
									this.setState({"price" : [0,100]})
								}else if(k == "km"){
									this.setState({"km" : [0,100]})
								}
							}}
						></MyTag>
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect(
	({carlist}) => ({
		nowfilters : carlist.nowfilters
	})
)(CarFilterBox);