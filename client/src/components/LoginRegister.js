import { useState, useEffect, useContext } from "react";
import {connect} from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl,
  InputLabel, Select, MenuItem } from "@mui/material";
import { AppContext } from "../App";
import { createContext } from "react";
import {getListOfAllShuls} from '../redux/actions'
import cities from 'cities-list'
import Autocomplete from '@mui/material/Autocomplete';
import group from '../static/group-10.png'
import './loginRegister.css'
const LoginRegister = (props) => {

  useEffect( ()=>{
    props.getShul() 
  },[])

  const getShulList = async(e)=>{
    try {
      // const response = await axios.get('http://localhost:8080/shul')
      // if (response.status==200) setShuls(response.data)
  } catch(e){
    console.log(e);
}

  } 
    const [user,setUser] = useState({
      shul_id:'',
      user_name:'',
      user_lastname:'',
      user_address:'',
      user_city:[],
      user_country:[],
      user_zip_code:'',
      user_phone_number:'',
      user_email:'',
      user_password:''}
    )
    // const [password,setUser] = useState('')
    const [msg,setMsg] = useState('')
    const [shuls,setShuls] = useState([])

    const {setAccessToken} = useContext(AppContext);
    
    const navigate = useNavigate()

    const HandleClick = async () => {
        
            try{
                const response = await axios.post('/register',{
                    user
                },{
                    withCredentials:true,
                    headers:{
                        'Content-Type':'application/json',
                    }
                })
                console.log('responce => ', response);
                navigate('/login')
            }
            catch(e){
                setMsg(e.response.data.msg)
                
            }
        
    }
    
    const storeInfo = (e)=>{
      setUser({...user,[e.target.name]:e.target.value})
    }

    let filterTimeout;
    // const citiesArray = Object.keys(cities)
    
    const doCityFilter = (event) => {

      clearTimeout(filterTimeout)
      if (!event) return setUser({...user,[event.target.value]:''})

      filterTimeout = setTimeout(() => {
      
      setShuls(props.shulList.filter(city =>city.shul_city_city.toLowerCase().includes(event.target.value.toLowerCase())))
      // let a = props.shulList.filter((country)=> country.shul_country.toLowerCase().includes(event.target.value.toLowerCase())).filter(city =>city.shul_city_city.toLowerCase().includes(event.target.value.toLowerCase()))
      // )
        console.log(shuls)
      setUser({...user,[event.target.name]:event.target.value})
      }, 500)
    }
    const input = {
      "& fieldset": { border:1, height:'50px', borderColor:'#43593d', borderRadius:10}
  }
  const buttton = {
    m:0,
    marginLeft:'30px',
    padding:0,
    textTransform: 'none',
    fontStyle:'Poppins',
    backgroundColor:'#fefcf9',
    color:'#6f4a96',
    '&: hover':{backgroundColor:'#fefcf9',color:'#D0B1F2'}
}
console.log(user);
  return (
    <div className="main-container">
      <div >
        <h3 style={{
          fontStyle:'Gudea',
          fontWeight:'bold',
           fontSize:'2rem',
           color: '#3C1961',
                  }}>Registration Form</h3>
      </div>
      <Box className='page-container' sx={{display:'flex', justifyContent:'space-evenly', width:'95vw'}}>
         
          <Box component={"form"} sx={{ display:'flex', flexDirection:'column', width:'100%', alignItems:'flex-start', justifyContent:'center', marginTop:'40px'}} noValidate autoComplete={"off"}>
            <TextField sx={input} 
            className='inputs-sel'
            name="user_name" 
            id="user_name" 
            label="Enter Name" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} />
            
            <TextField sx={input} 
            className='inputs-sel'
            name="user_lastname" 
            id="user_lastname" 
            label="Enter Lastname" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} />
            
            <TextField sx={input} 
            className='inputs-sel'
            name="user_address" 
            id="user_address" 
            label="Enter Address" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} />
            
            <TextField sx={input} 
            className='inputs-sel'
            name="user_city" 
            id="user_city" 
            label="Enter City" 
            variant="outlined" 
            // onChange={(e)=>storeInfo(e)} />
            onChange={(e)=>doCityFilter(e)} />

            <TextField sx={input} 
            className='inputs-sel'
            name="user_country" 
            id="user_country" 
            label="Enter Country" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} /> 
            {/* onChange={(e)=>doCityFilter(e)} />  */}
            
            <TextField sx={input} 
            className='inputs-sel'
            name="user_zip_code" 
            id="user_zip" 
            label="Enter Zip" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} />
            
            <TextField sx={input}
            className='inputs-sel' 
            name="user_phone_number" 
            id="user_zip" 
            label="Enter Phone Number" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} />
            
            <TextField sx={input} 
            className='inputs-sel'
            name="user_email" 
            id="user_email" 
            label="Enter Email" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} />
            
            <TextField sx={input} 
            className='inputs-sel'
            name="user_password" 
            id="user_password" 
            label="Enter Password" 
            variant="outlined" 
            onChange={(e)=>storeInfo(e)} />
            
            <FormControl 
            className='inputs-sel'
                sx={input} >
                <InputLabel id="demo-simple-select-
                label">Choose Your Shul</InputLabel>
                {/* <
                InputLabel sx={{ m: 1 }}>Shul</
                InputLabel>
                */}
                <Select
                  
                  labelId="demo-simple-select-
                  label"
                  id="demo-simple-select"
                  name='shul_id'
                  value={user.shul_id}
                  
                  label="Age"
                  
                  onChange={(e)=>storeInfo(e)}
                >

                  {/* debounce */} 
                  {/* { props.shullist.filter().map((e,ind)=>{ */}
                {/* { props.shulList.length>0 &&  props.shullist.filter((cityOrCountry)=>{cityOrCountry.shul_city_city.toLowerCase().includes(user.user_city.toLowerCase())  || cityOrCountry.shul_country.toLowerCase().includes(user.user_country.toLowerCase())}).map((e,ind)=>{ */}
                  
                  {shuls.map((e,ind)=>{
                  // {props.shulList.length>0 && props.shullist.filter((e)=>{})props.shulList.map((e,ind)=>{
                    return(
                    <MenuItem value={e.shul_id}> {e.shul_name}, {e.shul_city_city}, {e.shul_country}</MenuItem>
                    )
                  })}
            </Select>
          </FormControl>
          
          <Button 
          className='inputs-sel'
          variant="contained" sx={{ m:'15px', height:'50px', backgroundColor:'#3C1961', color:'white',  textTransform: 'none', borderRadius:10, fontStyle:'Poppins', '&: hover':{backgroundColor:'#6f4a96',color:'white'} }} onClick={HandleClick}>Register
          </Button>
          </Box>
         
          <Box
            className="window-img"
            component="img"
            sx={{
                
            //   maxHeight: { xs: 233, md: 167 },
            //   maxWidth: { xs: 350, md: 250 },
            }}
            alt="wall"
            src={group}
          ></Box>

      </Box>
      <div>
        <p>{msg}</p>
      </div>
    </div>
  );
};

const mapToStateProps = (state)=>{
  return{
    shulList : state.shulList
  }

}
const mapDispatchToProps = (dispatch)=>{
  return{
      getShul: ()=> dispatch((getListOfAllShuls()))
      // getShul: (cityName,countryName)=> dispatch((getListOfAllShuls(cityName,countryName)))
  }

}

export default connect(mapToStateProps,mapDispatchToProps)(LoginRegister);