import React from 'react';
import {Row , Col , Button} from "antd";
import {connect} from "dva";

class Step1 extends React.Component {
	constructor(props) {
		super(props);

		//数量
		this.viewamount = 0;
	}

	//组件上树之后
	componentDidMount(){
		var self = this;
		//映射对象，键的名字是图片编号，值是服务器的值
		this.maps = {
			view : {

			},
			inner : {

			},
			engine : {

			},
			more : {

			}
		}

		//上传图片的函数，没有什么特殊的，就是send了一个图片的内容
		function uploadFile(formData , album , no) {
			var xhr = new XMLHttpRequest();

			//进度
			xhr.upload.onprogress = function (ev){
				var percent = 100 * ev.loaded/ev.total;
				//文字标签
				var $em = $(".previmgbox." + album + "[data-no=" + no + "]").find("em");
			 	//选择这样的盒子
				$em.html("图片正在上传" + parseInt(percent) + "%");
				 
				if(percent == 100){
					$em.hide();
				}
			}
			xhr.onload = function(){
				var $em = $(".previmgbox." + album + "[data-no=" + no + "]").find("em").hide();
				self.maps[album][no] = JSON.parse(xhr.responseText).base;

			}
		 
			//配置请求类型、地址、是否异步
			xhr.open('POST', 'http://127.0.0.1:8080/uploadcarimages', true);
			//发送
			xhr.send(formData);
		}

		var $dropzone = $(".dropzone");

		$dropzone.bind("dragover" ,  function(ev) {
		    //阻止浏览器默认打开文件的操作
		    ev.preventDefault();
		    $(this).addClass("over");
		});

		$dropzone.bind("dragleave" ,  function(ev) {
		    //阻止浏览器默认打开文件的操作
		    ev.preventDefault();
		    $(this).removeClass("over");
		});

		//这个函数用来产生标准的files对象数组并且发出上传请求
		function createFileArrAndUploader(files , album){
			//给当前FormData对象添加一个键/值对.
			for(let i = 0 ; i < files.length ; i++){
				//编号加1
				let no = self.viewamount++;
				//HTML5新的对象，表单数据
				let formData = new FormData();
				//追加项
				formData.append('viewpics', files[i]);
				//调用函数，传文件
				uploadFile(formData , album , no);
				//******************************************
			 	//HTML5新的对象，可以读取文件
				let reader = new FileReader();  
				//这个意思就是读取图片文件的base64编码，就能显示在网页上
				reader.readAsDataURL(files[i]);
				reader.onload = function(e){
					$(".dropzone[data-album=" + album + "]").append($('<div data-no=' + no + ' class="view previmgbox" style="background-image:url(' + e.target.result +')"></div>'))
				}
			}
		}

		$dropzone.bind("drop" ,  function(ev) {
		    //阻止浏览器默认打开文件的操作
			ev.preventDefault();
			$(this).removeClass("over");

			var files = ev.originalEvent.dataTransfer.files;
			
			createFileArrAndUploader(files , $(this).data("album"));
		});

		//监听viewfile的改变事件
		this.refs.viewfile.onchange = function(ev){createFileArrAndUploader(this.files , "view");}
		this.refs.innerfile.onchange = function(ev){createFileArrAndUploader(this.files , "inner");}
		this.refs.enginefile.onchange = function(ev){createFileArrAndUploader(this.files , "engine");}
		this.refs.morefile.onchange = function(ev){createFileArrAndUploader(this.files , "more");}

		//模拟点击
		$(this.refs.viewfilebtn).click(function(){$(self.refs.viewfile).trigger("click");});
		$(this.refs.innerfilebtn).click(function(){$(self.refs.innerfile).trigger("click");});
		$(this.refs.enginefilebtn).click(function(){$(self.refs.enginefile).trigger("click");});
		$(this.refs.morefilebtn).click(function(){$(self.refs.morefile).trigger("click");});

		//可以被排序
		$(".dropzone").sortable();
	}

	render() {
		return (
			<div>
				<Row>
					<Col span={10}>
						<h3>请上传【外观】图片，点击上传按钮或者拖拽到方框内</h3>
					</Col>
					<Col span={6}>
						<input hidden ref="viewfile" type="file"  multiple="multiple" />
						<span  ref="viewfilebtn"  className="addBtn">+</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="dropzone" data-album="view" dropeffect="link"></div>
					</Col>
				</Row>

				<Row>
					<Col span={10}>
						<h3>请上传【内饰】图片，点击上传按钮或者拖拽到方框内</h3>
					</Col>
					<Col span={6}>
						<input hidden ref="innerfile" type="file"  multiple="multiple" />
						<span  ref="innerfilebtn"  className="addBtn">+</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="dropzone" data-album="inner" dropeffect="link"></div>
					</Col>
				</Row>

				<Row>
					<Col span={10}>
						<h3>请上传【结构和发动机】图片，点击上传按钮或者拖拽到方框内</h3>
					</Col>
					<Col span={6}>
						<input hidden ref="enginefile" type="file"  multiple="multiple" />
						<span  ref="enginefilebtn"  className="addBtn">+</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="dropzone" data-album="engine"  dropeffect="link"></div>
					</Col>
				</Row>

				<Row>
					<Col span={10}>
						<h3>请上传【更多细节】图片，点击上传按钮或者拖拽到方框内</h3>
					</Col>
					<Col span={6}>
						<input hidden ref="morefile" type="file"  multiple="multiple" />
						<span  ref="morefilebtn"  className="addBtn">+</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="dropzone" data-album="more"  dropeffect="link"></div>
					</Col>
				</Row>

				<Button type="primary" onClick={()=>{
					var picarrObj = {
						"view" : [],
						"inner" : [],
						"engine" : [],
						"more" : []
					}
					var self = this;
					//这里我们统计所有的DOM中的顺序
					$(".dropzone[data-album=view]").find(".previmgbox").each(function(){
						picarrObj["view"].push(self.maps["view"][$(this).data("no")]);
					});
					$(".dropzone[data-album=inner]").find(".previmgbox").each(function(){
						picarrObj["inner"].push(self.maps["inner"][$(this).data("no")]);
					});
					$(".dropzone[data-album=engine]").find(".previmgbox").each(function(){
						picarrObj["engine"].push(self.maps["engine"][$(this).data("no")]);
					});
					$(".dropzone[data-album=more]").find(".previmgbox").each(function(){
						picarrObj["more"].push(self.maps["more"][$(this).data("no")]);
					});

					console.log(picarrObj);
					//发出更改
					this.props.dispatch({"type" : "addCar/changeForm1" , "form1" : picarrObj})
					this.props.dispatch({"type":"addCar/changeStep" , "step" : 2})
				 
				}}>下一步</Button>
			</div>
		);
	}
}

export default connect()(Step1);