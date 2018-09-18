var fs = require("fs");
var path = require("path");
//引入一个产生随机数据非常方便的包：
var Mock = require("mockjs");
var Random = Mock.Random;

//得到汽车基数据.json文件的地址
var jishujuURL = path.resolve(__dirname , "./汽车基数据.json");
//准备写入的文件的地址
var xieruwenjianURL = path.resolve(__dirname , "./生成的车的模拟数据.txt");
//准备写入的文件的地址
var carimages_smallURL = path.resolve(__dirname , "../www/carimages_small");
 

//如果已经要写入的文件存在，就删除准备写入的文件
//fs.existsSync()表示判断文件是否存在
//fs.unlinkSync()表示删除文件
if(fs.existsSync(xieruwenjianURL)){
	fs.unlinkSync(xieruwenjianURL);
}

console.log("原来的‘生成的车的模拟数据.txt’已经删除，即将开始写入新数据...");

//读取文件
fs.readFile(jishujuURL , function(err , content){
	//读取文件，并且变为真实的对象
	var arr = JSON.parse(content.toString());
	//遍历数组，给每一个JSON文件添加一些随机属性
	//简单的说，就是丰富了基数据、拓展了基数据，没有改变基数据，只是拓展了。
	for(var i = 0 ; i < arr.length ; i++){
		//随机增加一个属性【售价price】，单位万元，随机一个0.2万元到100万元，精度是小数点后2位，至于写2个2的意思是，最少2位，最多2位
		arr[i].price = Random.float(0.2 , 100 , 2 , 2);
		//随机增加一个属性【公里数km】，单位公里
		arr[i].km = Random.integer(0 , 2000000);
		//随机增加一个属性【车主ID，ownerID】
		arr[i].ownerID = Random.integer(10000 , 14999);
		//随机增加一个属性【引擎engine】
		arr[i].engine = Random.pick(["1.0L","1.2L","1.4L","1.6L","1.6T","1.8L","2.0L","3.0L","5.0L"]);
		//随机增加一个属性【购买日期buydate】，注意是时间戳，我们随机了一个20年的数据
		arr[i].buydate = new Date() - Random.integer(0 , 20 * 365 * 24 * 60 * 60 * 1000);
		//随机增加一个属性【是否带牌license】
		arr[i].license = Random.boolean();
		//随机增加一个属性【排气标准exhaust】
		arr[i].exhaust = Random.pick(["国一","国二","国三","国四","国五","国六"]);
		//随机增加一个属性【变速箱gearbox】
		arr[i].gearbox = Random.pick(["自动","手动"]);
		//随机增加一个属性【燃料fuel】
		arr[i].fuel = Random.pick(["汽油","柴油","油电混合","纯电动"]);
		//增加一个这辆车的形象照
		arr[i].avatar = fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/view`)[0];
		//这个车的图片信息
		arr[i].images = {
			"view" : fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/view`),
			"inner" : fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/inner`),
			"engine" : fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/engine`),
			"more" : fs.readdirSync(`${carimages_smallURL}/${arr[i].id}/more`)
		}
		//写入最终生成的文件
		fs.appendFileSync(xieruwenjianURL , JSON.stringify(arr[i]) + "\r\n");
	}
	console.log("已经写入" + arr.length + "条新数据，快打开‘生成的车的模拟数据.txt’看看吧！");
});