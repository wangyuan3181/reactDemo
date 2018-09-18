import _ from "lodash/fp";
import {fetchCarServer} from "./utils/carlistUtil.js";

export default {
	"namespace" : "carlist" , 
	"state" : {
		"cars" : [],
		"nowfilters" : [] ,
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
		//增加filter
		addFilter(state , {k , v}){
			var nowfilters = _.clone(state.nowfilters);
			nowfilters.push({k , v});
			return _.set("nowfilters" , nowfilters ,state);
		},
		//删除filter
		removeFilterSync(state , {k}){
			return _.set("nowfilters" , _.filter(item => item.k != k,state.nowfilters) , state);
		},
		//改变filter
		changeFilter(state , {k , v}){
			return _.set("nowfilters" , _.map(item => item.k == k ? _.set("v",v,item) : item,state.nowfilters) , state);
		},
		//改变cars
		changeCars(state , {cars}){
			return _.set("cars" , cars , state);
		},
		//改变pagination
		changePagination(state , {total = state.pagination.total , pagesize = state.pagination.pagesize , page = state.pagination.page}){
			return _.set("pagination" , {total , pagesize , page} , state);
		},
		//改变pagination
		changeSorter(state , {sortby = state.sorter.sortby , sortdirection = state.sorter.sortdirection}){
			return _.set("sorter" , {sortby , sortdirection} , state);
		}
	},
	"effects" : {
		//初始化
		*init(action , {put , select , call}){
		 	yield call(fetchCarServer , select , put);
		},
		//增加或者修改过滤器
		*addOrChangeFilter({k , v} , {put , select , call}){
			//先得到当前的nowfilters
		 	var {nowfilters} = yield select((state) => state.carlist);
		 	//判断是否已经有k为k这项
		 	var isExit = false;		//flag，旗子。无罪推断，默认是没有的
		 	//遍历，如果有就会将flag变为true
		 	for(var i = 0 ; i < nowfilters.length ; i++){
		 		if(nowfilters[i].k == k){
		 			isExit = true;
		 		}
		 	}
		 	//如果这项已经存在
		 	if(isExit){
		 		yield put({"type" : "changeFilter" , k , v})
		 	}else{
		 		//如果这项不存在
		 		yield put({"type" : "addFilter" , k , v})
		 	}
		 	//页码归1
		 	yield put({"type" : "changePagination" , "page" : 1});

	 		yield call(fetchCarServer , select , put);
		},
		//删除过滤器，有的过滤器有绑定关系，在这里要反应这层绑定关系。
		//比如，删除brand（品牌）的时候，车系一并删除。
		*removeFilter({k} , {put , select , call}){
			//删除brand（品牌）的时候，车系一并删除。
			if(k == "brand"){
				yield put({"type" : "removeFilterSync" , k : "series"});
			}
			yield put({"type" : "removeFilterSync" , k});

			//页码归1
		 	yield put({"type" : "changePagination" , "page" : 1});

		 	yield call(fetchCarServer , select , put);
		},
		//改变page
		*changePage({page , pagesize} , {put , select , call}){
			//先得到当前的pagesize
		 	var {pagination} = yield select((state) => state.carlist);
		 	console.log(pagination.pagesize , pagesize)
			if(pagination.pagesize != pagesize){
				page = 1;
			}
			//改变pagination
		 	yield put({"type" : "changePagination" , page , pagesize});

		 	//拉取新的过滤器和分页信息
		 	yield call(fetchCarServer ,select , put);
		},
		//改变排序
		*changeSort({sortby , sortdirection} , {put , select , call}){
			//先得到当前的nowfilters
		 	var {sorter} = yield select((state) => state.carlist);
		 	//判断用户的排序是否不一样
		 	if(sorter.sortby != sortby || sorter.sortdirection != sortdirection){
		 		console.warn(sorter.sortby ,sortby,sorter.sortdirection , sortdirection)
	 			//只要排序，一定要回到第1页。
				yield put({"type" : "changePagination" , "page" : 1});
				//改变排序
				yield put({"type" : "changeSorter" , sortby , sortdirection});


				//拉取新的过滤器和分页信息
			 	yield call(fetchCarServer , select , put);
		 	}
		}
	}
}



