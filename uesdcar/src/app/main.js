import React from "react";
import dva from "dva";
import logger from "redux-logger";

//引入路由
import router from "./router.js";

//引入模型
import picshowModel from "./models/picshowModel.js";
import carlistModel from "./models/carlistModel.js";
import userlistModel from "./models/userlistModel.js";
import compareModel from "./models/compareModel.js";
import addCarModel from "./models/addCarModel.js";

//创建dva的app对象
const app = dva({
	onAction : logger
});

//注册路由
app.router(router);
//注册模型
app.model(picshowModel);
app.model(carlistModel);
app.model(compareModel);
app.model(userlistModel);
app.model(addCarModel);
 
//挂载上树
app.start("#app");