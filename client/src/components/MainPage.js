import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './mainPage.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputBase } from "@mui/material";
import Button from "@mui/material/Button";
import { AppContext } from "../App";
import { createContext } from "react";
import CardForShul from "../subComponents/CardsForShul";
import { connect } from "react-redux";
import {getUserCitySearch,clearUserSearch} from '../redux/actions'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { borderRadius } from "@mui/system";
// import makeStyles  from '@mui/material/styles/makeStyles'
// // import { makeStyles } from '@material-ui/core/styles'




const MainPage = (props) => {
  // const classes = useStyles();

  
    // const classes = useStyles();
    const {shuls,setShuls} = useContext(AppContext);

    const navigate = useNavigate();
    const [search,setSearch] = useState('')
    const [msg,setMsg] = useState('')

    
    const getShulList = async(event)=>{
        try {
                event.preventDefault()
                setMsg('')
                if(search=='') return setMsg('There was an error with your search please try again')
              // const response = await axios.get(`http://localhost:8080/shul-times/city=${search}`)
              // console.log(response);
              // if (response.status==200) setShuls(response.data)
              // props.clearReduxArray()
              props.getShulInCity(search)
              navigate(`/search/${search}`)
          } catch(e){
            console.log(e);
        }}

  return (
    <div className="container-for-main" style={{
      height:'90vh',

          display:'flex',
          flexDirection:'column',
          justifyContent:"flex-start",
          alignContent:"center"
              }}>
      <div>
        <h3 style={{
          marginTop:'100px',
          fontStyle:'Gudea',
          fontWeight:'bold',
           fontSize:'40px',
           color: '#3C1961',
                  }}>
                    Find A Minyan In Your City
        </h3>
      </div>
      <Box onSubmit={(event)=>getShulList(event)} component={"form"} sx={{ m: 2}} noValidate autoComplete={"off"}>
      
        <TextField 
          className="input-main"
          sx={{
            m: 2,
            input:{color: '#3C1961'},
            maxWidth:'600px',
            width:'80vw',
            height:'40px',
            "& fieldset": { border:3, borderColor:'#3C1961',  borderRadius:10},
          }}
          name="user_search"
          id="user_search"
          onChange={(e)=>setSearch(e.target.value.toLowerCase())}

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
      {/* <Button variant="contained" onClick={(event)=>getShulList(event)}>Search city</Button> */}
      <div>
        {msg}
        
      </div>
    </div>
  )
}
const mapDispatchToProps = (dispatch)=>{
  return{
    
      clearReduxArray: ()=> dispatch((clearUserSearch())),
      getShulInCity: (cityName)=> dispatch((getUserCitySearch(cityName)))
  }

}

export default connect(null,mapDispatchToProps)(MainPage);

