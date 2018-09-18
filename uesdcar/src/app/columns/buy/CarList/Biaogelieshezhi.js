import React from 'react';

export default class Biaogelieshezhi extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		var self = this;
	 
	    $(this.refs.ul1).sortable({
			connectWith: "ul",		//我也不知道啥意思，API上抄的
			//当用户进行ul1排序的时候
			stop : function(){
				var arr = [];
				$(self.refs.ul1).find("li").each(function(){
					arr.push($(this).data("key"));
				});
				//这里每当用户改变ul1的顺序，立即改变父亲的临时数组
				self.props.setArr(arr);
			}
	    });
	 
	    $(this.refs.ul2).sortable({
			connectWith: "ul",		//我也不知道啥意思，API上抄的
			dropOnEmpty: false , 	//我也不知道啥意思，API上抄的
			stop : function(){
				var arr = [];
				$(self.refs.ul1).find("li").each(function(){
					arr.push($(this).data("key"));
				});
				//这里每当用户改变ul1的顺序，立即改变父亲的临时数组
				self.props.setArr(arr);
			}
	    });
	 	
	 	//我也不知道啥意思，API上抄的
	    $(this.refs.ul1 , this.refs.ul2).disableSelection();
	}

	render() {
		console.log("sadffffffffffffffffffffffffffffD")
 
		console.log(this.props.arr)
		console.log("sadffffffffffffffffffffffffffffD")
		const kvobj = {
			"id" : "编号",
			"avatar":"缩略图",
			"type":"车型",
			"seat":"座位数",
			"brand":"品牌车系",
			"color":"颜色",
			"price":"售价",
			"km":"里程",
			"engine":"发动机",
			"buydate":"购买日期",
			"license":"是否上牌",
			"exhaust":"排放标准",
			"gearbox":"变速箱",
			"fuel":"燃料"
		}
		  
		//决定有的和没有的
		var nohas = Object.keys(kvobj).filter(item=>!this.props.arr.includes(item));

		return (
			<div className="biaogelieshezhi">
				<h3>当前：</h3>
				<ul ref="ul1" className="ul1">
					{
						this.props.arr.map((item,index)=>{
							return <li 
								className="ui-state-default" 
								data-key={item}
								key={index}
							>
								{kvobj[item]}
							</li>
						})
					}
						
				</ul>

				<div className="cl"></div>

				<h3>可以选择：</h3>
				<ul ref="ul2" className="ul2">
					 {
						nohas.map(item=>{
							return <li 
								className="ui-state-default" 
								data-key={item}
								key={kvobj[item]}
							>
								{kvobj[item]}
							</li>
						})
					}
				</ul>
			</div>
		);
	}
}
