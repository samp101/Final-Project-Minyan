import axios from "axios"

export const SHULLIST = 'SHULLIST'
export const USERFAV = 'USERFAV'
export const USERSEARCH = 'USERSEARCH' 
export const CLEARINFO = 'CLEARINFO'
export const CLEARUSERSEARCH = 'CLEARUSERSEARCH'




export const getListOfAllShuls = (cityName,countryName) => async (dispatch)=>{
    try {
        const response = await axios.get(`/city`)
        // console.log(cityName);
        // console.log(countryName);

        if (response.status==200){
            console.log(response.data);
        dispatch({
            type:SHULLIST,
            payload:response.data,
            // payload1:{cityName,countryName}
        })} 
    } catch (error) {
        console.log(error);
    }
}
export const getUserCitySearch = (cityName) => async (dispatch)=>{
    try {
        const response = await axios.get(`/shul-times/city=${cityName}`)

        if (response.status==200){
            console.log(response.data);
        dispatch({
            type:USERSEARCH,
            payload:response.data,
            payload1:response.data.suggestion||[],
        })
        
    } 
    } catch (error) {
        console.log(error);
    }
}
export const getFavs = (id) => async (dispatch)=>{
    try {
        console.log(id);
        const response = await axios.get(`/user-info/${id}`)
        if (response.status==200){
        dispatch({
            type:USERFAV,
            payload:response.data
        })} 
    } catch (error) {
        console.log(error);
    }
}

export const clearUser = ()=>{
    return{
        type:CLEARINFO
    }
}
export const clearUserSearch = ()=>{
    return{
        type:CLEARINFO
    }
}