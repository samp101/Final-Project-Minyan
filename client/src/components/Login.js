import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "../App";
import { createContext } from "react";
import jwt_decode from 'jwt-decode'


const LoginRegister = (props) => {
 
    const [user,setUser] = useState({
      user_email:'',
      user_password:''}
    )

    const [msg,setMsg] = useState('')
    const {accessToken, setAccessToken} = useContext(AppContext);
    const navigate = useNavigate(); 

    const HandleClick = async () => {
            try{
                const response = await axios.post('/login',{
                    user
                },{
                    withCredentials:true,
                    headers:{
                        'Content-Type':'application/json',
                    }
                })
                setAccessToken(response.data.token)
                navigate(`/userdashboard/${response.data.userName}`)
            }
      catch(e){
                setMsg(e.response.data.msg)   
            }
        }

    
        const input = {
          m:3,
          input:{color: 'black'},
          maxWidth:'400px',
          width:'80vw',
          height:'40px',
          "& fieldset": { border:1, borderColor:'#3c1961', borderRadius:10}
      }

  return (
    <div>
      
      <Box onSubmit={HandleClick}  component={"form"} sx={{ m: 4, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', }} noValidate autoComplete={"off"}>
        <div>
        <h1 style={{fontStyle:'Gudea',
          fontWeight:'bold',
           fontSize:'40px',
           color: '#3C1961',textAlign:"center"}}> Welcome {<br></br>} Please Log In</h1>
      </div>
        <TextField sx={input} name="user_email" id="user_email" label="Enter Email" variant="outlined" onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
        <TextField sx={input} type='password' name="user_password" id="user_password" label="Enter Password" variant="outlined" onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} />
        <Button  sx={{ m:3, backgroundColor:'#3c1961',maxWidth:'400px', width:'80vw', height:'56px' ,borderRadius:10, '&: hover':{backgroundColor:'#6f4a96'}}} variant="contained" onClick={HandleClick}>Login</Button>
        <Box sx={{m:3}}>
          <Button sx={{textTransform: 'none', fontStyle:'Poppins',color:'#6f4a96', '&: hover':{backgroundColor:'#6f4a96',color:'white'} }} component={Link} to='/register-user'>Dont Have an Account Yet? Register Here</Button>
        </Box>
      </Box>
      <div>
        <p>{msg}</p>
      </div>
    </div>
  );
  }
export default LoginRegister;