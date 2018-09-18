import React from 'react';

export default class Tu1 extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.refs.main);

        // 指定图表的配置项和数据
        var option = {
		    xAxis: {
		        type: 'category',
		        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [{
		        data: [820, 932, 901, 934, 1290, 1330, 1320],
		        type: 'line',
		        smooth: true
		    }]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	}

	render() {
		return (
			<div ref="main" style={{"width": "100%","height":"100%"}}></div>
		);
	}
}
