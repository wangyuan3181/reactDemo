import React from "react";
import {ConnectedRouter } from "react-router-redux";
import createHistory from 'history/createHashHistory';
import {Route} from 'react-router';

const history = createHistory();

import Index from "./containers/Index.js";
import Tingchechang from "./containers/Tingchechang.js";
import CarList from "./columns/buy/CarList/CarList.js";
import Zhuanjia from "./columns/buy/Zhuanjia/Zhuanjia.js";
import Yunqi from "./columns/buy/Yunqi/Yunqi.js";
import Sifa from "./columns/buy/Sifa/Sifa.js";
import AddCar from "./columns/sale/AddCar/AddCar.js";
import Gujia from "./columns/sale/Gujia/Gujia.js";
import Yijian from "./columns/sale/Yijian/Yijian.js";
import Zhuanrang from "./columns/sale/Zhuanrang/Zhuanrang.js";
import UserList from "./columns/user/UserList/UserList.js";
import AddUser from "./columns/user/AddUser/AddUser.js";
import Profile from "./columns/admin/Profile/Profile.js";
import Fire from "./columns/admin/Fire/Fire.js";
 
export default () => {
	return  <ConnectedRouter history={history}>
        <div>
			<Route exact path="/" component={Index}/>
			<Route exact path="/tingchechang" component={Tingchechang}/>
			<Route exact path="/buy/carlist" component={CarList}/>
			<Route exact path="/buy/zhuanjia" component={Zhuanjia}/>
			<Route exact path="/buy/yunqi" component={Yunqi}/>
			<Route exact path="/buy/sifa" component={Sifa}/>
			<Route exact path="/sale/addcar" component={AddCar}/>
			<Route exact path="/sale/gujia" component={Gujia}/>
			<Route exact path="/sale/yijian" component={Yijian}/>
			<Route exact path="/sale/zhuanrang" component={Zhuanrang}/>
			<Route exact path="/user/userlist" component={UserList}/>
			<Route exact path="/user/adduser" component={AddUser}/>
			<Route exact path="/admin/profile" component={Profile}/>
			<Route exact path="/admin/fire" component={Fire}/>			 
        </div>
    </ConnectedRouter>
}