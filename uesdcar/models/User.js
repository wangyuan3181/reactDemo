var mongoose = require("mongoose");

module.exports = mongoose.model("User" , {
	"id" : Number ,
	"name" : String,
	"mobile" : String,		//为什么是字符串，因为为了方便find正则
	"sex" : String,
	"email" : String,
	"city" : String,
	"idcard" : String,//为什么是字符串，因为为了方便find正则
});