

import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl,InputLabel, Select, MenuItem} from "@mui/material";
// import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BasicTimePicker from "../subComponents/BasicTimePicker";






const ShulRegister = (props)=>{
    
const navigate = useNavigate()
const HandleClick = async () => {
    
    try{
        const response = await axios.post('/register-shul',{
            text
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
const [text,setText] = useState({})
const [msg,setMsg] = useState('')
    // const handleChange = (event) =>{
    //     const event1 = event
    //     event1.name = 'Shachris' 
    //     console.log(event)
        
    //     setText({...text,shachris:event})
    //     console.log('e.target', text.shachris);
    // }
    
    
return(
    <div>
        <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete={"on"}>
            <TextField sx={{ m: 1 }} name="shul_name" id="shul_name" label="Enter the name of the Shul" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            <TextField sx={{ m: 1 }} name="shul_rav" id="shul_rav" label="Enter The Ravs Name" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            <TextField sx={{ m: 1 }} name="shul_address" id="shul_address" label="Enter Address" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            <TextField sx={{ m: 1 }} name="shul_city_city" id="shul_city" label="Enter City" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            <TextField sx={{ m: 1 }} name="shul_country" id="shul_country" label="Enter Country" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            <TextField sx={{ m: 1 }} name="shul_zip_code" id="shul_zip" label="Enter Zip" variant="outlined" onChange={(e)=>{setText({...text,[e.target.name]:e.target.value.toLowerCase()})}} />
            <TextField sx={{ m: 1 }} name="shul_website" id="shul_website" label="Enter Website" variant="outlined" onChange={(e)=>{setText({...text,[e.target.name]:e.target.value.toLowerCase()})}} />
            <TextField sx={{ m: 1 }} name="shul_phone_number" id="shul_phone_number" label="Enter Phone Number" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            <TextField sx={{ m: 1 }} name="shachris" id="shachris" label="Enter times for Shachris" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value})} />
            <TextField sx={{ m: 1 }} name="mincha" id="mincha" label="Enter times for Mincha" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value})} />
            <TextField sx={{ m: 1 }} name="maariv" id="maariv" label="Enter times for Maariv" variant="outlined" onChange={(e)=>setText(({...text,[e.target.name]:e.target.value}),console.log(text))} />            
        </Box>
        <Button variant="contained" onClick={HandleClick}>Register Shul</Button>
        <h4>{msg}</h4>
    </div>
)
}


export default ShulRegister