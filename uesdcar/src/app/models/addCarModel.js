import _ from "lodash/fp";
 
export default {
	"namespace" : "addCar" , 
	"state" : {
		step : 0 ,		//从0开始
		form0 : {

		},
		form1 : {

		},
		form2 : [
			 
		]
	},
	"reducers" : {
		//更改步骤
		changeStep(state , {step}){
			return _.set("step" , step  , state);
		},
		//更改汽车品牌
		changeForm0(state , {form0}){
			return _.set("form0" , form0  , state);
		},
		//更改汽车图片
		changeForm1(state , {form1}){
			return _.set("form1" , form1  , state);
		},
		addForm2(state , {fileinfo}){
			return _.set("form2" , [
				...state.form2 ,
				fileinfo
			] , state);
		}	
	}
}