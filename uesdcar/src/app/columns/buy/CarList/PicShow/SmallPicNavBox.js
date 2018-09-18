import React from 'react';
import {connect} from "dva";
import classnames from "classnames";

class SmallPicNavBox extends React.Component {
	constructor(props) {
		super(props);

		//第几页
		this.page = 0;
	}

	//得到新数据的时候，计算当前所在page
	componentWillReceiveProps(nextProps){
		//计算page
		this.page = Math.floor(nextProps.nowidx / 4);
		
	}

	// //门神
	shouldComponentUpdate(nextProps){
		//如果当前图集id变化了，此时必须等carimages引发的UPDAING阶段
		if(nextProps.nowid != this.props.nowid){
			return nextProps.carimages != this.props.carimages;
		}
		return true;
	}

	//组件更新之后，进行一个拉动，拉动到默认的位置去
	//为什么要在组件更新之后呢？因为组件更新之后能够决定新的ul数量、li的情况
	//DOM已经变化了，变化之后拉动。
	componentDidUpdate(){
		//拉动
		$(this.refs.unit).stop(true).animate({"left" : -310 * this.page} , 300);
	}

	//组件上树之后
	componentDidMount(){
		var self = this;
		//事件委托，让每一个span被触碰都有事情发生
		$(this.refs.navbar).delegate("span" , "mouseenter" , function(){
			//这里的$(this)指的是你触碰的span。
			//注意jQuery3中，$(this).data("i")等价于$(this).attr("data-i");
			var i = $(this).data("i");
			//拉动
			$(self.refs.unit).stop(true).animate({"left" : -310 * i} , 300);
			//jQuery在React、Vue编程中还是非常有用，因为有的时候就是要直接控制DOM
			//我们说MVVM是不控制DOM的，指的是不控制数据相关的DOM
			//jQuery这里做的是不更改任何的数据，就是美化层面的东西。
			$(this).addClass('cur').siblings().removeClass('cur');
		});

		//当鼠标离开大盒子的时候，拉动回当前的位置，cur复位
		$(this.refs.smallpicnavbox).mouseleave(function(){
			$(self.refs.unit).stop(true).animate({"left" : -310 * self.page} , 300);
			$(self.refs.navbar).find("span").eq(self.page).addClass('cur').siblings().removeClass('cur');
		});
	}

	render() {
		//props的解构
		const {nowalbum , carimages , nowid , nowidx} = this.props;
		 
		//如果这个数组还没有（MOUNTING阶段数据还没有回来，此时carimages[nowalbum]是undefined）
		if(!carimages[nowalbum]) carimages[nowalbum] = [];

		//显示ul和li，这里的算法和日历组件一样一样的，都是一维数组变为二维。
		const arr = carimages[nowalbum];
		//总页数
		const pageAmount = Math.ceil(arr.length / 4);
	 

		//显示ul和li，每个ul中有4个li，最后一个ul中可能不足4个。
		//ul就是页
		const showUlLis = () => {
			var DOMARR = [];

			for(let i = 0 ; i < pageAmount ; i++){
				DOMARR.push(
					<ul key={i}>
						{
							arr.slice(i * 4 , i * 4 + 4).map((item,index)=>{
								return <li 
									key={index} 
									className={classnames({"cur" : i * 4 + index == nowidx})}
									onClick={()=>{this.props.dispatch({"type":"picshow/changeNowIdx" , "nowidx" : i * 4 + index})}}
								>
									<img src={`carimages_small/${nowid}/${nowalbum}/${arr[i * 4 + index]}`} alt=""/>
								</li>
							})
						}
					</ul>
				)
			}
			return DOMARR;
		}

		//显示导航条按钮span
		const showSpans = () => {
			if(pageAmount == 1) return null;

			var DOMARR = [];
			for(let i = 0 ; i < pageAmount ; i++){
				DOMARR.push(<span 
					key={i}
					style={{"width" : (300 - (pageAmount - 1) * 6) / pageAmount + "px"}}
					className = {classnames({"cur" : i == this.page})}
					data-i={i}
				></span>)
			}
			return DOMARR;
		}

		return (
			<div className="smallpicnavbox" ref="smallpicnavbox" style={{"color":"white"}}>
				<div className="unit" ref="unit">
					{showUlLis()}
				</div>
				<div className="navbar" ref="navbar">
					{showSpans()}
				</div>
 
			</div>
		);
	}
}

export default connect(
	({picshow : {nowalbum , carimages , nowid , nowidx}}) => ({
		nowalbum,
		carimages,
		nowid,
		nowidx 
	})
)(SmallPicNavBox);