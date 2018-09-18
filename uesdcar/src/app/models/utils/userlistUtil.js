function *fetchServer(select , put){
 	var {pagination : {page , pagesize}} = yield select((state) => state.userlist);
 	var {sorter : {sortby , sortdirection}} = yield select((state) => state.userlist);
 	var {keyword} = yield select((state) => state.userlist);

 	//发出Ajax请求
	var {results , total} = yield fetch(`/users?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}&keyword=${keyword}`).then(data=>data.json());
 	//改变车辆结果
 	yield put({"type" : "changeUsers" ,  "users" : results});
 	//改变pagination
 	yield put({"type" : "changePagination" , total});
}

export const fetchUserServer = fetchServer;