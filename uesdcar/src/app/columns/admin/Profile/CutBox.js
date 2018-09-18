import React from 'react';
import {Button} from "antd";

export default class CutBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isUpDone : false
		}

		this.cutFangLeft = 0;
		this.cutFangTop = 0;
		this.cutFangWidth = 100;
		this.cutFangHeight = 100;
	}
	
	//组件已经上树
	componentDidMount(){
		var i = 0;
		var self = this;
		this.timer = setInterval(function(){
			i++;
			if(i > 3) i = 0;
			$(self.refs.diandianem).html(".".repeat(i));
		},400);
	}

	//组件将要收到新的属性
	componentWillReceiveProps(nextProps){
		//发出对图片的URL请求
		var img = new Image();
		img.src = "/uploads/" + nextProps.picurl;
		//备份
		var self = this;
		//监听这个图片加载完毕
		img.onload = function(){
			clearInterval(self.timer);
			//改变done
			self.setState({
				isUpDone : true
			});

			//允许拖拽
			$(self.refs.cut_fang).draggable({
				//限制容器
				containment : $(self.refs.imgbox_wrap),
				//当用户拖拽的时候做的事情
				drag : function(event , ui){
					self.cutFangLeft = ui.position.left;
					self.cutFangTop = ui.position.top;

					$(self.refs.maoniimg).css({
						"left" : -self.cutFangLeft ,
						"top" : -self.cutFangTop
					});

					self.setPreviews();
				}
			});

			//允许改变尺寸
			$(self.refs.cut_fang).resizable({
				//限制容器
				containment : $(self.refs.imgbox_wrap),
				//限制比例
				aspectRatio: 1 / 1 ,
				//用户改变尺寸的时候做的事情
				resize : function(event , ui){
					self.cutFangHeight = ui.size.height;
					self.cutFangWidth = ui.size.width;

					self.setPreviews();
				}
			});
		}
	}

	doCut(){
		//准备好数据
		var rate = this.props.realW / this.props.imgW;
		var w = this.cutFangWidth * rate;
		var h = this.cutFangHeight * rate;
		var l = this.cutFangLeft * rate;
		var t = this.cutFangTop * rate;
		//发出Ajax请求，请求裁切！
		$.post("/docut" , {
			w,
			h,
			l,
			t,
			picurl : this.props.picurl
		},function(data){
			if(data.result == 1){
				window.closeXuanfu();
			}
		});
	}

	//设置预览图
	setPreviews(){
		// console.log(this.cutFangleft , this.cutFangTop , this.cutFangWidth , this.cutFangHeight);

		var self = this;
		//遍历每一个预览图框框
		$(this.refs.previewZone).find(".p").each(function(){
			//这个框框的宽度
			var w =  $(this).data("w");
			 
			$(this).find("img").css({
				width : self.props.imgW / self.cutFangWidth * w ,
				top : -self.cutFangTop / self.cutFangHeight * w,
				left : -self.cutFangLeft / self.cutFangWidth * w
			});
		});
	}

	render() {
		return (
			<div className="cutbox">
				{
					!this.state.isUpDone
					?
					<span className="loadingtip">图片正在上传<em ref="diandianem">...</em></span>
					:
					<div className="cutbox" style={{
						"width" : this.props.boxW + "px",
						"height" : this.props.boxH + "px",
						"padding" : this.props.padding + "px"
					}}>
						<div className="imgbox_wrap" ref="imgbox_wrap" style={{
							"width" : this.props.imgW + "px",
							"height" : this.props.imgH + "px"
						}}>
							<img src={`/uploads/${this.props.picurl}`} style={{
								"width" : this.props.imgW + "px",
								"height" : this.props.imgH + "px"
							}}/>

							<div className="cut_fang" ref="cut_fang">
								<img ref="maoniimg" src={`/uploads/${this.props.picurl}`} style={{
									"width" : this.props.imgW + "px",
									"height" : this.props.imgH + "px"
								}}/>
							</div>
							
							<div className="mask"></div>
						</div>
						<div className="previewZone" ref="previewZone">
							<div className="big_p p" data-w="160">
								<img src={`/uploads/${this.props.picurl}`}/>
							</div>
							<div className="mid_p p"  data-w="100">
								<img src={`/uploads/${this.props.picurl}`}/>
							</div>
							<div className="small_p p" data-w="60">
								<img src={`/uploads/${this.props.picurl}`}/>
							</div>

							<Button type="primary" onClick={()=>{this.doCut()}}>确定</Button>
							{" "}
							<Button>取消</Button>
						</div>
					</div>
				}
			</div>
		);
	}
}
