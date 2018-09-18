import React from "react";
import moment from "moment";

import {Tag} from "antd";

export default (props) => {
	return <div>
		{props.nowfilters.map(item=>{
			if(item.k == "brand"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					品牌 ： {item.v}
				</Tag>
			}else if(item.k == "series"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					车系 ： {item.v}
				</Tag>
			}else if(item.k == "color"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					颜色 ： {item.v.join(" 或 ")}
				</Tag>
			}else if(item.k == "seat"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					座位数 ： {item.v.join(" 或 ")}
				</Tag>
			}else if(item.k == "exhaust"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					排放标准： {item.v.join(" 或 ")}
				</Tag>
			}else if(item.k == "engine"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					发动机: {item.v.join(" 或 ")}
				</Tag>
			}else if(item.k == "type"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					车型: {item.v.join(" 或 ")}
				</Tag>
			}else if(item.k == "price"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					售价: {item.v[0]}万元 至 {item.v[1]}万元
				</Tag>
			}else if(item.k == "km"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					公里数: {item.v[0]}万公里 至 {item.v[1]}万公里
				</Tag>
			}else if(item.k == "fuel"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					燃料 ： {item.v}
				</Tag>
			}else if(item.k == "gearbox"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					变速箱 ： {item.v}
				</Tag>
			}else if(item.k == "license"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					是否含牌照 ： {item.v}
				</Tag>
			}else if(item.k == "buydate"){
				return <Tag 
					closable 
					key={item.k}
					onClose={()=>{props.onClose(item.k)}}
				>
					购买日期 ： 
					{moment(Number(item.v[0])).format("YYYY年MM月DD日")} 
					到
					{moment(Number(item.v[1])).format("YYYY年MM月DD日")} 
				</Tag>
			}
		})}
	</div>
}