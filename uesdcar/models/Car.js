var mongoose = require("mongoose");

module.exports = mongoose.model("Car" , {
	"id" : Number , 
	"type" : String,
	"seat" : Number,
	"brand" : String,
	"series" : String,
	"color" : String,
	"price" : Number,
	"km" : Number,
	"ownerID" : Number,
	"engine" : String,
	"buydate" : Number,
	"license" : Boolean,
	"exhaust" : String,		//国三、国四、国五……
	"gearbox" : String,		//自动、手动
	"fuel" : String,
	"images" : Object,
	"carfiles" : Array,
	"avatar" : String
});