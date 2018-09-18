import React from "react";
import classnames from "classnames";

import carBrandAndSeries from "../../../../api/carBrandAndSeries.js";

export default (props) => {
	if(carBrandAndSeries[props.char]){
		if(!carBrandAndSeries[props.char].filter(item => item.name == props.brand)[0]) return null;
		
		return <div>
			{
				carBrandAndSeries[props.char].filter(item => item.name == props.brand)[0].series.map(item=>{
					return <a 
						key={item} 
						className={classnames({
							"lineA" : true,
							"cur" : props.series == item
						})}
						onClick={()=>{props.onChoose(item)}}
					>{item}</a>
				})
			}
		</div>
	}else{
		return null;
	}	
}