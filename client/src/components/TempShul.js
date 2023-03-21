

import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {InputAdornment,IconButton} from '@mui/material'
import { FormControl,InputLabel, Select, MenuItem} from "@mui/material";
// import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';






const TempShul = (props)=>{
    
const navigate = useNavigate()
const HandleClick = async () => {
    
    try{
        const response = await axios.post('/register-shul1',{
            text,extraMinyan
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
        // setMsg(e.response.data.msg)
        
    }
}
const [text,setText] = useState({
    shul_name:'hey'
})
const [shachris,setShachris] = useState([])
const [mincha,setMincha] = useState([])
const [maariv,setMaariv] = useState([])


const [extraMinyan,setExtraMinyan] = useState({
    shachris:{a:530,b:630},
    mincha:{},
    maariv:{}
})


// {
//  shachris:[{
//         a:0530,
//         b:0450
//     }],
//     mincha:[],
//     maariv:[],
// })

// {
//  shachris:[0530,0450,],
//     mincha:[1530,1439],
//     maariv:[],
// })


useEffect(()=>{
},[shachris,mincha,maariv])


const addMinyan = (e)=>{
    if(e.target.name=='shachris') 
    {setShachris([...shachris,[]])}
    else if(e.target.name=='mincha')
    {setMincha([...mincha,[]])}  
    else if(e.target.name=='maariv')
    {setMaariv([...maariv,[]])}

}


    // const handleChange = (event) =>{
    //     const event1 = event
    //     event1.name = 'Shachris' 
    //     console.log(event)
        
    //     setText({...text,shachris:event})
    //     console.log('e.target', text.shachris);
    // }
    // console.log(text)

    
    const deleteExtraMin = (e,ind,minyan)=>{
        let objectKey = e.target.name
        let objectValue = `${minyan}-${ind+2}`
        if(extraMinyan[objectKey][objectValue]){
        delete extraMinyan[objectKey][objectValue]}            
    }

    const deleteInputFromFE = (ind,minyan,func)=>{
        minyan.splice(ind,1)
        func([...minyan])
    }
    

    const del = (e,ind)=>{
        let eventName = e.target.name

        if(e.target.name=='shachris'){ 
            deleteExtraMin(e,ind,eventName)            
            deleteInputFromFE(ind,shachris,setShachris)
        } else if(e.target.name=='mincha'){
            deleteExtraMin(e,ind,eventName)
            deleteInputFromFE(ind,mincha,setMincha)
        } else if(e.target.name=='maariv'){
            deleteExtraMin(e,ind,eventName)  
            deleteInputFromFE(ind,maariv,setMaariv)
        }
    
    }


    console.log(extraMinyan);
return(
    <div>
        <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete={"on"}>
            <TextField sx={{ m: 1 }} name="shul_name" id="shul_name" label="Enter the name of the Shul" variant="outlined" 
             onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} required />
            <TextField sx={{ m: 1 }} name="shul_rav" id="shul_rav" label="Enter The Ravs Name" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            <TextField sx={{ m: 1 }} name="shul_address" id="shul_address" label="Enter Address" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})}   required/>
            <TextField sx={{ m: 1 }} name="shul_city_city" id="shul_city" label="Enter City" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})}  required />
            <TextField sx={{ m: 1 }} name="shul_country" id="shul_country" label="Enter Country" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})}  required />
            <TextField sx={{ m: 1 }} name="shul_zip_code" id="shul_zip" label="Enter Zip" variant="outlined" onChange={(e)=>{setText({...text,[e.target.name]:e.target.value.toLowerCase()})}} />
            <TextField sx={{ m: 1 }} name="shul_website" id="shul_website" label="Enter Website" variant="outlined" onChange={(e)=>{setText({...text,[e.target.name]:e.target.value.toLowerCase()})}} />            
            <TextField sx={{ m: 1 }} name="shul_phone_number" id="shul_phone_number" label="Enter Phone Number" variant="outlined" onChange={(e)=>setText({...text,[e.target.name]:e.target.value.toLowerCase()})} />
            
      
            <Button  name='shachris' onClick={(e)=>addMinyan(e)}>Add Shachris</Button>          
            <TextField sx={{ m: 1 }} type="time"  name='shachris' id='shachris-1' label="Enter times for Shachris" variant="outlined" onChange={(e)=>setExtraMinyan({...extraMinyan,[e.target.name]:{...extraMinyan[e.target.name],[e.target.id]:e.target.value}})} required />         
            {shachris.map((e,ind)=>{
                return(
                    <TextField key={ind} type="time" sx={{ m: 1 }} name={`shachris`} id={`shachris-${ind+2}`} label={`Shachris #${ind+2}`} variant="outlined" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Button name ={`shachris`} id={`shachris-${ind+2}`} onClick={(e)=>del(e,ind)}>X</Button></InputAdornment>}}
                    onChange={(e)=>setExtraMinyan({...extraMinyan,[e.target.name]:{...extraMinyan[e.target.name],[e.target.id]:e.target.value}})} />
                )
            })}
            
            
            <Button  name='mincha' onClick={(e)=>addMinyan(e)}>Add Mincha</Button>
            <TextField sx={{ m: 1 }} type="time" name="mincha" id="mincha-1" label="Enter times for Mincha" variant="outlined" onChange={(e)=>setExtraMinyan({...extraMinyan,[e.target.name]:{...extraMinyan[e.target.name],[e.target.id]:e.target.value}})} />
                {mincha.map((e,ind)=>{
                    return(
                        <TextField key={ind} type="time" sx={{ m: 1 }} name="mincha" id={`mincha-${ind+2}`} label={`Mincha #${ind+2}`} variant="outlined"
                        InputProps={{endAdornment: <InputAdornment position="end"><Button name ={`mincha`} id={`mincha-${ind+2}`} onClick={(e)=>del(e,ind)}>X</Button></InputAdornment>}}
                        onChange={(e)=>setExtraMinyan({...extraMinyan,[e.target.name]:{...extraMinyan[e.target.name],[e.target.id]:e.target.value}})} />
                    )
                })}
            
            
            <Button  name='maariv' onClick={(e)=>addMinyan(e)}>Add Maariv</Button>
            <TextField sx={{ m: 1 }} name="maariv" type="time" id="maariv-1" label="Enter times for Maariv" variant="outlined" onChange={(e)=>setExtraMinyan({...extraMinyan,[e.target.name]:{...extraMinyan[e.target.name],[e.target.id]:e.target.value}})} />
                {maariv.map((e,ind)=>{
                    return(
                        <TextField key={ind} type="time" sx={{ m: 1 }} name="maariv" id={`maariv-${ind+2}`} label={`Maariv #${ind+2}`} variant="outlined" 
                        InputProps={{endAdornment: <InputAdornment position="end"><Button name ={`maariv`} id={`maariv-${ind+2}`} onClick={(e)=>del(e,ind)}>X</Button></InputAdornment>}} 
                        onChange={(e)=>setText(setExtraMinyan({...extraMinyan,[e.target.name]:{...extraMinyan[e.target.name],[e.target.id]:e.target.value}}))} />
                    )
                })}
  
        </Box>
        <Button variant="contained" onClick={HandleClick}>Register Shul</Button>
        
    </div>
)
}


export default TempShul