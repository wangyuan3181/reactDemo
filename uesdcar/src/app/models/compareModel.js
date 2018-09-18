import _ from "lodash/fp";

export default {
	"namespace" : "compare" , 
	"state" : {
	 	"nowincompare" : []
	},
	"reducers" : {
		addCompare(state , {carinfo}){
			return _.set("nowincompare",[...state.nowincompare , carinfo],state);
		},
		removeCompare(state , {id}){
			return _.set("nowincompare",state.nowincompare.filter(item=>item.id != id),state);
		}
	},
	"effects" : {
		 
	}
}



