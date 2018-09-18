import React from 'react';
import {connect} from "dva";

import "./PicShow.less";

 
import InfoBox from "./InfoBox.js";
import CarLikeBox from "./CarLikeBox.js";
import AlbumChooseBox from "./AlbumChooseBox.js";
import SmallPicNavBox from "./SmallPicNavBox.js";
import BigImgBox from "./BigImgBox.js";
 

class PicShow extends React.Component {
	constructor(props) {
		super(props);

		props.dispatch({"type" : "picshow/init" , "nowid" : props.id})
	}

	render() {
		return (
			<div className="PicShowcontainer">
				<BigImgBox></BigImgBox>
				<div className="sidebox">
					<InfoBox></InfoBox>
					<AlbumChooseBox></AlbumChooseBox>
					<CarLikeBox></CarLikeBox>
					<SmallPicNavBox></SmallPicNavBox>
				</div>
			</div>
		);
	}
}

export default connect()(PicShow);