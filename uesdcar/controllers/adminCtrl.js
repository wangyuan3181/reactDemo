var formidable = require("formidable");
var path = require("path");
var gm = require('gm');
var Admin = require("../models/Admin.js");

exports.up = function(req,res){
	var form = new formidable.IncomingForm();
	//设置上传路径
	form.uploadDir = path.resolve(__dirname , "../www/uploads");
	//保留图片的拓展名
	form.keepExtensions = true;

	form.parse(req,  function(err , fields , files){
		//得到上传之后的文件的名字，因为上传之后文件的名字会被改名。
		var base = path.parse(files.adminavatar.path).base;
		//我们现在得到图片上传之后的真实宽度、高度
		//https://www.npmjs.com/package/gm
		gm(path.resolve(__dirname , "../www/uploads/" + base)).size(function(err , size){
			//上传之后屏幕上显示的内容：
			res.send("<script>window.parent.onUpDone('" + base + "'," + size.width + "," + size.height + ");</script>");
		});
	});
}


//实现裁切
exports.docut = function(req,res){
	var form = new formidable.IncomingForm();
 
	form.parse(req,  function(err , {w , h , l , t , picurl} , files){
		//得到用户的几个参数
		// 命令gm进行裁切，crop表示裁切，write表示写
		gm(path.resolve(__dirname , "../www/uploads/" + picurl))
		.crop(w,h,l,t)
		.resize(160,160)
		.write(path.resolve(__dirname , "../www/avatars/" + picurl), function(){
			//改变数据库
			Admin.update({"email" : "shao@163.com" },{"$set" : {"avatar" : picurl}},function(){
				res.json({"result" : 1});
			});
		});
	});
}

//得到头像
exports.getAvatar = function(req,res){
	//读取数据库
	//到时候我们用session来区分谁是谁，但是现在只要一个用户，shao@163.com。
	Admin.find({"email" : "shao@163.com"} , function(err , docs){
		//头像
		if(docs[0].avatar){
			var avatar = path.resolve(__dirname , "../www/avatars/" + docs[0].avatar);
		}else{
			var avatar = path.resolve(__dirname , "../www/images/defaultAvatar.jpg");
		}
		 
		//直接返回这个头像本身，而不是地址。
		res.sendFile(avatar);
	});
}