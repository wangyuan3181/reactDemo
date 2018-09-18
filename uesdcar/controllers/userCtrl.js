var fs = require("fs");
var url = require("url");
var path = require("path");
var formidable = require("formidable");
//引入mongoose的model文件
var User = require("../models/User.js");
 
//查询用户
exports.users = function(req,res){
	//GET请求
	var sortby = url.parse(req.url , true).query.sortby || "id";
	var sortdirection = url.parse(req.url , true).query.sortdirection || 1;
	var pagesize = url.parse(req.url , true).query.pagesize || 10;
	var page = url.parse(req.url , true).query.page || 1;
	var keyword = url.parse(req.url , true).query.keyword || "";

	//将字符串真的变为正则，这是一个面试题，将字符串变为正则式的方法，就是new：
	var keywordRegExp = new RegExp(keyword , "g");

	//查询对象
	var CHAXUN = {
 		"$or" : [
 			{"name" : keywordRegExp},
 			{"mobile" : keywordRegExp},
 			{"idcard" : keywordRegExp}
 		]	
 	};
		 
 	//查询！
 	//数据总量的统计，先计算总量，然后查询
 	User.count(CHAXUN , function(err , total){
 		User
 		.find(CHAXUN)		//过滤寻找
 		.sort({[sortby] : sortdirection == "ascend" ? 1 : -1})	//排序方法 这里的排序是1表示从小到大，-1反之。
 		.skip(pagesize * (page - 1))						//跳过多少条
 		.limit(pagesize)												//限制多少条
 		.exec(function(err , docs){												//执行
			res.json({total , "results" : docs});
		});

 	});
	 
}