import _ from "lodash/fp";
import {fetchUserServer} from "./utils/userlistUtil.js";

export default {
	"namespace" : "userlist" , 
	"state" : {
		"users" : [],
		"keyword" : "",
		"pagination" : {
			"total" : 0,
			"pagesize" : 10,	//每页条数
			"page" : 1,			//当前page
		},
		"sorter" : {
			"sortby" : "id",			//按id排序
			"sortdirection" : "ascend"	//升序
		}
	},
	"reducers" : {
		//改变用户
		changeUsers(state , {users}){
			return _.set("users" , users , state);
		},
		//改变pagination
		changePagination(state , {total = state.pagination.total , pagesize = state.pagination.pagesize , page = state.pagination.page}){
			return _.set("pagination" , {total , pagesize , page} , state);
		},
		//改变pagination
		changeSorter(state , {sortby = state.sorter.sortby , sortdirection = state.sorter.sortdirection}){
			return _.set("sorter" , {sortby , sortdirection} , state);
		},
		//改变关键字
		changeKeywordSync(state , {keyword}){
			return _.set("keyword" , keyword , state);
		}
	},
	"effects" : {
		//初始化
		*init(action , {put , select , call}){
		 	yield call(fetchUserServer , select , put);
		},
		//改变page
		*changePage({page , pagesize} , {put , select , call}){
			//先得到当前的pagesize
		 	var {pagination} = yield select((state) => state.carlist);
			if(pagination.pagesize != pagesize){
				page = 1;
			}
			//改变pagination
		 	yield put({"type" : "changePagination" , page , pagesize});

		 	//拉取新的过滤器和分页信息
		 	yield call(fetchUserServer ,select , put);
		},
		//改变排序
		*changeSort({sortby , sortdirection} , {put , select , call}){
			//先得到当前的nowfilters
		 	var {sorter} = yield select((state) => state.carlist);
		 	//判断用户的排序是否不一样
		 	if(sorter.sortby != sortby || sorter.sortdirection != sortdirection){
 	 			//只要排序，一定要回到第1页。
				yield put({"type" : "changePagination" , "page" : 1});
				//改变排序
				yield put({"type" : "changeSorter" , sortby , sortdirection});


				//拉取新的过滤器和分页信息
			 	yield call(fetchUserServer , select , put);
		 	}
		},
		//改变关键字
		*changeKeyword({keyword} , {put , select , call}){
			//回到第1页 
			yield put({"type" : "changePagination" , "page" : 1});
			//改变关键字
			yield put({"type" : "changeKeywordSync" , keyword});


			//拉取新的过滤器和分页信息
		 	yield call(fetchUserServer , select , put);
		 	 
		}
	}
}



