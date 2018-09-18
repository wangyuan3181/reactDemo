import React from 'react';
import {connect} from "dva";

class BigImgBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAutoPlay : false
		}
	}


	
	//门神
	shouldComponentUpdate(nextProps){
		//如果当前图集id变化了，此时必须等carimages引发的UPDAING阶段
		if(nextProps.nowid != this.props.nowid){
			return nextProps.carimages != this.props.carimages;
		}
		return true;
	}

	//组件将要更新
	componentWillUpdate({nowid , nowalbum , carimages , nowidx}){
		if(!carimages[nowalbum][nowidx]) return;
		//小菊花show
		$(this.refs.loading).show();
		//对大图发出请求
		var image = new Image();
		var src = `carimages/${nowid}/${nowalbum}/${carimages[nowalbum][nowidx]}`;
		image.src = src;
		//备份
		var self = this;
		//当大图加载完毕之后
		image.onload = function(){
			//替换图片的src
			$(self.refs.bigimg).attr("src" , src);
			//小菊花hide
			$(self.refs.loading).hide();
		}
	}



	render() {
		//props解构
		const {nowid , nowalbum , carimages , nowidx} = this.props;

		//大招
		if(!carimages[nowalbum]) return null;

		//计算图片总数
		const zongshu = carimages.view.length + carimages.inner.length + carimages.more.length + carimages.engine.length;
		//图集序
		const arr = ["view" , "inner" , "engine" , "more"];
		//当前所在相册序
		const albumidx = arr.indexOf(nowalbum);
		//总序
		var zongxu = 0;
		//加上之前的图集的和
		for(var i = 0 ; i < albumidx ; i++){
			zongxu += carimages[arr[i]].length;
		}
		//加零头
		zongxu += nowidx + 1;	

		return (
			<div className="bigimgbox">
				<div className="inner">
					<img ref="bigimg" src={`carimages_small/${nowid}/${nowalbum}/${carimages[nowalbum][nowidx]}`} className="bigimg"/>
					<p className="loading" ref="loading"></p>
					<div className="rightBtn" onClick={()=>{this.props.dispatch({"type":"picshow/goNext"})}}></div>
					<div className="leftBtn" onClick={()=>{this.props.dispatch({"type":"picshow/goLeft"})}}></div>

					<div className="picnumber">
						{zongxu} / {zongshu}
					</div>
					 
				</div>
			</div>
		);
	}
}

export default connect(
	({picshow : {nowid , nowalbum , carimages , nowidx}}) => ({
		nowid , nowalbum , carimages , nowidx
	})
)(BigImgBox);