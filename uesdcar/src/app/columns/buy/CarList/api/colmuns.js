import React from 'react';
import moment  from "moment";
//这是一个大“规范”、大“仓库”，具体上谁要看如何设置。
export default [
	{
		title: '编号',
		dataIndex: 'id',
		key: 'id',
		sorter : true,

	},
	{
		title: '缩略图',
		dataIndex: 'avatar',
		key: 'avatar',
		render : (t , r)=>{
			return <img 
				style={{"width" : "80px"}} 
				src={`carimages_small/${r.id}/view/${r.avatar}`} 
				data-id={r.id}
				className="suoluetu"
			/>
		}
	},
	{
		title: '车系',
		dataIndex: 'brand',
		key: 'brand',
		render(txt , record){
			return record.brand + record.series;
		}
	},
	{
		title: '购买日期',
		dataIndex: 'buydate',
		key: 'buydate',
		render(t){
			return moment(t).format("YYYY年MM月");
		},
		sorter : true
	},
	{
		title: '里程',
		dataIndex: 'km',
		key: 'km',
		render(txt){
			return Math.round(txt / 100) / 100;
		},
		sorter : true
	},
	{
		title: '售价',
		dataIndex: 'price',
		key: 'price',
		sorter : true
	},
	{
		title: '颜色',
		dataIndex: 'color',
		key: 'color'
	},
	{
		title: '发动机',
		dataIndex: 'engine',
		key: 'engine'
	},
	{
		title: '排放',
		dataIndex: 'exhaust',
		key: 'exhaust'
	},
	{
		title: '燃料',
		dataIndex: 'fuel',
		key: 'fuel'
	},
	{
		title: '变速箱',
		dataIndex: 'gearbox',
		key: 'gearbox'
	} ,
	{
		title: '车型',
		dataIndex: 'type',
		key: 'type'
	},
	{
		title: '座位数',
		dataIndex: 'seat',
		key: 'seat'
	},
	{
		title: '是否上牌',
		dataIndex: 'license',
		key: 'license',
		render(txt , record){
			return record.license ? <span>是</span> : <span>否</span>
		}
	}
];
