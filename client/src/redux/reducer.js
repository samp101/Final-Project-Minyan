import {SHULLIST, USERFAV, CLEARINFO, USERSEARCH, CLEARUSERSEARCH} from './actions'

const initState = {
    shulList:[],
    userFav:[],
    userCitySearch:[],
    suggestions:[]

}



export const reducer = (state=initState,actions={})=>{
  switch (actions.type) {
    case SHULLIST:
        return{...state,shulList:actions.payload}
    case USERFAV:
      return{...state,userFav:actions.payload}
    case CLEARINFO:
        return{...state,userFav:[]}
    case USERSEARCH:
        const unique = Array.from(new Set(actions.payload1.map(city => city.shul_city_city)))
            .map(id => {
                return actions.payload1.find(a => a.shul_city_city === id)
            })
        return{...state,userCitySearch:actions.payload,suggestions:unique}
    case CLEARUSERSEARCH:
        return{...state,userCitySearch:[]}
    default:
        return{...state}
  }
} 