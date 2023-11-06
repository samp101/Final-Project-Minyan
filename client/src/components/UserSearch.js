

import { AppContext } from "../App"
import { useEffect, useState, useContext } from "react"
import CardForShul from "../subComponents/CardsForShul"
import {connect} from 'react-redux'
import axios from "axios"
import jwt_decode from 'jwt-decode'
import Accordion from '../subComponents/Accordion'
import { Box, TextField, IconButton, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate, useParams} from 'react-router-dom'
import Punctation from "../subComponents/Punctation"

import {getUserCitySearch,clearUserSearch} from '../redux/actions'

const UserSearch = (props) => {

    const navigate = useNavigate()

    const {accessToken,favShuls,setFavShuls} = useContext(AppContext)
    const [token,setToken] = useState({
        // favShuls:[],
        user:{id:''}
      })
    const {user} = token
    const [search,setSearch] = useState('')
    const { shulname } = useParams()


    useEffect(()=>{
        if(accessToken){
            const decode = jwt_decode(accessToken)
            setToken(decode)
            const expire = token.exp
            let id = decode.user.id
            
            // const getFavData = async()=>{
            //     const response = await axios.get(`/favourite-shul/user=${id}`)
            //  if (response.status==200){
            //     setFavShuls(response.data)
            // }}
            // getFavData()

            if(expire * 1000 < new Date().getTime()){   
           }}

    },[favShuls])
    
    const [shuls ,setShuls] = useState([])
    
    const getMinyanim = async (id) => {
        
        const response = await axios.get(`/shul-times/shul${id}`)
        if (response.status==200) setShuls(response.data)
       
    }
    const getShulList = async(event)=>{
        try {
                event.preventDefault()
              
              // const response = await axios.get(`/shul-times/city=${search}`)
              // console.log(response);
              // if (response.status==200) setShuls(response.data)
              // props.clearReduxArray()
              props.getShulInCity(search)
              navigate(`/search/${search}`)
          } catch(e){
            console.log(e);
        }}
    const suggestion = async(shul_city_city)=>{
        try {
            props.getShulInCity(shul_city_city)
              navigate(`/search/${shul_city_city}`)
          } catch(e){
            console.log(e);
        }}

    return (
            <div  style={{ display: 'flex', width:'100%', flexDirection: "column", justifyContent:"center", alignItems:"center" }}>
            {/* <div style={{ display: 'flex', flexDirection: "row" }}> */}
            <h1 style={{color:'#3c1961'}}>Search A City</h1>
        <Box onSubmit={(event)=>getShulList(event)} component={"form"} sx={{ m: 2,   }} noValidate autoComplete={"off"}>
      
            <TextField 
                sx={{m: 2,
                input:{color: '#3C1961'},
                width:'80vw',    
                maxWidth:'600px',
                height:'40px',
                "& fieldset": { border:3,borderColor:'#3C1961',  borderRadius:10 },
                }}
                name="user_search"
                id="user_search"
                onChange={(e)=>setSearch(e.target.value)}

                InputProps={{
                endAdornment:
                        <InputAdornment position="end">
                            <IconButton onClick={(event)=>getShulList(event)} type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon style={{color: '#3C1961' }} />
                            </IconButton>
                        </InputAdornment>,
                style: { fontFamily: 'Poppins', color:  '#676767' }
                }}
            />    
        </Box>
                <div >
                    
                    {props.shulListFromCity.length>0 ? props.shulListFromCity.map((e, ind) => {
                        return (
                            <>
                                {/* <CardForShul key={e.shul_id} shulItem={e} getMinyanim={()=>getMinyanim(e.shul_id)} favShul={favShuls} userId={user.id} /> */}
                                <Accordion key={e.shul_id} shulItem={e} getMinyanim={()=>getMinyanim(e.shul_id)} favShul={favShuls} userId={user.id} shuls={shuls}/>
                            </>
                        )
                    }): (<div> 
                            Seems like your search of ' <i><strong>{shulname}</strong></i> ' wasnt found. Maybe there was a mistake try again. {props.suggestions.length >0 && <div style={{marginTop:'10px'}}> Did you mean: {props.suggestions.map(({shul_city_city}) =>
                                                                                                                                                               <p onClick={()=> suggestion(shul_city_city)}> ' <Punctation firstWord={shul_city_city}/> '</p> )} </div>}
                                                                                                                                                
                        </div>) }
                
                </div>
                
            </div>
            

        )
}




const mapToStateProps = (state)=>{
    return{
      shulListFromCity : state.userCitySearch,
      suggestions : state.suggestions
    }
  
  }
  const mapDispatchToProps = (dispatch)=>{
    return{
      getShulInCity: (cityName)=> dispatch((getUserCitySearch(cityName)))

        // getShul: ()=> dispatch((getListOfAllShuls()))
        // getShul: (cityName,countryName)=> dispatch((getListOfAllShuls(cityName,countryName)))
    }
  
}


export default connect(mapToStateProps,mapDispatchToProps)(UserSearch)