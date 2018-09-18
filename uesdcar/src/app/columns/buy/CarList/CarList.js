import React from 'react';

import CarFilterBox from "./CarFilterBox.js";
import CarTableBox from "./CarTableBox.js";
import PicShow from "./PicShow/PicShow.js";

import Buy from "../../../containers/Buy.js";

import "./CarList.less";

import {connect} from "dva";

class CarList extends React.Component {
	constructor(props) {
		super(props);

		props.dispatch({"type" : "carlist/init"});

		this.state = {
			xuanfuId : 0 , 			//悬浮层显示的id
			isShowXuanfu : false //是否显示悬浮层
		}
	}

	//设置悬浮层的id
	setXuanfu(xuanfuId , isShowXuanfu){
		this.setState({xuanfuId , isShowXuanfu});
	}
 
	render() {
		return (
				<Buy k="carlist" c="大表选车">
					<div>
						<CarFilterBox></CarFilterBox>
						<CarTableBox 
							setXuanfu={this.setXuanfu.bind(this)}
						></CarTableBox>

						{
							this.state.isShowXuanfu
							?
							<div className="xuanfu">
								<div className="inner_ccc">
									<div 
										className="closeBtn" 
										onClick={()=>{
											this.setState({isShowXuanfu : false})
										}}
									>
										×
									</div>
									<PicShow id={this.state.xuanfuId}></PicShow>
								</div>
							</div>
							:
							null
						}
					</div>
				</Buy>
		);
	}
}

export default connect()(CarList);