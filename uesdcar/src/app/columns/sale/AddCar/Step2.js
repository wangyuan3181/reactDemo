import React from 'react';
import {Button , Modal , Progress , Input } from "antd";
import {connect} from "dva";

class Step2 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			percent : 0,
			upstep : 0 ,  //0表示没有上传，1正在上传，2上传完毕
			ext : "" ,
			filename : "",
			real : ""
		}
	}

	componentDidMount(){
		var self = this;
		$(this.refs.filebtn).bind("change" , function(){
			self.setState({
				upstep : 1 ,
				filename : this.files[0].name
			});

			//执行上传
			let formData = new FormData();
			formData.append('carfiles', this.files[0]);
			//调用上传函数
			uploadFile(formData);
		})

		//上传函数
		function uploadFile(formData) {
			var xhr = new XMLHttpRequest();

			//进度
			xhr.upload.onprogress = function (ev){
				var percent = 100 * ev.loaded/ev.total;
				self.setState({percent : Math.ceil(percent)})
			}
			//上传完毕
			xhr.onload = function(){
				//这里有回调的信息
				var base = JSON.parse(xhr.responseText).base;
				var ext = JSON.parse(xhr.responseText).ext;
				self.setState({
					upstep :2,
					ext,
					real : base
				});
			}
		 
			//配置请求类型、地址、是否异步
			xhr.open('POST', 'http://127.0.0.1:8080/uploadcarfiles', true);
			//发送
			xhr.send(formData);
		}
	}

	render() {
		//图标地址
		const getImageUrl = (ext) => {
			if(ext == ".pdf"){
				return "/images/pdf.jpg";
			}else if(ext == ".docx"){
				return "/images/docx.jpg";
			}else if(ext == ".zip" || this.state.ext == ".rar"){
				return "/images/zip.jpg";
			}
		}

		return (
			<div>
			{this.state.filename}
				<Button onClick={()=>{
					$(this.refs.filebtn).trigger("click");
				}}>上传文件</Button>

				<input type="file" hidden ref="filebtn"/>

				<Modal
					title="正在上传"
					visible={this.state.upstep == 1}
				>
					<div>
						<Progress percent={this.state.percent} status="active" />
					</div>
				</Modal>

				<Modal
					title="请确认文件名字"
					visible={this.state.upstep == 2}
					destroyOnClose={true}
					onOk={()=>{
						this.setState({
							upstep : 0
						});
						//派遣一个动作
						this.props.dispatch({"type" : "addCar/addForm2" , "fileinfo" : {"real" : this.state.real , "filename" : this.state.filename , "ext" : this.state.ext}})
					}}
				>
					<div style={{"textAlign":"center"}}>
						<img width="200" src={getImageUrl(this.state.ext)} alt=""/>
						<Input type="text" defaultValue={this.state.filename}/>
						 
					</div>
				</Modal>


				<div className="filebox">
					<ul>
						{
							this.props.form2.map(item=>{
								return <li key={item.real}>
									<img width="40" src={getImageUrl(item.ext)} alt=""/>
									{item.filename}
								</li>
							})
						}
					</ul>

				</div>


				<Button onClick={()=>{
					var form0 = this.props.form0;
					var form1 = this.props.form1;
					var form2 = this.props.form2;
					//这里Ajax交
					$.ajax({
						"url" : "/addcar" , 
						"type" : "post",
						"data" : {
							form0 : JSON.stringify(form0),
							form1 : JSON.stringify(form1),
							form2 : JSON.stringify(form2)
						} 
					})
				}}>创建车辆订单</Button>
			</div>
		);
	}
}

export default connect(
	({addCar}) => ({
		form0 : addCar.form0 ,
		form1 : addCar.form1 ,
		form2 : addCar.form2 ,
	})
)(Step2)