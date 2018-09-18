import _ from "lodash/fp";
import {fetchCarInfo , fetchCarLikes , fetchCarImages} from "./utils/picshowUtil.js";

export default {
	"namespace" : "picshow" , 
	"state" : {
		nowid : 0,
		nowidx : 0,
		nowalbum : "view",
		carimages : {},
		carinfo : {},
		carlikes : []
	},
	"reducers" : {
		changeNowId(state , action){
			return _.set("nowid", action.nowid , state);
		},
		changeNowIdx(state , action){
			return _.set("nowidx", action.nowidx , state);
		},
		changeNowAlbumSync(state , action){
			return _.set("nowalbum", action.nowalbum , state);
		},
		changeCarImages(state , action){
			return _.set("carimages", action.carimages , state);
		},
		changeCarinfo(state , action){
			return _.set("carinfo", action.carinfo , state);
		},
		changeCarLikes(state , action){
			return _.set("carlikes", action.carlikes , state);
		}
	},
	"effects" : {
		//初始化，会传入一个nowid参数
		*init({nowid} , {put , call}){
			//改变nowid为action的载荷
			yield put({"type":"changeNowId" , nowid});
			//改变nowidx为0
			yield put({"type":"changeNowIdx" , "nowidx" : 0});
			//改变nowalbum为view
			yield put({"type":"changeNowAlbum" , "nowalbum" : "view"});
			//发出请求，请求汽车信息
			const carinfo = yield call(fetchCarInfo , nowid);
			//改变carinfo
			yield put({"type":"changeCarinfo" , carinfo});
			//发出请求，请求相似汽车
			const carlikes = yield call(fetchCarLikes , nowid);
			//改变carlikes
			yield put({"type":"changeCarLikes" , carlikes});
			//发出请求，请求汽车的图集
			const carimages = yield call(fetchCarImages , nowid);
			//改变carlikes
			yield put({"type":"changeCarImages" , carimages});
		},
		//不一定真的是异步才写在effects中，而是只要有“副作用流”、“批量的副作用”此时都可以写在effects()中
		//所以今天我们就要改口了，
		//不是说所有异步都要写在effects中，而是所有有副作用的都要写在effects中。
		//而异步都有副作用，所以，异步都在effects中。
		*changeNowAlbum(action , {put , call}){
			yield put({"type":"changeNowIdx" , "nowidx" : 0});
			yield put({"type":"changeNowAlbumSync" , "nowalbum" : action.nowalbum});
		},
		*goNext(action , {put ,call , select}){
			//得到nowidx，在effects中得到state，只能用select。
			const {nowidx , nowalbum , carimages} = yield select((state) => state.picshow);
		 	//发出改变
		 	//点的时候，图集还有没有看的图
		 	if(nowidx < carimages[nowalbum].length - 1){
				yield put({"type" : "changeNowIdx" , "nowidx" : nowidx + 1})
		 	}else{
		 		if(nowalbum != "more"){
		 			//图集展示顺序
		 			const arr = ["view" , "inner" , "engine" , "more"];
		 			//得到当前相册在图集展示顺序中的序号。
			 		const nowarridx = arr.indexOf(nowalbum);
			 		//改变相册，是上面这个序号加1重新从数组取值。
			 		yield put({"type" : "changeNowAlbumSync" , "nowalbum" : arr[nowarridx + 1]});
			 		//同时让小标变为0
			 		yield put({"type" : "changeNowIdx" , "nowidx" : 0})
		 		}else{
		 			//如果现在是more图集，后面没有图片了，此时就
		 			yield put({"type" : "changeNowAlbumSync" , "nowalbum" : "view"});
			 		yield put({"type" : "changeNowIdx" , "nowidx" : 0});
		 		}
		 	}
		}
		,
		*goLeft(action , {put ,call , select}){
			//得到nowidx，在effects中得到state，只能用select。
			const {nowidx , nowalbum , carimages} = yield select((state) => state.picshow);
		 	if(nowidx > 0){
		 		yield put({"type" : "changeNowIdx" , "nowidx" : nowidx - 1})
		 	}else{
		 		if(nowalbum != "view"){
			 		//图集展示顺序
		 			const arr = ["view" , "inner" , "engine" , "more"];
		 			//得到当前相册在图集展示顺序中的序号。
			 		const nowarridx = arr.indexOf(nowalbum);
			 		//改变相册，是上面这个序号减1重新从数组取值。
			 		yield put({"type" : "changeNowAlbumSync" , "nowalbum" : arr[nowarridx - 1]});
			 		//同时让小标变为那个图集的长度
			 		yield put({"type" : "changeNowIdx" , "nowidx" : carimages[arr[nowarridx - 1]].length - 1});
		 		}else{
		 			yield put({"type" : "changeNowAlbumSync" , "nowalbum" : "more"});
			 		yield put({"type" : "changeNowIdx" , "nowidx" : carimages["more"].length - 1});
		 		}
		 	}
		}
	}
}