import React from 'react';
import { Divider , Row , Col } from "antd";
import MyForm from "./MyForm.js";
import CutBox from "./CutBox.js";

import "./Profile.less";

import Admin from "../../../containers/Admin.js";


export default class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowXuanfu : false,
			imgW : 0,
			imgH : 0,
			boxW : 0,
			boxH : 0,
			padding : 0,
			picurl :"" ,
			realW : 0, 
			realH :0
		}	


		 
 

		var self = this;

		//定义一个函数，弹出悬浮层
		window.openXuanfu = function(){
			self.setState({isShowXuanfu : true});
		}

		window.closeXuanfu = function(){
			self.setState({isShowXuanfu : false});

			$(self.refs.dianshi).attr("src" , "/pages/adminavatarform.html")
		}
 			
 		//图片上传完毕之后的回调
 		window.onUpDone = function(picurl , realW , realH){
 			// alert("后端点用了我，图片传完了" + picurl + realW + realH);
 			realW = parseInt(realW);
 			realH = parseInt(realH);
 			//得到图片的宽高比
 			var wrateh = realW / realH;

 			//定义一些常量
 			const maxBoxWidth = 700;
 			const minBoxWidth = 450;
 			const maxBoxHeight = 500;
 			const minBoxHeight = 350;
 			const padding = 10;
 			const rightPart = 180;

 			//计算图片要显示的宽度、高度
 			var imgW = realW;
 			var imgH = realH;
 			//盒子要显示的宽度、高度
 			var boxW;
 			var boxH;

 			//进行一些计算，计算盒子的真实要显示的宽度、高度
 			if(realW > maxBoxWidth - rightPart - 2 * padding){
 				imgW = maxBoxWidth - rightPart - 2 * padding;
 				//让高度按比例变化
 				imgH = imgW / wrateh;
 			}
 			//这里不跳楼，继续验收
 			if(imgH > maxBoxHeight - 2 * padding){
 				imgH = maxBoxHeight - 2 * padding;
 				//让宽度按比例变化
 				imgW = imgH * wrateh; 
 			}

 			//决定盒子的尺寸
 			boxW = imgW + 180 + 2 * padding;
 			boxH = imgH + 2 * padding;

 			//验收
 			if(boxW < minBoxWidth){
 				boxW = minBoxWidth;
 			}

 			if(boxH < minBoxHeight){
 				boxH = minBoxHeight;
 			}

 			self.setState({
				imgW  ,
				imgH  ,
				boxW  ,
				boxH  ,
				padding ,
				picurl ,
				realW , 
				realH
 			});
 		}
	}

	render() {
		
		return (
			<Admin k="profile" c="员工信息修改">
				<div>
					<h1>员工个人资料修改{this.state.boxW}</h1>
					<Divider />
					<Row>
						<Col span={12}>
							<MyForm></MyForm>
						</Col>
						<Col span={12}>
							<iframe ref="dianshi" src="/pages/adminavatarform.html" frameBorder="0" width="600" height="300"></iframe>
						</Col>
					</Row>
					{
						this.state.isShowXuanfu
						?
						<div className="xuanfuceng">
							<CutBox 
								imgH={this.state.imgH} 
								imgW={this.state.imgW} 
								boxW={this.state.boxW}
								boxH={this.state.boxH}
								padding={this.state.padding}
								realW={this.state.realW}
								realH={this.state.realH}
								picurl={this.state.picurl}
							></CutBox>
						</div>
						:
						null
					}
				</div>
			</Admin>
		);
	}
}
