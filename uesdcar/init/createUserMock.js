var fs = require("fs");
var path = require("path");
//引入一个产生随机数据非常方便的包：
var Mock = require("mockjs");
var Random = Mock.Random;

//准备写入的文件的地址
var xieruwenjianURL = path.resolve(__dirname , "./生成的车主的模拟数据.txt");

//如果已经要写入的文件存在，就删除准备写入的文件
//fs.existsSync()表示判断文件是否存在
//fs.unlinkSync()表示删除文件
if(fs.existsSync(xieruwenjianURL)){
	fs.unlinkSync(xieruwenjianURL);
}

console.log("原来的‘生成的车主的模拟数据.txt’已经删除，即将开始写入新数据...");

for(var i = 0 ; i < 5000 ; i++){
	var o = {
		"id" : 10000 + i ,
		"name" : Random.cname() ,						//车主姓名
		"mobile" : Mock.mock(/^((13[0-9])|(14[57])|(15([5-9]))|(18[5-9]))\d{8}$/),			//手机号
		"sex" : Random.pick(["男","女"]),
		"city" : Random.city(true) ,
		"idcard" : Random.integer(100000000000000000 , 900000000000000000),
		"email" : Random.email()
	}
	 
	//写入最终生成的文件
	fs.appendFileSync(xieruwenjianURL , JSON.stringify(o) + "\r\n");
}
console.log("已经写入5000条新数据，快打开‘生成的车主的模拟数据.txt’看看吧！");
