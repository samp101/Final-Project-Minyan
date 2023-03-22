

import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {InputAdornment,IconButton} from '@mui/material'
import {useState, useEffect, useContext} from 'react'
import {  useNavigate } from "react-router-dom";
import { AppContext } from "../App"
import jwt_decode from 'jwt-decode'
import group from '../static/group-10.png'
import './registerShul.css'





const RegisterShul = (props)=>{
    
    // const {accessToken} = useContext(AppContext)

const {msg, setMsg} = useState('')
const navigate = useNavigate()


// useEffect(()=>{
//     const decode = jwt_decode(accessToken)
//     const expire = decode.exp
//     if(expire * 1000 < new Date().getTime() || !accessToken ){
//         navigate('/')
//     }

// },[])

const [shul,setShul] = useState({
    shul_name :'',
    shul_rav :'',
    shul_address :'',
    shul_city_city :'',
    shul_country :'',
    shul_zip_code :'',
    shul_website :'',
    shul_phone_number :'',
    shachris:[''],
    mincha:[''],
    maariv:['']
})
const HandleClick = async () => {
    
    try{
        // if(shul_name=='' ||shul_address=='' || shul_city_city=='' || shul_country==''){
        //     setMsg('Please Fill All The Required Fields In')
        // }
        const response = await axios.post('/register-shul',{
            shul
        },{
            withCredentials:true,
            headers:{
                'Content-Type':'application/json',
            }
        })
        console.log('responce => ', response);
        navigate('/')
    }
    catch(e){
        setMsg(e.response.data.msg)
    }
}

console.log(shul);

const onChange = (e)=>{
    setShul({...shul,[e.target.name]:e.target.value})
}

const onChangeMinyanPrayerTime = (e,name,index)=>{
    let minyan = [...shul[name]]
    minyan[index] = e.target.value 
    setShul({...shul,[name]:minyan})
    console.log(shul)

}

const addMinyan = (name)=>{
    let minyan = [...shul[name]]
    minyan.push('')
    setShul({...shul,[name]:minyan})
    console.log(shul[name])

}
const deleteMinyan = (name,index)=>{
    if(index==0) return
    let minyan = [...shul[name]]
    minyan.splice(index,1)
    setShul({...shul,[name]:minyan})
}

const input = {
            m:'15px',
            input:{color: 'black'},
            backgroundColor:'#fefcf9',
            width:'400px',
            height:'40px',
            "& fieldset": { border:1, height:'50px', borderColor:'#43593d', borderRadius:10}
        }
const minyanInput ={
    marginTop:'15px',
    marginBottom:'10px',
    marginLeft:'15px',
    input:{color: 'black'},
    backgroundColor:'#fefcf9',
    width:'400px',
    height:'40px',
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

return(
    <div className="page-container" style={{display:'flex', justifyContent:'space-evenly'}}>
        
        <Box 
        className='im'
        component="img"
        sx={{
            marginTop:8,
            display:'flex',
            justifyContent:'center',
            alignContent:'center',
          height: 600,
          width: 431,
        //   maxHeight: { xs: 233, md: 167 },
        //   maxWidth: { xs: 350, md: 250 },
        }}
        alt="wall"
        src={group}
      />
        <Box component={"form"} sx={{ display:'flex', flexDirection:'column', alignItems:'start',  marginTop:'40px' }}  autoComplete={"on"}>
            <h1 style={{marginLeft:'20px',color:'#3c1961'}}>Register A Shul</h1>

            <TextField className='inputs' sx={input} name="shul_name" id="shul_name" label="Enter the name of the Shul*" value={shul.shul_name} variant="outlined" 
            onChange={(e)=>onChange(e)}
            required />

            <TextField className='inputs' sx={input } name="shul_rav" id="shul_rav" label="Enter The Ravs Name" value={shul.shul_rav} variant="outlined" 
            onChange={(e)=>onChange(e)}
            required
            />
            
            <TextField className='inputs' sx={input} name="shul_address" id="shul_address" label="Enter Address*" value={shul.shul_address} variant="outlined" 
            onChange={(e)=>onChange(e)}
            />

            <TextField className='inputs' sx={input} name="shul_city_city" id="shul_city" label="Enter City*" value={shul.shul_city_city} variant="outlined" 
            onChange={(e)=>onChange(e)}
             />
            
            <TextField className='inputs' sx={input} name="shul_country" id="shul_country" label="Enter Country*"  value={shul.shul_country}variant="outlined"
            onChange={(e)=>onChange(e)}
             />
            
            {/* <TextField sx={input} name="shul_zip_code" id="shul_zip" label="Enter Zip" value={shul.shul_zip_code} variant="outlined" 
            onChange={(e)=>onChange(e)}
            /> */}
            
            <TextField className='inputs' sx={input} name="shul_website" id="shul_website" label="Enter Website" value={shul.shul_website} variant="outlined" 
            onChange={(e)=>onChange(e)}
            />            
            
            {/* <TextField className='inputs' sx={input} name="shul_phone_number" id="shul_phone_number" label="Enter Phone Number" value={shul.shul_phone_number} variant="outlined" 
            onChange={(e)=>onChange(e)}
            />
                   */}
            {shul.shachris.map((e,index)=>{
                return(
                    <TextField key={index} className='inputs' type="time" sx={minyanInput} name={`shachris`} label={`Shachris #${index+1}`} value={shul.shachris[index]} variant="outlined" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Button onClick={(e)=>deleteMinyan('shachris',index)}>X</Button></InputAdornment>}}
                    onChange={(e)=>onChangeMinyanPrayerTime(e,'shachris',index)} />
                )
            })}
                <Button  sx={buttton} name='shachris' onClick={()=>addMinyan('shachris')}>Add Shachris</Button>          
            
            
                {shul.mincha.map((e,index)=>{
                    return(
                        <TextField key={index} className='inputs' type="time" sx={minyanInput} name={`mincha`} label={`Mincha #${index+1}`} value={shul.mincha[index]} variant="outlined" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Button onClick={(e)=>deleteMinyan('mincha',index)}>X</Button></InputAdornment>}}
                    onChange={(e)=>onChangeMinyanPrayerTime(e,'mincha',index)} />
                    )
                })}
            <Button  sx={buttton} name='mincha' onClick={()=>addMinyan('mincha')}>Add Mincha</Button>
                {shul.maariv.map((e,index)=>{
                    return(
                        <TextField key={index} className='inputs' type="time" sx={minyanInput} name={`maariv`} label={`Maariv #${index+1}`} value={shul.maariv[index]} variant="outlined" 
                        InputProps={{endAdornment: <InputAdornment position="end"><Button sx={{}} onClick={(e)=>deleteMinyan('maariv',index)}>X</Button></InputAdornment>}}
                        onChange={(e)=>onChangeMinyanPrayerTime(e,'maariv',index)} />
                    )
                })}
              <Button  sx={buttton} name='maariv' onClick={()=>addMinyan('maariv')}>Add Maariv</Button>
        
            <Button sx={{ m:'15px', backgroundColor:'#3C1961', color:'white', width:'400px', height:'40px', textTransform: 'none', borderRadius:10, fontStyle:'Poppins', '&: hover':{backgroundColor:'#6f4a96',color:'white'} }} variant="contained" onClick={HandleClick}>Register Shul</Button> 
        </Box>
        
        {msg}
    </div>
)
}


export default RegisterShul