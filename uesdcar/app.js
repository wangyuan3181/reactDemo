var express = require("express");
var mongoose = require("mongoose");
//链接数据库，/ershouche表示链接到ershouche数据库
mongoose.connect("localhost/ershouche");
//引入控制器
var carCtrl = require("./controllers/carCtrl.js");
var adminCtrl = require("./controllers/adminCtrl.js");
var userCtrl = require("./controllers/userCtrl.js");

//创建express的app
var app = express();

//路由中间件
app.get("/carimages/:orderId" , carCtrl.showCarImages);
app.get("/carinfo/:orderId"   , carCtrl.showCarInfo);
app.get("/carlike/:orderId"   , carCtrl.showCarLike);
app.post("/carsearch"   	  , carCtrl.carsearch);
app.post("/uploadcarimages"		,carCtrl.uploadcarimages);
app.post("/uploadcarfiles"		,carCtrl.uploadcarfiles);
app.post("/addcar"				,carCtrl.addcar);


app.post("/up"				  , adminCtrl.up);
app.post("/docut"			  , adminCtrl.docut);
app.get("/getAvatar"	      , adminCtrl.getAvatar);

app.get("/users"   	  		  , userCtrl.users);

//静态
app.use(express.static("www"));


//监听
app.listen(8080);
console.log("项目运行在8080端口");