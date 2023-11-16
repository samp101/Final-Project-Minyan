
import { Button, Stack,Typography } from "@mui/material"
import { useContext } from "react";
import { Box } from "@mui/material";
import { MinyanFav } from "./MinyanFav";
import Punctation from "./Punctation";
import axios from "axios";
import { AppContext } from "../App";


export const ShulInfoFav = (props)=>{ 
    const {userId } = props

    const {setFavShuls} = useContext(AppContext)
   
    const removeFromFav = async(favId, id)=>{
        await axios.post('/delete-from-fav',{
            favId
          },{
              withCredentials:true,
              headers:{
                  'Content-Type':'application/json',
              }
          })

          let response1 = await axios.get(`/favourite-shul/user=${id}`)
           if (response1.status==200){
              setFavShuls(response1.data)
          }
    }
    return (
        <Stack sx={{position:'relative', marginTop:-15, display:'flex', flexDirection:'row', justifyContent:'space-evenly', flexWrap:'wrap', alignItems:'center', width:'98vw'}}>
                {props.shul.map((shul,ind)=>{
                    let favShulId = shul.id
                    return(
                    <Box sx={{ m:3,  display:'flex',flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', background:'white', width:'30%', border:1, borderColor:'#f6efe5', borderRadius:10, padding:5,}}>
                        <Box sx={{display:'flex', justifyContent:"space-between", width:'100%'}} > 
                            <Typography sx={{fontSize:'30px', fontWeight:600, color:'#321154'}}><Punctation firstWord={shul.shul.shul_name}/></Typography>
                            <Button onClick={()=>removeFromFav(favShulId, userId)} >x</Button>
                        </Box>
                        <Typography sx={{fontSize:'20px', color:'#321154'}}><Punctation firstWord={shul.shul.shul_address}/>, <Punctation firstWord={shul.shul.shul_city_city}/>, <Punctation firstWord={shul.shul.shul_country}/> </Typography>
                        <Typography sx={{marginTop:3, fontSize:'22px', fontWeight:'semi-bold', color:'#321154'}}>Rabbi <Punctation firstWord={shul.shul.shul_rav}/> </Typography>
                        {shul.shul.shul_website 
                                        ?<Typography>Link To Shul Website :  <a target="_blank" href={shul.shul.shul_website}>{shul.shul.shul_website}</a></Typography>
                                        :<Typography>Link To Shul Website : Unavailble </Typography>} 
                        {/* <Button onClick={()=>getTimes(shul)}> Check Times</Button> */}
                    <MinyanFav selectedShul={shul} ></MinyanFav>
                    {/* <MinyanFav minyans={prayers}  ></MinyanFav> */}

                    </Box>)
                })}

                </Stack>
        )
}


