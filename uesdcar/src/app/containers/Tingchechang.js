import React from 'react';
import { Layout, Menu, Breadcrumb , Row , Col} from 'antd';
const { Header, Content, Footer } = Layout;

import App from "./App.js";

//模拟数据
const data = [
	{"x" : 0 , "y" : 0 , "no" : "A001"},
	{"x" : 100 , "y" : 0 , "no" : "A002"},
	{"x" : 200 , "y" : 0 , "no" : "A003"},
	{"x" : 300 , "y" : 0 , "no" : "A004"},
	{"x" : 400 , "y" : 0 , "no" : "A005"},
	{"x" : 500 , "y" : 0 , "no" : "A006"},
	{"x" : 600 , "y" : 0 , "no" : "A007"},
	{"x" : 700 , "y" : 0 , "no" : "A008"},
	{"x" : 800 , "y" : 0 , "no" : "A009"},
	{"x" : 900 , "y" : 0 , "no" : "A010"},
	{"x" : 1000 , "y" : 0 , "no" : "A011"},
	{"x" : 1100 , "y" : 0 , "no" : "A012"},
	{"x" : 1200 , "y" : 0 , "no" : "A013"},
	{"x" : 1300 , "y" : 0 , "no" : "A014"},
	{"x" : 1400 , "y" : 0 , "no" : "A015"},
	{"x" : 1500 , "y" : 0 , "no" : "A016"},
	{"x" : 0 , "y" : 180 , "no" : "B001"},
	{"x" : 100 , "y" : 180 , "no" : "B002"},
	{"x" : 200 , "y" : 180 , "no" : "B003"},
	{"x" : 300 , "y" : 180 , "no" : "B004"}
]

export default class Tingchechang extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.canvas = this.refs.canvas;
		this.ctx = this.canvas.getContext("2d");

		//当前倍数
		var scale = 1;
	
		 
		//画车位
		this.drawCheweis();

		
		var sx = 0;
		var sy = 0;
		//拖拽事件监听
		var self = this;
		$(this.canvas).bind("mousedown" , function(e){
			var x = e.offsetX;
			var y = e.offsetY;
			self.ctx.save();
			self.ctx.scale(scale , scale);
			self.ctx.scale(scale , scale);
			 
			$(self.canvas).bind("mousemove" , function(e){
				var dx = e.offsetX - x;
				var dy = e.offsetY - y;
 	
 				//清屏
				self.ctx.clearRect(-15000,-15000,100000,100000);

				x = e.offsetX;
				y = e.offsetY;

				self.ctx.translate(dx , dy);
				//画车位
				self.drawCheweis(); 
			});
		});

		//鼠标抬起
		$(this.canvas).bind("mouseup" , function(e){
			$(self.canvas).unbind("mousemove");
			self.ctx.restore();
		});

		//滚轮
		$(this.canvas).mousewheel(function(e , delta){
			scale += delta / 10;

			if(scale > 3) scale = 3;
			if(scale < 0.3) scale = 0.3;

			console.log(scale)
			//清屏
			self.ctx.clearRect(-15000,-15000,100000,100000);
			//设置倍数
			self.ctx.save();
			self.ctx.scale(scale , scale)
			//画车位
			self.drawCheweis(); 
			self.ctx.restore();
			
		})
	}

	//画车位
	drawCheweis(){
		for(var i = 0 ; i < data.length ; i++){
			this.ctx.strokeRect(data[i].x , data[i].y , 100 , 150);
			this.ctx.textAlign = "center";
			this.ctx.font="30px consolas";
			this.ctx.fillText(data[i].no , data[i].x + 50 , data[i].y + 75);
		}
	}

	render() {
		return (
			<App k="tingchechang">
				<Content style={{padding: '50px 50px' }}>
			     	<div style={{"width":"1200px" ,"height":"500px" , "margin" : "0 auto" , "background":"white"}}>
			     		<canvas ref="canvas" width="1200" height="500"></canvas>
			     	</div>
			    </Content>
			</App>
		);
	}
}
