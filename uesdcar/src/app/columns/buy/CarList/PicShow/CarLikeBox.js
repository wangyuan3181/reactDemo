import React from 'react';
import {connect} from "dva";
import classnames from "classnames";

class CarLikeBox extends React.Component {
	constructor(props) {
		super(props);

		//滑块的top值，是唯一的信号量，滑块的top值和ul的top值是成比例的，所以没有必要给ul的top值也设一个信号量。
		this.top = 0;		

		//组件的属性是为了多个生命周期传值用的。
		this.boxH = 0;
		this.bH = 0;
		this.rate = 0;
	}

	//组件上树之后，添加两个事件监听。事件监听
	componentDidMount(){
		var self = this;
		//$()函数的效率不高，所以一般我们都是找到DOM之后存为变量，变量为以$开头，暗示这是一个jQuery对象
		const $ul = $(this.refs.ul);
		const $b = $(this.refs.b);

		//让b（滑块）可以被拖拽
		$(this.refs.b).draggable({
			//限制容器
			"containment" : "parent",
			//当拖拽的时候做的事情：拖拽滑块的时候，让ul向上移动。
			"drag" : function(event , ui){
				//当前滑块的位置，这个API：http://api.jqueryui.com/draggable/#event-drag
				self.top = ui.position.top;
				//让ul按比例移动
				$ul.css("top" , -self.top * self.rate);
			}
		});

		//鼠标滚轮事件
		$(this.refs.box).mousewheel(function(event , delta){
			//鼠标滚轮向下滚，delta是-1，而top期望增加，所以-号。
			self.top -= delta * 10;
			//验收
			if(self.top < 0) self.top = 0;
			if(self.top > self.boxH - self.bH) self.top = self.boxH - self.bH;
			//让b和ul按信号量和信号量的倍数进行移动
			$b.css("top" , self.top);
			$ul.css("top" , -self.top * self.rate)
		});
	}

	//数据来了，render之后
	componentDidUpdate(){
		//得到ul列表的高度
		this.ulH = $(this.refs.ul).height();
		//得到盒子的高度，ul在盒子中溢出
		this.boxH = $(this.refs.box).height();
		//比例
		this.rate = this.ulH / this.boxH;	//应该大于1
		//如果比例小于1，说明不需要滑块和滑道，都隐藏掉。
		if(this.rate <= 1){
			$(this.refs.bar).hide();
			$(this.refs.b).hide();
		}else{
			$(this.refs.bar).show();
			$(this.refs.b).show();
		}
		//计算滑块的高度
		this.bH = this.boxH / this.rate;
		//设置滑块的高度
		$(this.refs.b).css("height" , this.bH);
	}

	render() {
		const {nowid , dispatch} = this.props;

		return (
			<div className="carlikebox" ref="box">
				<ul ref="ul">
					{
						this.props.carlikes.map(item=>{
							return <li 
								key={item.id} 
								className={classnames({"cur" : nowid == item.id})}
								onClick={()=>{dispatch({"type":"picshow/init","nowid":item.id})}}
							>
								{item.color}色
								{new Date(item.buydate).getFullYear()}年
								{Math.round(item.km / 100) / 100}万公里
								{item.price}万元
								{item.engine}
							</li>
						})
					}
					 
				</ul>
				<div className="bar">
					<b ref="b"></b>
				</div>
			</div>
		);
	}
}

export default connect(
	({picshow}) => ({
		"carlikes" : picshow.carlikes ,
		"nowid" : picshow.nowid
	})
)(CarLikeBox)
