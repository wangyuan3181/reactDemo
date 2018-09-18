import React from 'react';
import {connect} from "dva";
import classnames from "classnames";

class AlbumChooseBox extends React.Component {
 
	constructor(props) {
		super(props);

		//四个标签，DOM是根据这个数组循环出来的
		this.albumLis = [
			{"chinese" : "外观" , "english" : "view"},
			{"chinese" : "内饰" , "english" : "inner"},
			{"chinese" : "结构及发动机" , "english" : "engine"},
			{"chinese" : "更多细节" , "english" : "more"}
		];
	}

	render() {
		const nowalbum = this.props.nowalbum;
		const carimages = this.props.carimages;

		//验证数据有效性，如果carimages.view是undefined（MOUNTING阶段）
		//此时不再进行渲染，而是return一个null。
		if(!carimages.view) return null;

		return (
			<div className="albumchoose">
				<ul>
					{
						this.albumLis.map(item => {
							return <li
								key={item.english}
								className={classnames({"cur" : nowalbum == item.english})}
								onClick={()=>{this.props.dispatch({"type":"picshow/changeNowAlbum" , "nowalbum" : item.english})}}
							>
								{item.chinese}（{carimages[item.english].length}）
							</li>
						})
					}
				</ul>
			</div>
		);
	}
}

export default connect(
	({picshow}) => ({
		"carimages" : picshow.carimages,
		"nowalbum" : picshow.nowalbum
	})
)(AlbumChooseBox)